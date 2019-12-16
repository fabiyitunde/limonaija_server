import * as mongoose from "mongoose";

export const CountrySchema = new mongoose.Schema({
  code: String,
  description: String
});

export const StateSchema = new mongoose.Schema({
  code: String,
  description: String
});
export const VehicleMakeSchema = new mongoose.Schema({
  id: String,
  code: String,
  description: String
});
export const VehicleModelSchema = new mongoose.Schema({
  id: String,
  vehiclemakeid: String,
  code: String,
  description: String
});
