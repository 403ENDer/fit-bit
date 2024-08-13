import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class PutValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id: schema.number([rules.unsigned()]),
    activity: schema.string(),
    calories_burn: schema.number([rules.unsigned()]),
    email: schema.string([
      rules.regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
    ]),
    created_at: schema.date({}, [rules.beforeOrEqual("today")]),
  });
  public messages: CustomMessages = {
    "created_at.required": "Date should be mentioned",
    "id.required": "Id should be mentioned",
    "activity.required": "Activity should be mentioned",
    "calories_burn.required": "Calories Should be mentioned",
    "id.unsigned": "Id must be a positive number",
    calories_burn: "Calories burn is must be  number",
    "calories_burn.unsigned": "Calories burn is must be a positvie number",
    "email.regex": "Not a valid email id",
    "created_at.before": "Date should be before today",
  };
}
