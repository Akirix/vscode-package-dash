'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import PackagePanel from './PackagePanel';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "package-dash" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    context.subscriptions.push(vscode.commands.registerCommand('packageDash.start', () => {
        PackagePanel.createOrShow(context.extensionPath);
    }));

    context.subscriptions.push(vscode.commands.registerCommand('packageDash.doRefactor', () => {
        if (PackagePanel.currentPanel) {
            PackagePanel.currentPanel.doRefactor();
        }
    }));

    if (vscode.window.registerWebviewPanelSerializer) {
        // Make sure we register a serilizer in activation event
        vscode.window.registerWebviewPanelSerializer(PackagePanel.viewType, {
            async deserializeWebviewPanel(webviewPanel: vscode.WebviewPanel, state: any) {
                console.log(`Got state: ${state}`);
                PackagePanel.revive(webviewPanel, context.extensionPath);
            }
        });
    }
}

// this method is called when your extension is deactivated
export function deactivate() {
}