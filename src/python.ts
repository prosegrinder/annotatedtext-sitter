import Parser from "tree-sitter";
import Python from "tree-sitter-python";
import { compose } from "./index.js";
import { IAnnotatedtext } from "../types";

function interpretAs(markup: string = ""): string {
  return markup;
}

export default function annotatedPython(text: string): IAnnotatedtext {
  const parser = new Parser();
  parser.setLanguage(Python);
  const tree = parser.parse(text);
  return compose(text, tree, interpretAs, [
    "comment",
    "line_comment",
    "@comment",
    "text",
  ]);
}
