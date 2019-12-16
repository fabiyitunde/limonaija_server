import * as mongoose from "mongoose";
import {
  VehicleDetailSchema,
  VehicleDetailUploadSchema
} from "../models/vehicledetail";
import { vehicleUploadsType, vehicleRegistrationStatus } from "../parameters";
const VehicleDetail = mongoose.model("VehicleDetail", VehicleDetailSchema);
const VehicleDetailUpload = mongoose.model(
  "VehicleDetailUpload",
  VehicleDetailUploadSchema
);
export const getVehicleDetailById = async (vehicledetailid: string) => {
  return addextraData(await VehicleDetail.findOne({ id: vehicledetailid }));
};
export const getVehicleDetailListByUserId = async (userid: string) => {
  var vehiclelist = await VehicleDetail.find({ userid: userid });
  if (vehiclelist == null) return [];
  return vehiclelist.map(a => addextraData(a));
};
export const getVehicleDetailUploadList = async (vehicledetailid: string) => {
  var returnlist: any[] = [];
  var vehicleDetailUploadList: any[] = await VehicleDetailUpload.find({
    vehicledetailid: vehicledetailid
  });

  for (let index = 0; index < vehicleDetailUploadList.length; index++) {
    const element: any = vehicleDetailUploadList[index];
    var uploaditem: any = {};
    uploaditem.id = element.id;
    uploaditem.vehicledetailid = element.vehicledetailid;
    uploaditem.vehicleUploadsType = vehicleUploadsType.getDescription(
      element.vehicleUploadsType
    );

    uploaditem.contentType = element.contentType;
    uploaditem.uploadDate = element.uploadDate;
    uploaditem.documentdata = element.upload;
    returnlist.push(uploaditem);
  }
  return returnlist;
};
export const getVehicleDetailUploadById = async (
  vehicledetailuploadid: string
) => {
  return await VehicleDetailUpload.find({ id: vehicledetailuploadid });
};
export const getVehicleDetailUploadData = async (id: string) => {
  var uploaddata: any = await VehicleDetailUpload.findOne({
    id: id
  });
  var uploaditem: any = {};
  uploaditem.contentType = uploaddata.contentType;
  uploaditem.content = uploaddata.upload.buffer;
  return uploaditem;
};
const addextraData = (vehicledetailsinfo: any) => {
  const status = vehicleRegistrationStatus.getDescription(
    vehicledetailsinfo.registrationStatus
  );

  const newobj: any = { ...vehicledetailsinfo._doc };
  newobj.status = status;

  return newobj;
};
