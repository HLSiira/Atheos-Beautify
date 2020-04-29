/*
	* Copyright (c) Codiad & Andr3as, distributed
	* as-is and without warranty under the MIT License.
	* See http://opensource.org/licenses/MIT for more information.
	* This information must remain intact.
	*/

(function(global) {

	var atheos = global.atheos;

	var self = null;

	amplify.subscribe('system.loadExtra', () => atheos.Beautify.init());

	atheos.Beautify = {

		path: '/plugins/Beautify/',
		controller: '/plugins/Beautify/controller.php',
		dialog: '/plugins/Beautify/dialog.php',

		beautifyPhp: null,
		lines: 0,
		row: 0,
		settings: {
			auto: {
				js: false,
				json: false,
				html: false,
				css: false,
				php: false
			},
			beautify: {
				indent_size: 1,
				indent_char: "\t",
				indent_level: 0,
				indent_with_tabs: false,
				preserve_newlines: true,
				max_preserve_newlines: 10,
				jslint_happy: false,
				brace_style: "collapse",
				keep_array_indentation: false,
				keep_function_indentation: false,
				space_before_conditional: true,
				break_chained_methods: false,
				eval_code: false,
				unescape_strings: false,
				wrap_line_length: 0
			}
		},

		files: ["html", "htm", "js", "json", "scss", "css", "php"],

		init: function() {
			self = this;
			//Load libs
			atheos.common.loadScript(self.path + "libs/beautify-css.js");
			atheos.common.loadScript(self.path + "libs/beautify-html.js");
			atheos.common.loadScript(self.path + "libs/beautify.js");
			atheos.common.loadScript(self.path + "libs/ext-beautify.js", function() {
				self.beautifyPhp = ace.require("ace/ext/beautify");
			});

			//Set subscriptions
			amplify.subscribe('active.onFocus', function(path) {
				if (atheos.editor.getActive() === null) return;
				var manager = atheos.editor.getActive().commands;
				manager.addCommand({
					name: "Beautify",
					bindKey: {
						win: "Ctrl-Alt-B",
						mac: "Command-Alt-B"
					},
					exec: function() {
						self.beautify();
					}
				});
			});
			amplify.subscribe('active.onSave',
				function(path) {
					path = path || atheos.active.getPath();
					var ext = self.getExtension(path);
					if (self.files.indexOf(ext) != -1) {
						if (self.check(path)) {
							var content = atheos.editor.getContent();
							self.lines = self.getLines();
							self.row = atheos.editor.getActive().getCursorPosition().row;
							content = self.beautifyContent(path, content);
							if (typeof(content) !== 'string') {
								return true;
							}
							atheos.editor.setContent(content);
							self.guessCursorPosition();
						}
					}
				});

			amplify.subscribe('settings.dialog.save',
				function() {
					if (oX('#beautify_form')) {
						self.save();
					}
				});
		},

		//////////////////////////////////////////////////////////
		//
		//  Show settings dialog
		//
		//////////////////////////////////////////////////////////
		showDialog: function() {
			atheos.modal.load(200,
				self.dialog);
		},

		//////////////////////////////////////////////////////////
		//
		//  Get number of lines of current document
		//
		//  Parameters
		//
		//  content - {string} - (optional) Content of current document
		//
		//////////////////////////////////////////////////////////
		getLines: function(content) {
			content = content || atheos.editor.getContent();
			return (content.match(/\n/g) || []).length + 1;
		},

		//////////////////////////////////////////////////////////
		//
		//  Guess the cursor position after beautifying content
		//
		//////////////////////////////////////////////////////////
		guessCursorPosition: function() {
			var newLines = this.getLines();
			var factor = newLines / this.lines;
			var newRow = Math.floor(factor * this.row);
			atheos.editor.getActive().clearSelection();
			atheos.editor.getActive().moveCursorToPosition({
				"row": newRow,
				"column": 0
			});
		},

		//////////////////////////////////////////////////////////
		//
		//  Beautify content
		//
		//  Parameters
		//
		//  path - {string} - File path
		//  content - {string} - Content to beautify
		//  settings - {object} - Settings for beautify
		//
		//////////////////////////////////////////////////////////
		beautifyContent: function(path, content, settings) {
			self.checkBeautifySettings();
			if (typeof(settings) == 'undefined') {
				settings = self.settings.beautify;
			}
			var ext = self.getExtension(path);
			if (ext == "html" || ext == "htm") {
				return html_beautify(content, settings);
			} else if (ext == "css" || ext == "scss") {
				return css_beautify(content, settings);
			} else if (ext == "js" || ext == "json") {
				return js_beautify(content, settings);
			} else if (ext == "php") {
				self.beautifyPhp.beautify(atheos.editor.getActive().getSession());
				return true;
			} else {
				return false;
			}
		},

		//////////////////////////////////////////////////////////
		//
		//  Beautify command to handle hotkey
		//
		//////////////////////////////////////////////////////////
		beautify: function() {
			var settings = self.settings.beautify;
			var path = atheos.active.getPath();
			var editor = atheos.editor.getActive();
			var session = editor.getSession();
			var selText = atheos.editor.getSelectedText();
			var range = editor.selection.getRange();
			var fn = function(range, text) {
				if (typeof(text) == 'undefined') {
					settings.indent_level = "keep";
					range.start.column = 0;
					text = session.getTextRange(range);
				}
				text = self.beautifyContent(path, text, settings);
				if (typeof(text) == 'string') {
					session.replace(range, text);
				}
			};
			if (selText !== "") {
				if (editor.selection.inMultiSelectMode) {
					var multiRanges = editor.selection.getAllRanges();
					for (var i = 0; i < multiRanges.length; i++) {
						fn(multiRanges[i]);
					}
				} else {
					//Single selection
					fn(range);
				}
			} else {
				self.row = atheos.editor.getActive().getCursorPosition().row;
				self.lines = this.getLines();
				var content = atheos.editor.getContent();
				range = editor.selectAll() || editor.selection.getRange();
				fn(range, content);

				self.guessCursorPosition();
			}
		},

		//////////////////////////////////////////////////////////
		//
		//  Get settings for given file path
		//
		//  Parameters
		//
		//  path - {string} - File path
		//
		//////////////////////////////////////////////////////////
		check: function(path) {
			var ext = self.getExtension(path);
			if (ext === "htm") {
				ext = "html";
			}
			return self.settings.auto[ext];
		},

		//////////////////////////////////////////////////////////
		//
		//  Check settings for beautify
		//
		//////////////////////////////////////////////////////////
		checkBeautifySettings: function() {
			var char = "";
			var tab = 1;
			if (atheos.editor.settings.softTabs) {
				char = " ";
				tab = 4;
			} else {
				char = "\t";
				tab = 1;
			}
			self.settings.beautify.indent_char = char;
			self.settings.beautify.indent_size = tab;
		},

		//////////////////////////////////////////////////////////
		//
		//  Get extension of file
		//
		//  Parameters
		//
		//  path - {string} - File path
		//
		//////////////////////////////////////////////////////////
		getExtension: function(path) {
			return path.substring(path.lastIndexOf(".") + 1);
		}
	};
})(this);