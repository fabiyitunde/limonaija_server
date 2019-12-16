import * as mongoose from "mongoose";
import {
  CountrySchema,
  StateSchema,
  VehicleMakeSchema,
  VehicleModelSchema
} from "../models/parameterTables";

const Country = mongoose.model("Country", CountrySchema);
const State = mongoose.model("State", StateSchema);
const VehicleMake = mongoose.model("VehicleMake", VehicleMakeSchema);
const VehicleModel = mongoose.model("VehicleModel", VehicleModelSchema);

export const getCountryList = async () => {
  return await Country.find().sort("description");
};

export const getStateList = async () => {
  return await State.find().sort("description");
};

export const getVehicleMakeList = async () => {
  return await VehicleMake.find().sort("description");
};
export const getVehicleModelList = async (vehiclemakeid: string) => {
  return await VehicleModel.find({ vehiclemakeid: vehiclemakeid }).sort(
    "description"
  );
};
