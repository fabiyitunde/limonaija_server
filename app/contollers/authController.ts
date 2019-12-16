import { Request, Response } from "express";
import { createUser } from "../commands/auth/createUser";
import { confirmEmail } from "../commands/auth/confirmEmail";
import {
  getUserByEmail,
  getUserByUserId,
  getUserInfoWithoutPasswordById
} from "../queries/userQueries";
import * as bcrypt from "bcrypt";
import * as Joi from "joi";
import * as jwt from "jsonwebtoken";
import * as config from "config";
import { getNewGUID } from "../utilities/newGuid";
import { userType } from "../parameters";

export class AuthController {
  public async authenticateUser(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const { error } = validate(req.body);
      if (error) return res.status(400).send(error.details[0].message);
      var user: any = await getUserByEmail(email);
      if (!user) return res.status(400).send("Invalid email or password1.");
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword)
        return res.status(400).send("Invalid email or password2.");
      if (!user.isactive) throw "Email Account Not Verified Yet";
      const token = user.generateAuthToken();
      res.send({
        access_token: token,
        user: await getUserInfoWithoutPasswordById(user.id)
      });
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  }
  public async signInWithToken(req: Request, res: Response) {
    try {
      const { access_token } = req.body;
      const decodeduserinfor: any = jwt.verify(
        access_token,
        config.get("jwtPrivateKey")
      );
      var user: any = await getUserByUserId(decodeduserinfor.id);

      const token = user.generateAuthToken();
      res.send({
        access_token: token,
        user: await getUserInfoWithoutPasswordById(user.id)
      });
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }
  public async createUser(req: Request, res: Response) {
    try {
      const { email, displayName, password: pwd } = req.body;
      const userid = getNewGUID();
      await createUser(userid, email, displayName, pwd, userType.Partner);
      var user: any = await getUserByUserId(userid);
      const token = user.generateAuthToken();
      const { password, ...userinfo } = user;
      res
        .header("x-auth-token", token)
        .status(200)
        .json({ success: true, access_token: token, user: userinfo });
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }
  public async confirmEmail(req: Request, res: Response) {
    try {
      const { userid } = req.body;
      await confirmEmail(userid);
      var user: any = await getUserByUserId(userid);
      const { password, ...userinfo } = user;
      res.status(200).json(userinfo);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }
}
function validate(req) {
  const schema = {
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .max(255)
      .required()
  };

  return Joi.validate(req, schema);
}
