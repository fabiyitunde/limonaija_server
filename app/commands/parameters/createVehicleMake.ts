import * as mongoose from "mongoose";
import { VehicleMakeSchema } from "../../models/parameterTables";
const VehicleMake = mongoose.model("VehicleMake", VehicleMakeSchema);
export async function createVehicleMake(
  id: string,
  code: string,
  description: string
) {
  const existingrec = await VehicleMake.findOne({ code: code });
  if (existingrec) throw "Code must be unique in this context";
  var newrec = new VehicleMake({
    id: id,
    code: code,
    description: description
  });
  await newrec.save();
}
