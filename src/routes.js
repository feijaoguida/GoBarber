const express = require("express");
const multerConfig = require("./config/multer");
const upload = require("multer")(multerConfig);

const routes = express.Router();

const authMiddleware = require("./app/middlewares/auth");
const guestMiddleware = require("./app/middlewares/guest");

const UserController = require("./app/controllers/UserController");
const SessionController = require("./app/controllers/SessionController");
const DashboardController = require("./app/controllers/DashboardController");
const FileController = require("./app/controllers/FileController");
const AppointmentsController = require("./app/controllers/AppointmentsController")

routes.use((req, res, next) => {
  res.locals.flashSucess = req.flash("sucess");
  res.locals.flashError = req.flash("error");

  return next();
});

routes.get("/files/:file", FileController.show);

routes.get("/", guestMiddleware, SessionController.create);
routes.post("/signin", SessionController.store);

routes.get("/signup", guestMiddleware, UserController.create);
routes.post("/signup", upload.single("avatar"), UserController.store);

routes.use("/app", authMiddleware);

routes.get("/app/logout", SessionController.destroy);

routes.get("/app/dashboard", DashboardController.index);

routes.get("/app/appointments/new/:provider", AppointmentsController.create )

module.exports = routes;
