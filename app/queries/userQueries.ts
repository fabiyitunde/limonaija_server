import { userSchema } from "../models/user";
import * as mongoose from "mongoose";
import {
  getDriverDetailsByUserId,
  addextraData
} from "../queries/driverDetailsQueries";

const User = mongoose.model("User", userSchema);
export const getUserByUserId = async userid => {
  var userinfo = await User.findOne({ id: userid });
  return userinfo;
};
export const getUserByEmail = async (email: string) => {
  var userinfo: any = await User.findOne({ email: email });
  return userinfo;
};
export const getUserInfoWithoutPasswordById = async userid => {
  var user: any = await User.findOne({ id: userid });
  var driverdetails: any = await getDriverDetailsByUserId(userid);
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    usertype: user.usertype,
    dateCreated: user.dateCreated,
    isactive: user.isactive,
    photoURL:
      driverdetails == null ? "" : addextraData(driverdetails).passportpicture
  };
};
