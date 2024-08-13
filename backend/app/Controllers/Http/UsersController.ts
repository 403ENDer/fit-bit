import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import AgeValidator from "App/Validators/AgeValidator";
import PasswordValidator from "App/Validators/PasswordValidator";
import User from "App/Models/User";
import Hash from "@ioc:Adonis/Core/Hash";

export default class UsersController {
  public async updateAge({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(AgeValidator);
      await User.query()
        .where("email", payload.email)
        .update("age", payload.age);
      const data = await User.findBy("email", payload.email);
      console.log(data);
      response.status(200).json(data);
    } catch (err) {
      response.status(400).json(err);
    }
  }

  public async updatePass({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(PasswordValidator);
      const user = await User.findBy("email", payload.email);

      if (!user) {
        return response.status(404).json({ message: "User not found" });
      }
      const isOldPasswordValid = await Hash.verify(
        user.password,
        payload.oldPass
      );

      if (!isOldPasswordValid) {
        return response
          .status(401)
          .json({ message: "Old password is incorrect" });
      }

      if (payload.newPass === payload.oldPass) {
        return response.status(401).json({
          message: "New password is not to be your old Password",
        });
      }
      const hashedPassword = await Hash.make(payload.newPass);
      user.password = hashedPassword;
      await user.save();

      return response
        .status(200)
        .json({ message: "Password updated successfully", data: user });
    } catch (error) {
      return response.status(500).json(error);
    }
  }
}
