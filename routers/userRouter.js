const { Router } = require("express");
const User = require("../models").user;
const router = new Router();
const bcrypt = require("bcrypt");

router.get("/", async (request, response, next) => {
  try {
    const userGet = await User.findAll();
    response.json(userGet);
  } catch (error) {
    next(error);
  }
});
router.post("/", async (req, res, next) => {
  try {
    const { email, password, fullName } = req.body;
    if (!email || !password || !fullName) {
      res.status(400).send("missing parameters");
    } else {
      const hashedPassword = bcrypt.hashSync(password, 10);
      const newUser = await User.create({
        email,
        password: hashedPassword,
        fullName,
      });
      res.json(newUser);
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
