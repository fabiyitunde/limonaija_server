import * as mongoose from "mongoose";

export const DriverDetailsSchema = new mongoose.Schema({
  id: { type: String },
  userid: { type: String },
  firstname: { type: String },
  lastname: { type: String },
  dateofbirth: { type: Date },
  country: { type: { code: String, description: String } },
  state: { type: { code: String, description: String } },
  driverslicensenumber: String,
  address1: String,
  address2: String,
  gender: String,
  gsmnumber: String,
  gsmvalidated: Boolean,
  gsmvalidationcode: String,
  meansOfId: Number,
  idNumber: String,
  registrationDate: {
    type: Date,
    default: Date.now
  },
  passportpicture: String,
  registrationStatus: Number
});
export const DriverDetailsUploadSchema = new mongoose.Schema({
  id: { type: String },
  driverdetailsid: String,
  driverUploadsType: Number,
  contentType: String,
  uploadDate: {
    type: Date,
    default: Date.now
  },
  upload: Buffer
});

export const DriverFaceVerificationSchema = new mongoose.Schema({
  id: { type: String },
  faceid: String,
  Errors: [{ Message: String, ErrCode: String }],
  RawData: { type: String }
});
