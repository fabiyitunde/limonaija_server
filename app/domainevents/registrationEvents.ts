import * as postal from "postal";
import { postalChannels, postalTopics } from "../parameters";

export const raiseUserCreatedEvent = async (userid: string, userinfo: any) => {
  var eventobj: any = {};
  eventobj.userid = userid;
  eventobj.userinfo = userinfo;
  const channel = postal.channel(postalChannels.limonaija);
  channel.publish(postalTopics.userCreated, eventobj);
};

export const raisePhoneNumberValidationCodeCreatedEvent = async (
  code: string,
  driverdetails: any
) => {
  var eventobj: any = {};
  eventobj.code = code;
  eventobj.driverdetails = driverdetails;
  const channel = postal.channel(postalChannels.limonaija);
  channel.publish(postalTopics.phoneNumberValidationCodeCreated, eventobj);
};

export const raiseDriverPictureUploadedSuccessfully = async (
  driverdetailid: string,
  driverpicturestring: string
) => {
  var eventobj: any = {};
  eventobj.driverdetailid = driverdetailid;
  eventobj.driverpicturestring = driverpicturestring;
  const channel = postal.channel(postalChannels.limonaija);
  channel.publish(postalTopics.pictureUploaded, eventobj);
};
