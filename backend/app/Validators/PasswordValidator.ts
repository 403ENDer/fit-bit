import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class PasswordValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string(),
    oldPass: schema.string([rules.minLength(4)]),
    newPass: schema.string([rules.minLength(4)]),
  });
  public messages: CustomMessages = {
    "email.required": "Email id is required",
    "oldPass.required": "Old password is required",
    "oldPass.minLength": "Old password minimum length is 4",
    "newPass.required": "New password is required",
    "newPass.minLength": "New password minimum length is 4",
  };
}
