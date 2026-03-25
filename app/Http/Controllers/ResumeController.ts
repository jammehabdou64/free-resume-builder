import { httpContext } from "jcc-express-mvc";
import { Inject, Method } from "jcc-express-mvc/Core/Dependency";
import { Resume } from "@/Model/Resume";
@Inject()
export class ResumeController {
  /**
   *@access public
   * @return  Express Request Response
   */
  async create({ req, res, next } = httpContext) {
    //
  }
  /**
   *@access public
   * @return  Express Request Response
   */
  @Method()
  async index({ req, res, next } = httpContext) {
    //
  }

  /**
   *
   *@access public
   * @return Express Request Response
   */
  async store({ req, res, next } = httpContext) {
    //
  }

  /**
   *@access public
   *@param {id} - string
   * @return Express Request Response
   */
  @Method()
  async show(resume: Resume) {
    return inertia("Resume", { auth });
    //
  }

  /**
   *
   *@access public
   * @param {id} - string
   * @return Express Request Response
   */
  async update({ req, res, next } = httpContext) {
    //
  }

  /**
   *@access public
   * @param  {id} - string
   * @return Express Response
   */
  async destroy({ req, res, next } = httpContext) {
    //
  }
}
