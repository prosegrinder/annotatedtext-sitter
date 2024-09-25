import * as chai from "chai";
import annotatedMarkdown from "../out/markdown.js";
import fs from "fs";

describe("#annotatedMarkdown()", function () {
  // Original Test Case
  it("should return the expected annotated text object", function () {
    const expected = JSON.parse(
      fs.readFileSync("./tests/markdown/annotatedtext-original.json", "utf8"),
    );
    const text = fs.readFileSync("./tests/markdown/test-original.md", "utf8");
    const result = annotatedMarkdown(text);
    // fs.writeFileSync(
    //   "./out/annotatedtext-original.json",
    //   JSON.stringify(result, null, 2),
    // );
    chai.expect(result).to.deep.equal(expected);
  });

  it("should match the original document exactly", function () {
    const expected = fs.readFileSync("./tests/markdown/test-original.md", "utf8");
    const annotatedtext = annotatedMarkdown(expected);
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
      fs.readFileSync("./tests/markdown/annotatedtext-frontmatter.json", "utf8"),
    );
    const text = fs.readFileSync("./tests/markdown/test-frontmatter.md", "utf8");
    const result = annotatedMarkdown(text);
    // fs.writeFileSync(
    //   "./out/annotatedtext-frontmatter.json",
    //   JSON.stringify(result, null, 2),
    // );
    chai.expect(result).to.deep.equal(expected);
  });

  it("should match the original document exactly with frontmatter", function () {
    const expected = fs.readFileSync("./tests/markdown/test-frontmatter.md", "utf8");
    const annotatedtext = annotatedMarkdown(expected);
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
    const result = annotatedMarkdown(text);
    // fs.writeFileSync(
    //   "./out/escape-character.json",
    //   JSON.stringify(result, null, 2),
    // );
    chai.expect(result).to.deep.equal(expected);
  });

  it("should match the original document exactly with the escape character", function () {
    const expected = fs.readFileSync("./tests/markdown/escape-character.md", "utf8");
    const annotatedtext = annotatedMarkdown(expected);
    const annotation = annotatedtext.annotation;
    let result = "";
    for (let node of annotation) {
      const text = node.text ? node.text : node.markup;
      result += text;
    }
    chai.expect(result).to.equal(expected);
  });
});
