import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "users";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.string("name").notNullable();
      table.string("email").notNullable().unique();
      table.integer("age").notNullable();
      table.integer("target");
      table.string("password");
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
