import * as mongoose from "mongoose";
import {
  VehicleDetailSchema,
  VehicleDetailUploadSchema
} from "../../models/vehicledetail";
import { vehicleRegistrationStatus } from "../../parameters";

const VehicleDetail = mongoose.model("VehicleDetail", VehicleDetailSchema);
const VehicleDetailUpload = mongoose.model(
  "VehicleDetailUpload",
  VehicleDetailUploadSchema
);
export async function createVehicleDetailUpload(
  vehicledetailid: string,
  newuploadid: string,
  contentType: string,
  docstring: string,
  vehicleUploadsType: number
) {
  var existingVehicleDetailRec: any = await VehicleDetail.findOne({
    id: vehicledetailid
  });
  if (
    existingVehicleDetailRec.registrationStatus !==
    vehicleRegistrationStatus.Pending
  )
    throw "Record already submitted";
  var newrec = new VehicleDetailUpload({
    id: newuploadid,
    vehicledetailid: vehicledetailid,
    contentType: contentType,
    vehicleUploadsType: vehicleUploadsType,
    upload: new Buffer(docstring, "base64")
  });
  await newrec.save();
}
