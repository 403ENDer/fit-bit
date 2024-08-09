import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class UserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string([rules.maxLength(20), rules.minLength(3)]),
    email: schema.string([
      rules.regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
      rules.required(),
      rules.unique({ table: "users", column: "email" }),
    ]),
    age: schema.number(),
    password: schema.string([rules.required(), rules.minLength(6)]),
  });
  public messages: CustomMessages = {
    "name.required": "Name is required",
    "name.maxLength": "Username should be less than 20 charecters",
    "name.minLength": "Username should be greater than 3 charecters",
    "email.required": "Email is required",
    "age.required": "Age is required",
    "email.regex": "Not a valid email id",
    "email.unique": "Email Id already exists",
    "password.required": "Password is empty",
    "password.minLength": "Minimum password length is 6",
  };
}
