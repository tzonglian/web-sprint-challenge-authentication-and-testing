const User = require("./users-model");
const db = require("../database/dbConfig");
const { italic } = require("colors");
const router = require("./jokes-router");

// beforeEach(async () => {
//   await db("auth").truncate();
// });

describe("get jokes", () => {
  it("gets an array of jokes", async () => {
    const jokes = await router.get("/", (req, res) => {
      const requestOptions = {
        headers: { accept: "application/json" },
      };
      axios
        .get("https://icanhazdadjoke.com/search", requestOptions)
        .then((response) => {
          res.status(200).json(response.data.results);
          console.log(response.data.results);
        })
        .catch((err) => {
          res.status(500).json({ message: "Error Fetching Jokes", error: err });
        });
    });
    expect(jokes).toHaveLength(3);
  });
});
