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
export async function submitDriverDetails(driverdetailsid: string) {
  var existingrec: any = await DriverDetails.findOne({ id: driverdetailsid });
  if (existingrec.registrationStatus != driverRegistrationStatus.Pending)
    throw "record Already Submitted";
  var driverDetailsUploadList: any[] = await DriverDetailsUpload.find({
    driverdetailsid: driverdetailsid
  });
  if (driverDetailsUploadList == null || driverDetailsUploadList.length == 0)
    throw "No Upload Found";
  if (existingrec.gsmvalidated == false) throw "Phone Number Not Validated";
  if (
    existingrec.passportpicture == null ||
    existingrec.passportpicture == undefined ||
    existingrec.passportpicture == ""
  )
    throw "Picture Upload Is Compulsary";

  await DriverDetails.findOneAndUpdate(
    { id: driverdetailsid },
    { registrationStatus: driverRegistrationStatus.Submitted }
  );
}
