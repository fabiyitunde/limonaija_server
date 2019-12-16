import * as mongoose from "mongoose";
import { DriverDetailsSchema } from "../../models/driverdetail";
const DriverDetails = mongoose.model("DriverDetails", DriverDetailsSchema);
export async function validatePhoneCode(driverdetailsid: string, code: string) {
  var existingrec: any = await DriverDetails.findOne({ id: driverdetailsid });
  if (existingrec.gsmvalidated) throw "Number Already Validated";
  if (existingrec.gsmvalidationcode != code) throw "Invalid Code";
  await DriverDetails.findOneAndUpdate(
    { id: driverdetailsid },
    { gsmvalidated: true }
  );
}
