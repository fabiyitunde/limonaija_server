import * as postal from "postal";
import { postalChannels, postalTopics } from "../parameters";
import PQueue from "p-queue";
import { sendSMS } from "../utilities/sendSMS";
import * as moment from "moment";
const queue = new PQueue({ concurrency: 1 });
export const initializeSMSHandlers = () => {
  const channel = postal.channel(postalChannels.limonaija);
  channel.subscribe(postalTopics.phoneNumberValidationCodeCreated, eventobj => {
    queue.add(() =>
      Promise.resolve(sendPhoneNumberValidationCode(eventobj)).then(() => {
        console.log("Done: Sending SMS");
      })
    );
  });
};

const sendPhoneNumberValidationCode = (eventobj: any) => {
  var { code, driverdetails } = eventobj;

  const nowtime = moment(new Date()).format(
    moment.HTML5_FMT.DATETIME_LOCAL_SECONDS
  );
  const message: string = `Your Limo Naija Phone Number Validation Code : ${code} (Sent ${nowtime})`;
  (async () => await sendSMS(driverdetails.gsmnumber, message))();
};
