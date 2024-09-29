import Parser from "tree-sitter";
import Markdown from "@tree-sitter-grammars/tree-sitter-markdown";
import { compose } from "./index.js";
import { IAnnotatedtext } from "../types";

function interpretAs(markup: string = ""): string {
  return "\n".repeat((markup.match(/\n/g) || []).length);
}

export default function annotatedMarkdown(text: string): IAnnotatedtext {
  const parser = new Parser();
  parser.setLanguage(Markdown);
  const tree = parser.parse(text);
  const inlineParser = new Parser();
  inlineParser.setLanguage(Markdown.inline);
  const inlineTree = inlineParser.parse(tree.rootNode.text);
  return compose(text, inlineTree, interpretAs, [
    "comment",
    "line_comment",
    "@comment",
    "text",
  ]);
}
