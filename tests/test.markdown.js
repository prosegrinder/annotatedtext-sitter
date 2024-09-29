import * as chai from "chai";
import * as annotatedSitter from "../out/index.js";
import fs from "fs";

describe("#Markdown()", function () {
  // Original Test Case
  it("should return the expected annotated text object", function () {
    const expected = JSON.parse(
      fs.readFileSync("./tests/markdown/basic.json", "utf8"),
    );
    const text = fs.readFileSync("./tests/markdown/basic.md", "utf8");
    const result = annotatedSitter.getNodesFromSource("markdown", text);
    fs.writeFileSync(
      "./out/basic.json",
      JSON.stringify(result, null, 2),
    );
    chai.expect(result).to.deep.equal(expected);
  });

  it("should match the original document exactly", function () {
    const expected = fs.readFileSync("./tests/markdown/basic.md", "utf8");
    const annotatedtext = annotatedSitter.getNodesFromSource("markdown", expected);
    const annotation = annotatedtext.annotation;
    let result = "";
    for (let node of annotation) {
      const text = node.text ? node.text : node.markup;
      result += text;
    }
    chai.expect(result).to.equal(expected);
  });

  // Frontmatter Test Case
  it("should return the expected annotated text object with frontmatter", function () {
    const expected = JSON.parse(
      fs.readFileSync("./tests/markdown/frontmatter.json", "utf8"),
    );
    const text = fs.readFileSync("./tests/markdown/frontmatter.md", "utf8");
    const result = annotatedSitter.getNodesFromSource("markdown", text);
    fs.writeFileSync(
      "./out/frontmatter.json",
      JSON.stringify(result, null, 2),
    );
    chai.expect(result).to.deep.equal(expected);
  });

  it("should match the original document exactly with frontmatter", function () {
    const expected = fs.readFileSync("./tests/markdown/frontmatter.md", "utf8");
    const annotatedtext = annotatedSitter.getNodesFromSource("markdown", expected);
    const annotation = annotatedtext.annotation;
    let result = "";
    for (let node of annotation) {
      const text = node.text ? node.text : node.markup;
      result += text;
    }
    chai.expect(result).to.equal(expected);
  });

  // Escape Character Test Case
  it("should return the expected annotated text object with the escape character", function () {
    const expected = JSON.parse(
      fs.readFileSync("./tests/markdown/escape-character.json", "utf8"),
    );
    const text = fs.readFileSync("./tests/markdown/escape-character.md", "utf8");
    const result = annotatedSitter.getNodesFromSource("markdown", text);
    // fs.writeFileSync(
    //   "./out/escape-character.json",
    //   JSON.stringify(result, null, 2),
    // );
    chai.expect(result).to.deep.equal(expected);
  });

  it("should match the original document exactly with the escape character", function () {
    const expected = fs.readFileSync("./tests/markdown/escape-character.md", "utf8");
    const annotatedtext = annotatedSitter.getNodesFromSource("markdown", expected);
    const annotation = annotatedtext.annotation;
    let result = "";
    for (let node of annotation) {
      const text = node.text ? node.text : node.markup;
      result += text;
    }
    chai.expect(result).to.equal(expected);
  });
});
