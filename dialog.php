<?php require_once('../../common.php'); ?>
<!--
    Copyright (c) Codiad & Andr3as, distributed
    as-is and without warranty under the MIT License.
    See http://opensource.org/licenses/MIT for more information.
    This information must remain intact.
-->
<label><i class="fas fa-paint-brush"></i><?php i18n("Beautify Settings"); ?></label>
<table>
	<tr>
		<td style="width: 30%;">
			<?php i18n("Beautify %{language}% On Save", array("language" => "CSS")) ?>
		</td>
		<td style="width: 20%;">
			<input type="checkbox" data-setting="beautify.css" class="large">
		</td>
		<td style="width: 30%;">
			<?php i18n("Beautify %{language}% On Save", array("language" => "HTML")) ?>
		</td>
		<td style="width: 20%;">
			<input type="checkbox" data-setting="beautify.html" class="large">
		</td>
	</tr>
	<tr>
		<td>
			<?php i18n("Beautify %{language}% On Save", array("language" => "JS")) ?>
		</td>
		<td>
			<input type="checkbox" data-setting="beautify.js" class="large">
		</td>
		<td>
			<?php i18n("Beautify %{language}% On Save", array("language" => "JSON")) ?>
		</td>
		<td>
			<input type="checkbox" data-setting="beautify.json" class="large">
		</td>
	</tr>
	<tr>
		<td style="width: 30%;">
			<?php i18n("Beautify %{language}% On Save", array("language" => "PHP")) ?>
		</td>
		<td>
			<input type="checkbox" data-setting="beautify.php" class="large">
		</td>
	</tr>
	<tr>
		<td colspan="2" style="width: 60%;">
			<?php i18n("Experimental: Guess cursor position") ?>
		</td>
		<td colspan="2" >
			<toggle>
				<input id="beautify_guessCursorPosition_true" data-setting="beautify.guessCursorPosition" value="true" name="beautify.guessCursorPosition" type="radio" />
				<label for="beautify_guessCursorPosition_true"><?php i18n("Yes"); ?></label>
				<input id="beautify_guessCursorPosition_false" data-setting="beautify.guessCursorPosition" value="false" name="beautify.guessCursorPosition" type="radio" checked />
				<label for="beautify_guessCursorPosition_false"><?php i18n("No"); ?></label>
			</toggle>
		</td>
	</tr>
</table>

<hint>Hint: Press Ctrl+Alt+B to Beautify</hint>