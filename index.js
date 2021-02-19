const express = require("express");
const imageRouter = require("./routers/imageRouter");
const userRouter = require("./routers/userRouter");
const login = require("./routers/auth");
const app = express();
const jsonParser = express.json();

app.use(jsonParser);
app.use("/login", login);
app.use("/images", imageRouter);
app.use("/users", userRouter);

const port = 7000;
app.listen(port);
