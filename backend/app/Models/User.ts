import { DateTime } from "luxon";
import { BaseModel, column, HasMany, hasMany } from "@ioc:Adonis/Lucid/Orm";
import LogDetail from "./LogDetail";
import Hash from "@ioc:Adonis/Core/Hash";

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public email: string;

  @column()
  public age: number;

  @column()
  public target: string;

  @hasMany(() => LogDetail, {
    foreignKey: "email",
    localKey: "email",
  })
  public emailRefrence: HasMany<typeof LogDetail>;

  @column({ serializeAs: null })
  public password: string;

  public static async createUser(data: {
    name: string;
    email: string;
    password: string;
  }) {
    const hashedPassword = await Hash.make(data.password);
    return this.create({ ...data, password: hashedPassword });
  }

  public async verifyPassword(password: string): Promise<boolean> {
    return Hash.verify(this.password, password);
  }
}
