import { userSchema } from "../../models/user";
import * as mongoose from "mongoose";
import * as bcrypt from "bcryptjs";
import { raiseUserCreatedEvent } from "../../domainevents/registrationEvents";
const User = mongoose.model("User", userSchema);
export async function createUser(
  userid: string,
  email: string,
  username: string,
  password: string,
  usertype: number
) {
  const salt = await bcrypt.genSalt(10);
  var userinfo = {
    id: userid,
    name: username,
    email: email,
    password: await bcrypt.hash(password, salt),
    usertype: usertype,
    isactive: false,
    dateCreated: new Date()
  };

  let user: any = await User.findOne({ email: email });
  if (user) throw "User already registered.";
  user = new User(userinfo);
  await user.save();
  await raiseUserCreatedEvent(user.id, user);
  //   const token = user.generateAuthToken();
}
