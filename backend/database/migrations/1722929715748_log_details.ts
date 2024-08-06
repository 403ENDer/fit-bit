import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "log_details";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.string("email").references("users.email");
      table.string("activity");
      table.integer("calories_burn");
      table.dateTime("created_at");
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
