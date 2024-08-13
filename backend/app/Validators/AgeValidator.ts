import { schema, CustomMessages } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class AgeValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    age: schema.number(),
    email: schema.string(),
  });
  public messages: CustomMessages = {
    "age.required": "Age is required",
    "age.number": "Age should be an Integer",
    "email.requried": "Email is requried",
  };
}
