import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class searchValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string([
      rules.regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
    ]),
    start: schema.date({}, [rules.beforeOrEqual("today")]),
    end: schema.date({}, [rules.beforeOrEqual("today")]),
    page: schema.number(),
  });
  public messages: CustomMessages = {
    "email.required": "Email should be required",
    "start.required": "Start Date is required",
    "end.required": "End date is required",
    "email.regex": "Not a valid email id",
    "start.before": "Date should be before today",
    "end.before": "Date should be before today",
    "page.number": "Page shoule be in Integer",
    "page.required": "Page number is required",
  };
}
