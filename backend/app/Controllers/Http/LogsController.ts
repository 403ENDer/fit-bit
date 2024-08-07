import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";
import LogDetail from "App/Models/LogDetail";
import LogValidator from "App/Validators/LogValidator";
import GetValidator from "App/Validators/GetValidator";
import PutValidator from "App/Validators/PutValidator";
import PostValidator from "App/Validators/PostValidator";
import deleteValidator from "App/Validators/DeleteValidator";
import searchValidator from "App/Validators/SearchValidator";
export default class LogsController {
  public async getData({ request, response }: HttpContextContract) {
    try {
      console.log("hi");
      const payload = await request.validate(GetValidator);
      const data = await LogDetail.query().where("email", payload.email);
      const userData = await User.findBy("email", payload.email);
      response.status(200).json({ data: data, userData: userData });
    } catch (err) {
      response.status(400).json({ error: "Something went wrong" });
    }
  }

  public async postLog({ request, response }: HttpContextContract) {
    try {
      console.log(request.input("activity"));
      const paylod = await request.validate(PostValidator);
      await LogDetail.create({
        email: paylod.email,
        activity: paylod.activity,
        calories_burn: paylod.calories_burn,
        createdAt: paylod.date,
      });
      console.log("Lod data Added");
      const data = await LogDetail.query().where("email", paylod.email);
      console.log(data);
      response.status(200).json({
        message: "Log added successfully",
        data: data,
      });
    } catch (err) {
      console.log(err);
      response.status(400).json(err);
    }
  }

  public async updateLog({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(PutValidator);
      await LogDetail.updateOrCreate(
        { id: payload.id },
        {
          email: payload.email,
          activity: payload.activity,
          calories_burn: payload.calories_burn,
          createdAt: payload.date,
        }
      );
      const data = await LogDetail.findBy("email", payload.email);
      console.log(`Log data with id ${payload.id} was updated`);
      response.status(200).json({
        message: "Log added successfully",
        data: data,
      });
    } catch (err) {
      console.log(err);
      response.status(400).json({ error: "Something went Wrong" });
    }
  }
  public async dateSearch({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(searchValidator);
      const start = payload.start ? payload.start.toISO() : null;
      const end = payload.end ? payload.end.toISO() : null;
      var resultSet;
      if (payload.start < payload.end) {
        if (start && end) {
          resultSet = await LogDetail.query()
            .where("email", payload.email)
            .andWhere("created_at", ">=", start)
            .andWhere("created_at", "<=", end);
        } else if (start) {
          resultSet = await LogDetail.query()
            .where("email", payload.email)
            .andWhere("created_at", ">=", start);
        } else if (end) {
          resultSet = await LogDetail.query()
            .where("email", payload.email)
            .andWhere("created_at", "<=", end);
        } else {
          resultSet = await LogDetail.query().where("email", payload.email);
        }
        response.status(200).json(resultSet);
      } else {
        response
          .status(400)
          .json({ error: "Start date should be less than end date" });
      }
    } catch (err) {
      response.status(400).json({ error: err });
    }
  }

  public async deleteLog({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(deleteValidator);
      await LogDetail.query().where("id", payload.id).delete();
      console.log(`Log data with payload.id ${payload.id} was deleted`);
      response.status(200).json({
        message: "Log added successfully",
      });
    } catch (err) {
      console.log(err);
      response.status(400).json({ error: "Something went Wrong" });
    }
  }

  public async addTarget({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(LogValidator);
      await User.updateOrCreate(
        { email: payload.email },
        {
          target: payload.target,
        }
      );
      response.status(200).json({
        message: "Log added successfully",
      });
    } catch (err) {
      console.log(err);
      response.status(400).json({ error: "Something went Wrong" });
    }
  }
}
