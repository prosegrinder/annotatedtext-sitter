import * as chai from "chai";
// import annotatedHtml from "../out/html.js";
import * as annotatedSitter from "../out/index.js";
import fs from "node:fs";

describe("#Html()", function () {
  it("should return the expected annotated text object", function () {
    const expected = JSON.parse(
      fs.readFileSync("./tests/html/basic.json", "utf8"),
    );
    const text = fs.readFileSync("./tests/html/basic.html", "utf8");
    const result = annotatedSitter.getNodesFromSource("html", text);
    // fs.writeFileSync(
    //   "./out/html-basic.json",
    //   JSON.stringify(result, null, 2),
    // );
    chai.expect(result).to.deep.equal(expected);
  });

  it("should match the original document exactly", function () {
    const expected = fs.readFileSync("./tests/html/basic.html", "utf8");
    const annotatedtext = annotatedSitter.getNodesFromSource("html", expected);
    const annotation = annotatedtext.annotation;
    let result = "";
    for (let node of annotation) {
      const text = node.text ? node.text : node.markup;
      result += text;
    }
    // fs.writeFileSync(
    //   "./out/html-basic.html",
    //   result,
    // );
    chai.expect(result).to.equal(expected);
  });

  it("should return the expected annotated text with backslashes object", function () {
    const expected = JSON.parse(
      fs.readFileSync("./tests/html/backslashes.json", "utf8"),
    );
    const text = fs.readFileSync("./tests/html/backslashes.html", "utf8");
    const result = annotatedSitter.getNodesFromSource("html", text);
    // fs.writeFileSync(
    //   "./out/html-backslashes.json",
    //   JSON.stringify(result, null, 2),
    // );
    chai.expect(result).to.deep.equal(expected);
  });

  it("should match the original document with backslashes exactly", function () {
    const expected = fs.readFileSync("./tests/html/backslashes.html", "utf8");
    const annotatedtext = annotatedSitter.getNodesFromSource("html", expected);
    const annotation = annotatedtext.annotation;
    let result = "";
    for (let node of annotation) {
      const text = node.text ? node.text : node.markup;
      result += text;
    }
    // fs.writeFileSync(
    //   "./out/html-backslashes.html",
    //   result,
    // );
    chai.expect(result).to.equal(expected);
  });
});
