<label><i class="fas fa-paint-brush"></i>Beautify Settings</label>
<table>
	<tr>
		<td style="width: 30%;">Beautify CSS On Save</td>
		<td style="width: 20%;">
			<input type="checkbox" data-setting="beautify.css" class="large">
		</td>
		<td style="width: 30%;">Beautify HTML On Save</td>

		<td style="width: 20%;">
			<input type="checkbox" data-setting="beautify.html" class="large">
		</td>
	</tr>
	<tr>
		<td style="width: 30%;">Beautify JS On Save</td>

		<td>
			<input type="checkbox" data-setting="beautify.js" class="large">
		</td>
		<td style="width: 30%;">Beautify JSON On Save</td>

		<td>
			<input type="checkbox" data-setting="beautify.json" class="large">
		</td>
	</tr>
	<tr>
		<td style="width: 30%;">Beautify PHP On Save</td>

		<td>
			<input type="checkbox" data-setting="beautify.php" class="large">
		</td>
	</tr>
	<tr>
		<td colspan="2" style="width: 60%;">Experimental: Guess cursor position</td>
		<td colspan="2">
			<toggle>
				<input id="beautify_guessCursorPosition_true" data-setting="beautify.guessCursorPosition" value="true" name="beautify.guessCursorPosition" type="radio" />
				<label for="beautify_guessCursorPosition_true"><?php echo i18n("enabled"); ?></label>
				<input id="beautify_guessCursorPosition_false" data-setting="beautify.guessCursorPosition" value="false" name="beautify.guessCursorPosition" type="radio" checked />
				<label for="beautify_guessCursorPosition_false"><?php echo i18n("disabled"); ?></label>
			</toggle>
		</td>
	</tr>
</table>

<hint>Hint: Press Ctrl+Alt+B to Beautify</hint>