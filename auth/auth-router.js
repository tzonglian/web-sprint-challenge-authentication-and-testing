const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = require("express").Router();

const Users = require("../jokes/users-model");
const { jwtSecret } = require("./secrets.js");

function makeToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
  };
  const options = {
    expiresIn: "60 seconds",
  };
  return jwt.sign(payload, jwtSecret, options);
}

// WORKS
router.post("/register", (req, res) => {
  // implement registration
  const credentials = req.body;
  const rounds = process.env.BCRYPT_ROUNDS || 8;
  const hash = bcryptjs.hashSync(credentials.password, rounds);
  credentials.password = hash;

  Users.add(credentials)
    .then((user) => {
      res.status(201).json({ data: user });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

// WORKS
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  // implement login
  Users.findBy({ username: username })
    .then(([user]) => {
      if (user && bcryptjs.compareSync(password, user.password)) {
        const token = makeToken(user);
        console.log("token: ", token);
        res
          .status(200)
          .json({ message: `Welcome to our API, ${user.username}`, token });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

module.exports = router;
