import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/login", "LoginController.login");
  Route.post("/register", "LoginController.createUser");
}).prefix("/api");

Route.group(() => {
  Route.get("/", "LogsController.getData");
  Route.get("/searchBydate", "LogsController.dateSearch");
  Route.post("/postdata", "LogsController.postLog");
  Route.post("/addTarget", "LogsController.addTarget");
  Route.put("/putdata", "LogsController.updateLog");
  Route.put("/ageUpdate", "UsersController.updateAge");
  Route.put("/passUpdate", "UsersController.updatePass");
  Route.delete("/deletedata", "LogsController.deleteLog");
}).middleware("Routeauth");
