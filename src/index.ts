import { IAnnotatedtext, IAnnotation } from "../types";
import { Tree, SyntaxNode } from "tree-sitter";

function interpretmarkup(text: string = "") {
  return text;
}

function annotatedttextnode(node: SyntaxNode, text: string) {
  if (node.type === "text") {
    return {
      offset: {
        end: node.endIndex,
        start: node.startIndex,
      },
      text: text.substring(node.startIndex, node.endIndex),
    };
  } else {
    return null;
  }
}

function collecttextnodes(tree: Tree, text: string): IAnnotation[] {
  const textannotations: IAnnotation[] = [];

  function recurse(node: SyntaxNode) {
    const annotation = annotatedttextnode(node, text);
    if (annotation !== null) {
      textannotations.push(annotation);
    }
    const children: SyntaxNode[] = node.children;
    if (children !== null && Array.isArray(children)) {
      children.forEach(recurse);
    }
  }

  const root = tree.rootNode;
  recurse(root);
  return textannotations;
}

function composeannotation(
  text: string,
  annotatedtextnodes: IAnnotation[],
): IAnnotatedtext {
  const annotations: IAnnotation[] = [];
  let prior: IAnnotation = {
    offset: {
      end: 0,
      start: 0,
    },
  };
  for (const current of annotatedtextnodes) {
    const currenttext = text.substring(prior.offset.end, current.offset.start);
    annotations.push({
      interpretAs: interpretmarkup(currenttext),
      markup: currenttext,
      offset: {
        end: current.offset.start,
        start: prior.offset.end,
      },
    });
    annotations.push(current);
    prior = current;
  }
  // Always add a final markup node to ensure trailing whitespace is added.
  const finaltext = text.substring(prior.offset.end, text.length);
  annotations.push({
    interpretAs: interpretmarkup(finaltext),
    markup: finaltext,
    offset: {
      end: text.length,
      start: prior.offset.end,
    },
  });
  return { annotation: annotations };
}

function compose(text: string, tree: Tree): IAnnotatedtext {
  const textnodes: IAnnotation[] = collecttextnodes(tree, text);
  return composeannotation(text, textnodes);
}

export { compose };
