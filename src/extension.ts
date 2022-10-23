// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('your extension "code-utils" is now active!');
  let disposable = vscode.commands.registerCommand("code-utils.SelectWord", () => {
    // The code you place here will be executed every time your command is executed
    // Display a message box to the user

    const editor = vscode.window.activeTextEditor;

    if (editor) {
      // const document = editor.document;
      const selection = editor.selection;
      // console.log(selection);
      // console.log(selection.isEmpty);

      const hoverWordRange = getCursorWordSelectionRange(editor, selection.active);
      console.log(hoverWordRange);
      if (hoverWordRange) {
        editor.selection = new vscode.Selection(hoverWordRange?.start, hoverWordRange?.end);
      }
    }
  });

	let cmdSelectAndCopy = vscode.commands.registerCommand("code-utils.SelectWordAndCopy", () => {
			const editor = vscode.window.activeTextEditor;
			if (editor) {
					const selection = editor.selection;
					const hoverWordRange = getCursorWordSelectionRange(editor, selection.active);
					if (hoverWordRange) {
						const text = editor.document.getText(hoverWordRange); 
						vscode.env.clipboard.writeText(text).then(err =>  {
							console.log(err);
						});
					}
			}
	});

	let cmdDeleteSelect = vscode.commands.registerCommand("code-utils.DeleteSelectWord", () => {
			const editor = vscode.window.activeTextEditor;
			if (editor) {
					const selection = editor.selection;
					const hoverWordRange = getCursorWordSelectionRange(editor, selection.active);
					if (hoverWordRange) {
						editor.edit(editBuilder => {
							editBuilder.delete(hoverWordRange);
						});
					}
			}
	});

  context.subscriptions.push(disposable);
	context.subscriptions.push(cmdSelectAndCopy);
	context.subscriptions.push(cmdDeleteSelect);
}

function getCursorWordSelectionRange(
  editor: vscode.TextEditor,
  pos: vscode.Position
): vscode.Range | undefined {
  return editor.document.getWordRangeAtPosition(pos);
}

// this method is called when your extension is deactivated
export function deactivate() {}
