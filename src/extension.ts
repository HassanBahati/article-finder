// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import axios from "axios";
import { link } from "fs";

type Article = {
  label: string;
  detail: string;
  link: string;
};

// create a function to display the articles
async function displayArticles() {
  // fetch articiles
  const url = "https://jsonplaceholder.typicode.com/posts";
  const res = await axios.get(url);
  const articles = res.data.map((article: any) => {
    return {
      label: article.title,
      detail: article.body,
      link: url + "/" + article.id,
    };
  });

  const article = await vscode.window.showQuickPick(articles, {
    matchOnDetail: true,
  });

  // if no article was selected return nothing
  if (article == null) return;

  // if article was selected open it in an external window
  vscode.env.openExternal((article as any).link);
}

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {
  displayArticles();

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  const disposable = vscode.commands.registerCommand(
    "article-finder.searchArticleFinder",
    () => {
      // The code you place here will be executed every time your command is executed
      // Display a message box to the user
      vscode.window.showInformationMessage("Hello World from Article Finder!");
    }
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
