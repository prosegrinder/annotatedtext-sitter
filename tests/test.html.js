import * as chai from "chai";
import annotatedHtml from "../out/html.js";
import fs from "node:fs";

describe("#annotatedHtml()", function () {
  it("should return the expected annotated text object", function () {
    const expected = JSON.parse(
      fs.readFileSync("./tests/html/annotatedtext.json", "utf8"),
    );
    const text = fs.readFileSync("./tests/html/test.html", "utf8");
    const result = annotatedHtml(text);
    fs.writeFileSync(
      "./out/annotatedtext-original.json",
      JSON.stringify(result, null, 2),
    );
    chai.expect(result).to.deep.equal(expected);
  });

  it("should match the original document exactly", function () {
    const expected = fs.readFileSync("./tests/html/test.html", "utf8");
    const annotatedtext = annotatedHtml(expected);
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
    const result = annotatedHtml(text);
    fs.writeFileSync(
      "./out/annotatedtext-backslashes.json",
      JSON.stringify(result, null, 2),
    );
    chai.expect(result).to.deep.equal(expected);
  });

  it("should match the original document with backslashes exactly", function () {
    const expected = fs.readFileSync("./tests/html/backslashes.html", "utf8");
    const annotatedtext = annotatedHtml(expected);
    const annotation = annotatedtext.annotation;
    let result = "";
    for (let node of annotation) {
      const text = node.text ? node.text : node.markup;
      result += text;
    }
    chai.expect(result).to.equal(expected);
  });
});
