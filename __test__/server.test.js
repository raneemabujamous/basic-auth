const { server } = require("../src/server");
const supertest = require("supertest");
const mockRequest = supertest(server);
const { db } = require("../src/model/index");
//---------------------------------------------------------------------------------------
beforeAll(async () => {
  await db.sync();
});
//---------------------------------------------------------------------------------------
afterAll(async () => {
  await db.drop();
});
//---------------------------------------------------------------------------------------
describe("TEST ALL", () => {
  //---------------------------------------------------------------------------------------
  it("not found", async () => {
    const response = await mockRequest.get("/notfound");
    expect(response.status).toBe(404);
  });
  //---------------------------------------------------------------------------------------
  it("500  error", async () => {
    const response = await mockRequest.get("/foo");
    expect(response.status).toBe(404);
  });
});
//---------------------------------------------------------------------------------------
describe("Server Test", () => {
  it("SignUp test", async () => {
    const user = await mockRequest.post("/signup").send({
      username: "raneem",
      password: "raneem",
    });
    expect(user.status).toEqual(200);
  });
  //---------------------------------------------------------------------------------------
  it("SignIn", async () => {
    const user = await mockRequest.post("/signin").auth("raneem", "raneem");
    expect(user.status).toEqual(200);
  });
  //---------------------------------------------------------------------------------------

  it(" not access MiddelWare", async () => {
    const user = await mockRequest.post("/signin").auth("aaasd", "aasfdmiasfn");
    expect(user.status).toEqual(403);
  });
  //---------------------------------------------------------------------------------------
  it("SignUp , SignIn", async () => {
    const Obj = await mockRequest.post("/signup").send({
      username: "raneem",
      password: "raneem",
    });
    //---------------------------------------------------------------------------------------
    const user = await mockRequest
      .post("/signin")
      .send({
        username: "raneem",
        password: "raneem",
      })
      .auth(Obj.body.username, "raneem");
    expect(user.status).toEqual(200);
  });
  //---------------------------------------------------------------------------------------
});
