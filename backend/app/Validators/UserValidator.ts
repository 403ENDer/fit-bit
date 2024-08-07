import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class UserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id: schema.number([rules.unsigned()]),
    name: schema.string([rules.maxLength(20)]),
    email: schema.string([
      rules.regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
      rules.required(),
      rules.unique({ table: "users", column: "email" }),
    ]),
    age: schema.number(),
    password: schema.string([rules.required(), rules.minLength(4)]),
  });
  public messages: CustomMessages = {
    "email.regex": "Not a valid email id",
    "password.required": "Password is empty",
    "password.minLength": "Minimum password length is 4",
  };
}
