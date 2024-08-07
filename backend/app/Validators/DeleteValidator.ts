import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class deleteValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id: schema.number([rules.unsigned()]),
  });
  public messages: CustomMessages = {
    "id.unsigned": "Id must be a positive number",
  };
}
