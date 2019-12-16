import * as postal from "postal";
import { postalChannels, postalTopics } from "../parameters";
import PQueue from "p-queue";
import { enrolldriver } from "../utilities/kairosAPI";
import { DriverFaceVerificationSchema } from "../models/driverdetail";
import * as mongoose from "mongoose";
const DriverFaceVerification = mongoose.model(
  "DriverFaceVerification",
  DriverFaceVerificationSchema
);
const queue = new PQueue({ concurrency: 1 });
export const initializeFaceEnrollmentHandlers = () => {
  const channel = postal.channel(postalChannels.limonaija);
  channel.subscribe(postalTopics.pictureUploaded, eventobj => {
    queue.add(() =>
      Promise.resolve(enrolldriverpicture(eventobj)).then(() => {
        console.log("Done: Sending Notifications");
      })
    );
  });
};

const enrolldriverpicture = async (eventobj: any) => {
  var { driverdetailid, driverpicturestring } = eventobj;
  const resp: any = await enrolldriver(driverdetailid, driverpicturestring);
  const faceid = resp.face_id ? resp.face_id : "";
  const errors: any[] = resp.Errors ? resp.Errors : [];
  const obj = {
    id: driverdetailid,
    faceid: faceid,
    Errors: errors,
    RawData: JSON.stringify(resp)
  };
  await DriverFaceVerification.findOneAndUpdate({ id: driverdetailid }, obj, {
    upsert: true
  });
};
