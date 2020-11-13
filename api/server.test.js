const request = require("supertest");
const server = require("./server.js");

describe("server.js module", () => {
  it("is the testing environment", () => {
    expect(process.env.DB_ENV).not.toBe("development");
    expect(process.env.DB_ENV).not.toBe("production");
    expect(process.env.DB_ENV).toBe("testing");
  });

  describe("[GET] /", () => {
    it("works", () => {
      return request(server)
        .get("/")
        .expect("Content-Type", /json/)
        .expect("Content-Length", "36")
        .expect({ api: "API is up - Dad joke time!" });
    });

    it("works also using jest syntax", async () => {
      const res = await request(server).get("/?foo=bar");
      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({ api: "API is up - Dad joke time!" });
      expect(res.type).toMatch(/json/);
      expect(res.body).toMatchSnapshot();
    });
  });

  describe("[GET] /api/jokes", () => {
    it("works and throws err bc no token", () => {
      return request(server)
        .get("/api/jokes")
        .expect("Content-Type", /json/)
        .expect({
          api: 'message: "Connection refused bc you do not have a token"',
        });
    });
  });
});
