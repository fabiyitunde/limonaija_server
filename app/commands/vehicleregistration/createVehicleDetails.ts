import * as mongoose from "mongoose";
import { VehicleDetailSchema } from "../../models/vehicledetail";
import {
  VehicleMakeSchema,
  VehicleModelSchema
} from "../../models/parameterTables";
import { vehicleRegistrationStatus } from "../../parameters";
const VehicleDetail = mongoose.model("VehicleDetail", VehicleDetailSchema);
const VehicleMake = mongoose.model("VehicleMake", VehicleMakeSchema);
const VehicleModel = mongoose.model("VehicleModel", VehicleModelSchema);

export async function createVehicleDetails(
  vehicledetailid: string,
  userid: string,
  vehiclemakeid: string,
  vehiclemodelid: string,
  chasisNumber: string,
  licensenumber: string,
  description: string,
  yearOfPurchase: number,
  insurancedetails: string,
  insuranceexpirydate: Date,
  kilometerstravelled: number
) {
  var existingrec_chasisNumber: any = await VehicleDetail.findOne({
    chasisNumber: chasisNumber
  });
  if (existingrec_chasisNumber != null)
    throw "the chasis number is already captured in the system";
  var existingrec_licensenumber: any = await VehicleDetail.findOne({
    licensenumber: licensenumber
  });
  if (existingrec_licensenumber != null)
    throw "the license number is already captured in the system";
  var vehiclemakerec: any = await VehicleMake.findOne({ id: vehiclemakeid });
  var vehiclemodelrec: any = await VehicleModel.findOne({ id: vehiclemodelid });
  var newrec: any = {
    id: vehicledetailid,
    userid: userid,
    vehiclemake: {
      id: vehiclemakerec.id,
      description: vehiclemakerec.description
    },
    vehiclemodel: {
      id: vehiclemodelrec.id,
      description: vehiclemodelrec.description
    },
    chasisNumber: chasisNumber,
    licensenumber: licensenumber,
    description: description,
    yearOfPurchase: yearOfPurchase,
    insurancedetails: insurancedetails,
    insuranceexpirydate: insuranceexpirydate,
    kilometerstravelled: kilometerstravelled,
    registrationStatus: vehicleRegistrationStatus.Pending
  };

  var vehicleDetail = new VehicleDetail(newrec);
  await vehicleDetail.save();
}
