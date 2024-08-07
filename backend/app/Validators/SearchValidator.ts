import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class searchValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string([
      rules.regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
    ]),
    start: schema.date({}, [rules.before("today")]),
    end: schema.date({}, [rules.before("today")]),
  });
  public messages: CustomMessages = {
    "email.regex": "Not a valid email id",
    "start.before": "Date should be before today",
    "end.before": "Date should be before today",
  };
}
