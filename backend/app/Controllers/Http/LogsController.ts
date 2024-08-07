import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";
import LogDetail from "App/Models/LogDetail";
import LogValidator from "App/Validators/LogValidator";

export default class LogsController {
  public async getData({ request, response }: HttpContextContract) {
    try {
      const emailID = await request.input("email");
      const data = await LogDetail.query().where("email", emailID);
      const userData = await User.findBy("email", emailID);
      response.json({ data: data, userData: userData });
    } catch (err) {
      response.json({ error: "Something went wrong" });
    }
  }

  public async postLog({ request, response }: HttpContextContract) {
    try {
      console.log(request.input("activity"));
      const paylod = await request.validate(LogValidator);
      await LogDetail.create({
        email: paylod.email,
        activity: paylod.activity,
        calories_burn: paylod.calories_burn,
        createdAt: paylod.date,
      });
      console.log("Lod data Added");
      const data = await LogDetail.findBy("email", paylod.email);
      console.log(data);
      response.json({
        message: "Log added successfully",
        data: data,
      });
    } catch (err) {
      console.log(err);
      response.json({ error: "Something went Wrong" });
    }
  }

  public async updateLog({ request, response }: HttpContextContract) {
    try {
      const id = request.input("id"),
        email = request.input("email"),
        activity = request.input("activity"),
        calories_burn = request.input("calories_burn"),
        date = request.input("date");
      await LogDetail.updateOrCreate(
        { id: id },
        {
          email: email,
          activity: activity,
          calories_burn: calories_burn,
          createdAt: date,
        }
      );
      const data = await LogDetail.findBy("email", email);
      console.log(`Log data with id ${id} was updated`);
      response.json({
        message: "Log added successfully",
        data: data,
      });
    } catch (err) {
      console.log(err);
      response.json({ error: "Something went Wrong" });
    }
  }
  public async dateSearch({ request, response }: HttpContextContract) {
    try {
      const emailID = request.input("email");
      const start = request.input("start_date");
      const end = request.input("end_date");
      var resultSet;
      if (start && end) {
        resultSet = await LogDetail.query()
          .where("email", emailID)
          .andWhere("created_at", ">=", start)
          .andWhere("created_at", "<=", end);
      } else if (start) {
        resultSet = await LogDetail.query()
          .where("email", emailID)
          .andWhere("created_at", ">=", start);
      } else if (end) {
        resultSet = await LogDetail.query()
          .where("email", emailID)
          .andWhere("created_at", "<=", end);
      } else {
        resultSet = await LogDetail.query().where("email", emailID);
      }
      response.json(resultSet);
    } catch (err) {
      response.json({ error: err });
    }
  }

  public async deleteLog({ request, response }: HttpContextContract) {
    try {
      const id = request.input("id");
      await LogDetail.query().where("id", id).delete();
      console.log(`Log data with id ${id} was deleted`);
      response.json({
        message: "Log added successfully",
      });
    } catch (err) {
      console.log(err);
      response.json({ error: "Something went Wrong" });
    }
  }

  public async addTarget({ request, response }: HttpContextContract) {
    try {
      console.log("hi");
      const email = request.input("email");
      const target = request.input("target");

      await User.updateOrCreate(
        { email: email },
        {
          target: target,
        }
      );
      response.json({
        message: "Log added successfully",
      });
    } catch (err) {
      console.log(err);
      response.json({ error: "Something went Wrong" });
    }
  }
}
