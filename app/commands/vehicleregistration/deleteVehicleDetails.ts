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
export async function deleteVehicleDetails(vehicledetailid: string) {
  var existingrec: any = await VehicleDetail.findOne({
    id: vehicledetailid
  });
  if (existingrec.registrationStatus != vehicleRegistrationStatus.Pending)
    throw "Record already submitted";
  await VehicleDetailUpload.deleteMany({ vehicledetailid: vehicledetailid });
  await VehicleDetail.deleteOne({ id: vehicledetailid });
}
