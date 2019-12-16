import { userSchema } from "../../models/user";
import * as mongoose from "mongoose";

const User = mongoose.model("User", userSchema);
export async function confirmEmail(userid: string) {
  let user: any = await User.findOne({ id: userid });
  if (!user) throw "User Record Not Found registered.";
  await User.findOneAndUpdate({ id: userid }, { isactive: true });

  //   const token = user.generateAuthToken();
}
