import Parser from "tree-sitter";
import Html from "tree-sitter-html";
import { compose } from "./index.js";
import { IAnnotatedtext } from "../types";

function buildHtml(text: string): IAnnotatedtext {
  const parser = new Parser();
  parser.setLanguage(Html);
  const tree = parser.parse(text);
  return compose(text, tree);
}

export { buildHtml };
