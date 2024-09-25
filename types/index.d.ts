/**
 * @module annotatedtext-sitter
 * @example
 * import { compose } from "annotatedtext";
 * import { remarkparse } from "remark-parse";
 * import { unified } from "unified";
 *
 * const text = "This is a sentence.";
 * const nodes = unified()
 *  .use(remarkparse, remarkoptions)
 *  .parse(text) as annotatedtext.INode;
 *
 * const annotatedtext = compose(text, nodes);
 * console.log(annotatedtext);
 *
 * @description
 * This module provides functions for building annotated text
 * suitable for use with LanguageTool.
 *
 * @see https://languagetool.org/http-api/
 */

import { SyntaxNode } from "tree-sitter";

/**
 * @property {string} markup The markup that the text was generated from.
 * @property {string} interpretAs The interpretation of the markup.
 * @property {string} text The text that the annotation was generated from.
 * @property {object} offset The offset of the annotation in the text.
 * @property {number} offset.start The start offset of the annotation.
 * @property {number} offset.end The end offset of the annotation.
 * @interface
 */
export interface IAnnotation {
  markup?: string;
  interpretAs?: string;
  text?: string;
  offset: {
    start: number;
    end: number;
  };
}

/**
 * @interface IAnnotatedtext
 * @property {IAnnotation[]} annotation An array of annotations.
 */
export interface IAnnotatedtext {
  annotation: IAnnotation[];
}

/**
 * Compose an annotated text from an AST and some text
 * suitable for use with LanguageTool.
 *
 * @param text The text to parse.
 * @param nodes The AST to use.
 * @param interpretAs Function to use to interpret markup where needed.
 * @param nodeTypes List of node types to treat as text.
 * @returns An annotated text suitable for use with LanguageTool.
 *
 */
export function compose(
  text: string,
  nodes: SyntaxNode,
  intepretAs: () => string,
  nodeTypes: string[],
): IAnnotatedtext;

/**
 * Build an annotated text from a HTML string using the treesitter parser.
 * @function annotatedHtml
 * @param text The HTML string to parse.
 * @returns The annotated text.
 */
export function annotatedHtml(text: string): IAnnotatedtext;
