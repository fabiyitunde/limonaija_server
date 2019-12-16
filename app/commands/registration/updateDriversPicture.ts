import * as mongoose from "mongoose";
import { DriverDetailsSchema } from "../../models/driverdetail";
import { driverRegistrationStatus } from "../../parameters";
import { raiseDriverPictureUploadedSuccessfully } from "../../domainevents/registrationEvents";
const DriverDetails = mongoose.model("DriverDetails", DriverDetailsSchema);
export async function updateDriversPicture(
  driverdetailsid: string,
  picstring: string
) {
  var existingrec: any = await DriverDetails.findOne({ id: driverdetailsid });
  if (existingrec.registrationStatus != driverRegistrationStatus.Pending)
    throw "record Already Submitted";
  await DriverDetails.findOneAndUpdate(
    { id: driverdetailsid },
    { passportpicture: picstring }
  );
  raiseDriverPictureUploadedSuccessfully(driverdetailsid, picstring);
}
