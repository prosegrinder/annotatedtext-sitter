import Parser from "tree-sitter";
import Html from "tree-sitter-html";
import { compose } from "./index.js";
import { IAnnotatedtext } from "../types";

function interpretAs(markup: string = ""): string {
  const countP = (markup.match(/<\/p>/g) || []).length;
  const countH = (markup.match(/<\/h\d+>/g) || []).length;
  const countBr = (markup.match(/<br[\s/]*>/g) || []).length;
  const coungNl = (markup.match(/\n/g) || []).length;
  return "\n".repeat(2 * countP + 2 * countH + countBr + coungNl);
}

export default function annotatedHtml(text: string): IAnnotatedtext {
  const parser = new Parser();
  parser.setLanguage(Html);
  const tree = parser.parse(text);
  return compose(text, tree, interpretAs, [
    "comment",
    "line_comment",
    "@comment",
    "text",
  ]);
}
