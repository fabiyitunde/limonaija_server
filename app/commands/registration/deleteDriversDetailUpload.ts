import * as mongoose from "mongoose";
import {
  DriverDetailsSchema,
  DriverDetailsUploadSchema
} from "../../models/driverdetail";
import { driverRegistrationStatus } from "../../parameters";
const DriverDetails = mongoose.model("DriverDetails", DriverDetailsSchema);
const DriverDetailsUpload = mongoose.model(
  "DriverDetailsUpload",
  DriverDetailsUploadSchema
);
export async function deleteDriversDetailUpload(id: string) {
  var existingrec: any = await DriverDetailsUpload.findOne({ id: id });

  var existingDriverDetailrec: any = await DriverDetails.findOne({
    id: existingrec.driverdetailsid
  });
  if (
    existingDriverDetailrec.registrationStatus !=
    driverRegistrationStatus.Pending
  )
    throw "record Already Submitted";
  await DriverDetailsUpload.findOneAndDelete({ id: id });
}
