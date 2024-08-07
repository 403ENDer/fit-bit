import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";
import UserValidator from "App/Validators/UserValidator";

export default class UserRequestsController {
  public async createUser({ auth, response, request }: HttpContextContract) {
    try {
      const data = await request.validate(UserValidator);

      const existingUser = await User.query()
        .where("email", data.email)
        .first();

      if (existingUser) {
        return response.status(400).json({ message: "User already exists" });
      }

      const user = await User.createUser(data);
      const token = await auth.use("api").login(user);
      return response
        .status(200)
        .json({ message: "User created successfully", token: token });
    } catch (err) {
      console.error(err);
      return response.status(400).json({ message: err });
    }
  }

  public async login({ auth, request, response }: HttpContextContract) {
    const email = request.input("email");
    const password = request.input("password");

    try {
      const token = await auth.use("api").attempt(email, password);
      return response.status(200).json({ message: "Login successful", token });
    } catch (err) {
      console.error(err);
      return response.status(400).unauthorized("Invalid credentials");
    }
  }
}
