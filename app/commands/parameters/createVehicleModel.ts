import * as mongoose from "mongoose";
import { VehicleModelSchema } from "../../models/parameterTables";
const VehicleModel = mongoose.model("VehicleModel", VehicleModelSchema);
export async function createVehicleModel(
  id: string,
  vehiclemakeid: string,
  code: string,
  description: string
) {
  const existingrec = await VehicleModel.findOne({
    vehiclemakeid: vehiclemakeid,
    code: code
  });
  if (existingrec) throw "Code must be unique in this context";
  var newrec = new VehicleModel({
    id: id,
    code: code,
    vehiclemakeid: vehiclemakeid,
    description: description
  });
  await newrec.save();
}
