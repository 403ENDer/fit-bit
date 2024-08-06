import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class Routeauth {
  public async handle(
    { auth, request, response }: HttpContextContract,
    next: () => Promise<void>
  ) {
    try {
      await auth.use("api").authenticate();
      await next();
    } catch (err) {
      console.error("Authentication Error:", err);
      return response.unauthorized("Unauthorized acess");
    }
  }
}
