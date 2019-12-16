import * as mongoose from "mongoose";

export const VehicleDetailSchema = new mongoose.Schema({
  id: { type: String },
  userid: { type: String },
  vehiclemake: { type: { id: String, description: String } },
  vehiclemodel: { type: { id: String, description: String } },
  chasisNumber: String,
  licensenumber: String,
  description: String,
  yearOfPurchase: Number,
  insurancedetails: String,
  insuranceexpirydate: Date,
  kilometerstravelled: Number,
  registrationStatus: Number,
  registrationDate: {
    type: Date,
    default: Date.now
  }
});

export const VehicleDetailUploadSchema = new mongoose.Schema({
  id: { type: String },
  vehicledetailid: String,
  vehicleUploadsType: Number,
  contentType: String,
  uploadDate: {
    type: Date,
    default: Date.now
  },
  upload: Buffer
});
