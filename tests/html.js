import * as chai from "chai";
import { buildHtml } from "../out/html.js";
import fs from "node:fs";

describe("#build()", function () {
  it("should return the expected annotated text object", function () {
    const expected = JSON.parse(
      fs.readFileSync("./tests/html/annotatedtext.json", "utf8"),
    );
    const text = fs.readFileSync("./tests/html/test.html", "utf8");
    const result = buildHtml(text);
    chai.expect(result).to.deep.equal(expected);
  });

  it("should match the original document exactly", function () {
    const expected = fs.readFileSync("./tests/html/test.html", "utf8");
    const annotatedtext = buildHtml(expected);
    const annotation = annotatedtext.annotation;
    let result = "";
    for (let node of annotation) {
      const text = node.text ? node.text : node.markup;
      result += text;
    }
    chai.expect(result).to.equal(expected);
  });

  it("should return the expected annotated text with backslashes object", function () {
    const expected = JSON.parse(
      fs.readFileSync("./tests/html/backslashes.json", "utf8"),
    );
    const text = fs.readFileSync("./tests/html/backslashes.html", "utf8");
    const result = buildHtml(text);
    chai.expect(result).to.deep.equal(expected);
  });

  it("should match the original document with backslashes exactly", function () {
    const expected = fs.readFileSync("./tests/html/backslashes.html", "utf8");
    const annotatedtext = buildHtml(expected);
    const annotation = annotatedtext.annotation;
    let result = "";
    for (let node of annotation) {
      const text = node.text ? node.text : node.markup;
      result += text;
    }
    chai.expect(result).to.equal(expected);
  });
});
