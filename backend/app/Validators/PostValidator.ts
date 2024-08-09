import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class PostValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    activity: schema.string(),
    calories_burn: schema.number([rules.unsigned()]),
    email: schema.string([
      rules.regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
    ]),
    date: schema.date({}, [rules.beforeOrEqual("today")]),
  });
  public messages: CustomMessages = {
    "email.required": "Email should be required",
    "date.required": "Date should be mentioned",
    "activity.required": "Activity should be mentioned",
    "calories_burn.required": "Calories Should be mentioned",
    "calories_burn.number": "Calories burn is must be  number",
    "calories_burn.unsigned": "Calories burn is must be a positvie number",
    "email.regex": "Not a valid email id",
    "date.before": "Date should be before today",
  };
}
