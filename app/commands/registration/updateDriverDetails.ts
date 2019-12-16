import * as mongoose from "mongoose";
import { DriverDetailsSchema } from "../../models/driverdetail";
import { CountrySchema, StateSchema } from "../../models/parameterTables";
import { driverRegistrationStatus } from "../../parameters";
const DriverDetails = mongoose.model("DriverDetails", DriverDetailsSchema);
import { getCountryList, getStateList } from "../../queries/parameterQueries";

export async function updateDriverDetails(
  id: string,
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
    id: id
  });
  if (
    existingdriverdetail.registrationStatus != driverRegistrationStatus.Pending
  )
    throw "record Already Submitted";
  const existingrecWithSameDriverLicense: any = await DriverDetails.findOne({
    driverslicensenumber: driverslicensenumber
  });
  if (
    existingrecWithSameDriverLicense &&
    existingrecWithSameDriverLicense.id != id
  )
    throw "License Details Already Mapped To Another User.";
  const existingrecWithSameMeansOfID: any = await DriverDetails.findOne({
    idNumber: idNumber,
    meansOfId: meansOfId
  });
  if (existingrecWithSameMeansOfID && existingrecWithSameMeansOfID.id != id)
    throw "Means Of ID Already Mapped To Another User.";
  const countrylist: any[] = await getCountryList();
  const statelist: any[] = await getStateList();
  const existingcountry: any = countrylist.find(a => a.code == countrycode);
  const existingstate: any = statelist.find(a => a.code == statecode);
  var updaterec: any = {
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
    gsmvalidated:
      gsmnumber != existingdriverdetail.gsmnumber
        ? false
        : existingdriverdetail.gsmvalidated,
    meansOfId: meansOfId,
    idNumber: idNumber
  };
  await DriverDetails.findOneAndUpdate({ id: id }, updaterec);
}
