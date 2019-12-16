import * as mongoose from "mongoose";
import { DriverDetailsSchema } from "../../models/driverdetail";
var cc = require("coupon-code");
const DriverDetails = mongoose.model("DriverDetails", DriverDetailsSchema);
import { raisePhoneNumberValidationCodeCreatedEvent } from "../../domainevents/registrationEvents";
export async function createAndSendPhoneValidationcode(
  driverdetailsid: string
) {
  const existingrec: any = await DriverDetails.findOne({
    id: driverdetailsid
  });
  if (existingrec.gsmvalidated) throw "Number Already Validated";
  const code = cc.generate();
  await DriverDetails.findOneAndUpdate(
    { id: driverdetailsid },
    { gsmvalidationcode: code }
  );
  const existingdriverdetail: any = await DriverDetails.findOne({
    id: driverdetailsid
  });
  raisePhoneNumberValidationCodeCreatedEvent(code, existingdriverdetail);
}
