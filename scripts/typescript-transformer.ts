import type { FileInfo, API } from "jscodeshift";

/**
 * Quickfixes Typescript Errors in javascript source files by adding `: any`
 * type annotations as needed.
 */
export default function transformer(fileInfo: FileInfo, api: API) {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);

  // Variable declarations
  root.find(j.VariableDeclarator).forEach((path) => {
    const id = path.node.id;
    if (id.type === "Identifier" && !id.typeAnnotation) {
      id.typeAnnotation = j.typeAnnotation(j.anyTypeAnnotation());
    }
  });

  root.find(j.Function).forEach((path) => {
    const params = path.node.params;

    params.forEach((param) => {
      // Function parameters
      if (param.type === "Identifier" && !param.typeAnnotation) {
        param.typeAnnotation = j.typeAnnotation(j.anyTypeAnnotation());
      }

      // Default parameters
      else if (
        param.type === "AssignmentPattern" &&
        param.left.type === "Identifier" &&
        !param.left.typeAnnotation
      ) {
        param.left.typeAnnotation = j.typeAnnotation(j.anyTypeAnnotation());
      }

      // Rest parameters
      else if (
        param.type === "RestElement" &&
        param.argument.type === "Identifier" &&
        !param.argument.typeAnnotation
      ) {
        param.argument.typeAnnotation = j.typeAnnotation(j.anyTypeAnnotation());
      }
    });
  });

  // Class properties
  root.find(j.ClassProperty).forEach((path) => {
    if (!path.node.typeAnnotation) {
      path.node.typeAnnotation = j.typeAnnotation(j.anyTypeAnnotation());
    }
  });

  return root.toSource({ quote: "single", trailingComma: true });
}
