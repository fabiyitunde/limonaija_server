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
export async function submitVehicleDetail(vehicledetailid: string) {
  var existingrec: any = await VehicleDetail.findOne({
    id: vehicledetailid
  });
  if (existingrec.registrationStatus != vehicleRegistrationStatus.Pending)
    throw "Record already submitted";
  var uploadlist: any[] = await VehicleDetailUpload.find({
    vehicledetailid: vehicledetailid
  });
  if (uploadlist == null || uploadlist.length == 0)
    throw "please upload required documents";
  await VehicleDetail.findOneAndUpdate(
    { id: vehicledetailid },
    { registrationStatus: vehicleRegistrationStatus.Submitted }
  );
}
