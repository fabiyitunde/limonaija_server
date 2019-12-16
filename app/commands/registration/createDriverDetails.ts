import { DriverDetailsSchema } from "../../models/driverdetail";

import * as mongoose from "mongoose";
import { driverRegistrationStatus } from "../../parameters";
const DriverDetails = mongoose.model("DriverDetails", DriverDetailsSchema);
import { getCountryList, getStateList } from "../../queries/parameterQueries";

export async function createDriverDetails(
  driverdetailid: string,
  userid: string,
  firstname: string,
  lastname: string,
  dateofbirth: Date,
  countrycode: string,
  statecode: string,
  driverslicensenumber: string,
  address1: string,
  address2: string,
  gender: string,
  gsmnumber: string,
  meansOfId: string,
  idNumber: string
) {
  const existingdriverdetail: any = await DriverDetails.findOne({
    userid: userid
  });
  if (existingdriverdetail) throw "User details already created.";
  const existingrecWithSameDriverLicense: any = await DriverDetails.findOne({
    driverslicensenumber: driverslicensenumber
  });
  if (existingrecWithSameDriverLicense)
    throw "License Details Already Mapped To Another User.";
  const existingrecWithSameMeansOfID: any = await DriverDetails.findOne({
    idNumber: idNumber,
    meansOfId: meansOfId
  });
  if (existingrecWithSameMeansOfID)
    throw "Means Of ID Already Mapped To Another User.";
  console.log("Countrycode", countrycode);
  const countrylist: any[] = await getCountryList();
  const statelist: any[] = await getStateList();
  const existingcountry: any = countrylist.find(a => a.code == countrycode);
  const existingstate: any = statelist.find(a => a.code == statecode);
  var newrec: any = {
    id: driverdetailid,
    userid: userid,
    firstname: firstname,
    lastname: lastname,
    dateofbirth: dateofbirth,
    country: {
      code: existingcountry.code,
      description: existingcountry.description
    },
    state: { code: existingstate.code, description: existingstate.description },
    driverslicensenumber: driverslicensenumber,
    address1: address1,
    address2: address2,
    gender: gender,
    gsmnumber: gsmnumber,
    gsmvalidated: false,
    meansOfId: meansOfId,
    idNumber: idNumber,
    registrationStatus: driverRegistrationStatus.Pending
  };
  var driverDetail = new DriverDetails(newrec);
  await driverDetail.save();
}
