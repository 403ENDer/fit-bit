import { schema, CustomMessages } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class LogValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    activity: schema.string(),
    calories_burn: schema.number(),
    email: schema.string(),
    date: schema.date(),
  });
  public messages: CustomMessages = {
    calories_burn: "Calories burn is must be a number",
  };
}
