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
export async function saveUploadedDocuments(
  driverdetailsid: string,
  documentid: string,
  contentType: string,
  docstring: string,
  driverUploadsType: number
) {
  var existingrec: any = await DriverDetails.findOne({ id: driverdetailsid });
  if (existingrec.registrationStatus != driverRegistrationStatus.Pending)
    throw "record Already Submitted";
  var newrec = new DriverDetailsUpload({
    id: documentid,
    driverdetailsid: driverdetailsid,
    contentType: contentType,
    driverUploadsType: driverUploadsType,
    upload: new Buffer(docstring, "base64")
  });
  await newrec.save();
}
