import { assert } from "chai";
import request from "supertest";
import app from "../app.js";

const server = await app;

describe("this is another test", function () {
  it("App shoud know how to pass a boolean test", function () {
    assert.isTrue(true);
  });
});

describe("Testing server", () => {
  it("responds with 200", function (done) {
    request(server).get("/").expect(404, done);
  });
});

/*describe("Testing Categories API", () => {
  it("responds with 200", function (done) {
    request(server).get("/api/categories").expect(200, done);
  });
});*/

describe("Testing Categories API", () => {
  it("responds with 200", async function () {
    const response = await request(server)
      .get("/api/categories")
      .expect("Content-Type", /json/)
      .expect(200);
    assert.isArray(response.body);
  });
});
