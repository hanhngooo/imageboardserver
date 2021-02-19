const { Router } = require("express");
const Image = require("../models").image;
const { toData } = require("../auth/jwt");
const authMiddleware = require("../auth/middleware");
const router = new Router();

router.get("/", authMiddleware, async (resquest, response, next) => {
  try {
    const imageGet = await Image.findAll();
    response.json(imageGet);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (request, response, next) => {
  try {
    const { title, url } = request.body;
    if (!title || !url) {
      response.status(400).send("Parameter is missing");
    } else {
      const imageGet = await Image.create(request.body);
      response.json(imageGet);
    }
  } catch (error) {
    next(error);
  }
});
// router.get("/", (req, res, next) => {
//   const limit = Math.min(req.query.limit || 25, 500);
//   const offset = req.query.offset || 0;

//   Image.findAndCountAll({ limit, offset })
//     .then((result) => res.send({ images: result.rows, total: result.count }))
//     .catch((error) => next(error));
// });

router.get("/messy", async (req, res, next) => {
  const auth =
    req.headers.authorization && req.headers.authorization.split(" ");
  if (auth && auth[0] === "Bearer" && auth[1]) {
    try {
      console.log(auth);
      const data = toData(auth[1]);
      console.log(data);
    } catch (e) {
      res.status(400).send("Invalid JWT token");
    }
    const allImages = await Image.findAll();
    res.json(allImages);
  } else {
    res.status(401).send({
      message: "Please supply some valid credentials",
    });
  }
});
module.exports = router;
