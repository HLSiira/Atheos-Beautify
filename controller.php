<?php
/*
 * Copyright (c) Codiad & Andr3as, distributed
 * as-is and without warranty under the MIT License.
 * See http://opensource.org/licenses/MIT for more information.
 * This information must remain intact.
 */

require_once("../../common.php");

//////////////////////////////////////////////////////////////////////////////80
// Verify Session or Key
//////////////////////////////////////////////////////////////////////////////80
Common::checkSession();

$action = Common::data("action");
$settings = Common::data("settings");

$path = Common::data("path");
$content = Common::data("content");

if (!$action) {
	Common::sendJSON("E401m");
	die;
}

if($path) {
	$path = Common::getWorkspacePath($path);
}

switch ($action) {

	case 'saveContent':
		if ($path && $content) {
			if (file_put_contents($path, $content) === false) {
				Common::sendJSON("E5002");
			} else {
				Common::sendJSON("S2000", "Settings Saved.");
			}
		} else {
			if (!$path) {
				Common::sendJSON("E403m", "Path");
			} else {
				Common::sendJSON("E403m", "Content");
			}
		}
		break;

	case 'getContent':
		if ($path) {
			echo file_get_contents($path);
		} else {
			Common::sendJSON("E403m", "Path");
		}
		break;

	default:
		Common::sendJSON("E401i");
		break;
}
?>