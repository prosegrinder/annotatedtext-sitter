import Parser, { SyntaxNode } from "tree-sitter";
import Html from "tree-sitter-html";
import Markdown from "@tree-sitter-grammars/tree-sitter-markdown";
import { IAnnotatedtext, IAnnotation, ILanguageConfig } from "../types";

export const registry: Record<string, ILanguageConfig> = {
  html: {
    grammar: Html,
    textTypes: ["text"],
    markupTypes: ["start_tag", "end_tag"],
    interpretMarkup: (node) => {
      const countP = (node.text.match(/<\/p>/g) || []).length;
      const countH = (node.text.match(/<\/h\d+>/g) || []).length;
      const countBr = (node.text.match(/<br[\s/]*>/g) || []).length;
      return "\n".repeat(2 * countP + 2 * countH + countBr);
    },
    inSourceGrammars: [],
    inSourceNodeType: "",
    inSourceNodeTypePrefix: "",
  },
  markdown: {
    grammar: Markdown,
    textTypes: ["comment", "line_comment", "@comment", "text"],
    markupTypes: ["start_tag", "end_tag"],
    interpretMarkup: (node) => {
      return "\n".repeat((node.text.match(/\n/g) || []).length);
    },
    inSourceGrammars: [Markdown.inline],
    inSourceNodeType: "inline",
    inSourceNodeTypePrefix: "",
  },
};

export function getNodesFromSource(
  language: string,
  text: string,
  includeMarkup: boolean = true,
): IAnnotatedtext {
  const languageConfig: ILanguageConfig = registry[language];
  const annotations: IAnnotation[] = [];
  const parser = new Parser();
  parser.setLanguage(languageConfig.grammar);
  const tree = parser.parse(text);

  function parseNode(node: SyntaxNode) {
    if (node.previousSibling) {
      if (node.previousSibling.endPosition.row != node.startPosition.row) {
        const lfBuffer: IAnnotation = {
          text: "\n",
          offset: {
            start: node.previousSibling.endIndex,
            end: node.startIndex,
          },
        };
        annotations.push(lfBuffer);
      }
    }
    if (languageConfig.textTypes.includes(node.type)) {
      const annotatedtext: IAnnotation = {
        text: node.text,
        offset: {
          start: node.startIndex,
          end: node.endIndex,
        },
      };
      annotations.push(annotatedtext);
    } else if (
      includeMarkup &&
      languageConfig.markupTypes.includes(node.type)
    ) {
      const annotatedmarkup: IAnnotation = {
        interpretAs: languageConfig.interpretMarkup(node),
        markup: node.text,
        offset: {
          start: node.startIndex,
          end: node.endIndex,
        },
      };
      annotations.push(annotatedmarkup);
    }
    node.children.forEach((child) => {
      parseNode(child);
    });
  }
  parseNode(tree.rootNode);
  if (text.endsWith("\n")) {
    const finalBuffer: IAnnotation = {
      text: "\n",
      offset: {
        start: tree.rootNode.endIndex,
        end: text.length + 1,
      },
    };
    annotations.push(finalBuffer);
  }
  return { annotation: annotations };
}
