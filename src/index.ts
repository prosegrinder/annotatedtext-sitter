import { IAnnotatedtext, IAnnotation } from "../types";
import { Tree, SyntaxNode } from "tree-sitter";

function annotatedttextnode(
  node: SyntaxNode,
  text: string,
  nodeTypes: string[],
) {
  if (nodeTypes.includes(node.type)) {
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

function collecttextnodes(
  tree: Tree,
  text: string,
  nodeTypes: string[],
): IAnnotation[] {
  const textannotations: IAnnotation[] = [];

  function recurse(node: SyntaxNode) {
    const annotation = annotatedttextnode(node, text, nodeTypes);
    if (annotation !== null) {
      textannotations.push(annotation);
    }
    const children: SyntaxNode[] = node.children;
    if (children !== null && Array.isArray(children)) {
      children.forEach((child: SyntaxNode) => recurse(child));
    }
  }

  const root = tree.rootNode;
  recurse(root);
  return textannotations;
}

function composeannotation(
  text: string,
  annotatedtextnodes: IAnnotation[],
  interpretAs: (markup: string) => string,
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
      interpretAs: interpretAs(currenttext),
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
    interpretAs: interpretAs(finaltext),
    markup: finaltext,
    offset: {
      end: text.length,
      start: prior.offset.end,
    },
  });
  return { annotation: annotations };
}

function compose(
  text: string,
  tree: Tree,
  interpretAs: (markup: string) => string,
  nodeTypes: string[],
): IAnnotatedtext {
  const textnodes: IAnnotation[] = collecttextnodes(tree, text, nodeTypes);
  return composeannotation(text, textnodes, interpretAs);
}

export { compose };
