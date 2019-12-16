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
export async function deleteVehicleDetailUpload(vehicledetailuploadid: string) {
  var existingRec: any = await VehicleDetailUpload.findOne({
    id: vehicledetailuploadid
  });
  var existingVehicleDetailRec: any = await VehicleDetail.findOne({
    id: existingRec.vehicledetailid
  });

  if (
    existingVehicleDetailRec.registrationStatus !=
    vehicleRegistrationStatus.Pending
  )
    throw "Record already submitted";

  await VehicleDetailUpload.deleteOne({ id: vehicledetailuploadid });
}
