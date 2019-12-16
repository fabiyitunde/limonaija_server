import {
  DriverDetailsSchema,
  DriverDetailsUploadSchema
} from "../models/driverdetail";

import * as mongoose from "mongoose";
import {
  driverUploadsType,
  meansOfID,
  driverRegistrationStatus
} from "../parameters";

const DriverDetails = mongoose.model("DriverDetails", DriverDetailsSchema);
const DriverDetailsUpload = mongoose.model(
  "DriverDetailsUpload",
  DriverDetailsUploadSchema
);

export const getDriverDetailsById = async (driverDetailsId: string) => {
  var driverDetailsinfo: any = await DriverDetails.findOne({
    id: driverDetailsId
  });
  return driverDetailsinfo;
};
export const getDriverDetailsByUserId = async (userid: string) => {
  var driverDetailsinfo: any = await DriverDetails.findOne({ userid: userid });
  return driverDetailsinfo;
};
export const getDriverDetailsUploads = async (driverdetailsid: string) => {
  var returnlist: any[] = [];
  var driverDetailsUploadList: any[] = await DriverDetailsUpload.find({
    driverdetailsid: driverdetailsid
  });

  for (let index = 0; index < driverDetailsUploadList.length; index++) {
    const element: any = driverDetailsUploadList[index];
    var uploaditem: any = {};
    uploaditem.id = element.id;
    uploaditem.driverdetailsid = element.driverdetailsid;
    uploaditem.driverUploadsType = driverUploadsType.getDescription(
      element.driverUploadsType
    );
    uploaditem.driverUploadsTypeId = element.driverUploadsType;
    uploaditem.contentType = element.contentType;
    uploaditem.uploadDate = element.uploadDate;
    uploaditem.documentdata = element.upload;
    returnlist.push(uploaditem);
  }
  return returnlist;
};
export const getDriverDetailsUploadData = async (id: string) => {
  var uploaddata: any = await DriverDetailsUpload.findOne({
    id: id
  });
  var uploaditem: any = {};
  uploaditem.contentType = uploaddata.contentType;
  uploaditem.content = uploaddata.upload.buffer;
  return uploaditem;
};
export const getDriverDetailsUploadById = async (id: string) => {
  var uploaddata: any = await DriverDetailsUpload.findOne({
    id: id
  });

  return uploaddata;
};
export const addextraData = (driverdetailsinfo: any) => {
  const status = driverRegistrationStatus.getDescription(
    driverdetailsinfo.registrationStatus
  );
  const meansOfIddescription = meansOfID.getDescription(
    driverdetailsinfo.meansOfId
  );
  const newobj: any = { ...driverdetailsinfo._doc };
  newobj.status = status;
  newobj.meansOfIddescription = meansOfIddescription;
  newobj.passportpicture =
    newobj.passportpicture == null
      ? ""
      : "data:image/jpeg;base64," + newobj.passportpicture;
  return newobj;
};
