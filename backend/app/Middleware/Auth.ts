import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class Auth {
  public async handle(
    { auth, response, request }: HttpContextContract,
    next: () => Promise<void>
  ) {
    try {
      console.log(request.headers().authorization);
      await auth.use("api").authenticate();
      await next();
    } catch (err) {
      console.error("Authentication Error:", err);
      return response.unauthorized("Unauthorized acess");
    }
  }
}
