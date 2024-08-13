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
      const payload = await request.validate(GetValidator);
      const limit = 6;
      const data = await LogDetail.query()
        .where("email", payload.email)
        .orderBy("created_at", "desc")
        .orderBy("id", "desc")
        .paginate(payload.page, limit);
      const userData = await User.findBy("email", payload.email);
      response.status(200).json({ data: data, userData: userData });
    } catch (err) {
      console.log(err);
      response.status(400).json({ error: "Something went wrong" });
    }
  }

  public async postLog({ request, response }: HttpContextContract) {
    try {
      const paylod = await request.validate(PostValidator);
      await LogDetail.create(paylod);
      console.log("Lod data Added");
      const data = await LogDetail.query()
        .where("email", paylod.email)
        .orderBy("created_at", "desc")
        .orderBy("id", "desc");
      //console.log(data);
      response.status(200).json({
        message: "Log added successfully",
        data: data,
      });
    } catch (err) {
      console.log(err);
      response.status(400).json({ error: err });
    }
  }

  public async updateLog({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(PutValidator);
      //console.log(payload);
      await LogDetail.updateOrCreate(
        { id: payload.id, email: payload.email },
        {
          activity: payload.activity,
          calories_burn: payload.calories_burn,
          createdAt: payload.created_at,
        }
      );
      const data = await LogDetail.query()
        .where("email", payload.email)
        .orderBy("created_at", "desc")
        .orderBy("id", "desc");
      console.log(`Log data with id ${payload.id} was updated`);
      response.status(200).json({
        message: "Log added successfully",
        data: data,
      });
    } catch (err) {
      console.log(err);
      response.status(400).json({ error: err });
    }
  }
  public async dateSearch({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(searchValidator);
      const start = payload.start ? payload.start.toISO() : null;
      const end = payload.end ? payload.end.toISO() : null;
      const limit = 6;
      var resultSet;
      if (payload.start < payload.end) {
        if (start && end) {
          resultSet = await LogDetail.query()
            .where("email", payload.email)
            .andWhere("created_at", ">=", start)
            .andWhere("created_at", "<=", end)
            .paginate(payload.page, limit);
        } else if (start) {
          resultSet = await LogDetail.query()
            .where("email", payload.email)
            .andWhere("created_at", ">=", start)
            .paginate(payload.page, limit);
        } else if (end) {
          resultSet = await LogDetail.query()
            .where("email", payload.email)
            .andWhere("created_at", "<=", end)
            .paginate(payload.page, limit);
        } else {
          resultSet = await LogDetail.query()
            .where("email", payload.email)
            .orderBy("created_at", "desc")
            .paginate(payload.page, limit);
        }
        response.status(200).json(resultSet);
      } else {
        response.status(400).json({
          error: "Start date should be less than end date",
          data: await LogDetail.query()
            .where("email", payload.email)
            .orderBy("created_at", "desc")
            .orderBy("id", "desc"),
        });
      }
    } catch (err) {
      const email = request.input("email");
      console.log(err);
      response.status(401).json({
        error: err,
        data: await LogDetail.query()
          .where("email", email)
          .orderBy("created_at", "desc")
          .orderBy("id", "desc"),
      });
    }
  }

  public async deleteLog({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(deleteValidator);
      await LogDetail.query().where("id", payload.id).delete();
      console.log(`Log data with payload.id ${payload.id} was deleted`);
      const data = await LogDetail.query()
        .where("email", payload.email)
        .orderBy("created_at", "desc")
        .orderBy("id", "desc");
      response.status(200).json({
        data: data,
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
      console.log(`Target added to the ${payload.email} successfully`);
      response.status(200).json({
        message: "Log added successfully",
      });
    } catch (err) {
      console.log(err);
      response.status(400).json({ error: "Something went Wrong" });
    }
  }
}
