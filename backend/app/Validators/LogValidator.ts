import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class LogValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string([
      rules.regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
    ]),
    target: schema.number([rules.unsigned()]),
  });
  public messages: CustomMessages = {
    "email.required": "Email should be required",
    "target.required": "Target is required",
    "target.unsigned": "Target must be a positive number",
    "email.regex": "Not a valid email id",
  };
}
