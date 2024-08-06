import { DateTime } from "luxon";
import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import User from "./User";

export default class LogDetail extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public activity: string;

  @column()
  public email: string;

  @column()
  public calories_burn: number;

  @column.dateTime()
  public createdAt: DateTime;

  @belongsTo(() => User, {
    foreignKey: "email",
    localKey: "email",
  })
  public emailReference: BelongsTo<typeof User>;
}
