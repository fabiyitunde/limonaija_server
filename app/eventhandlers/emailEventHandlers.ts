import * as postal from "postal";
import { postalChannels, postalTopics } from "../parameters";
import PQueue from "p-queue";
import { sendemail, sendEmailConfirmationMail } from "../utilities/sendGrid";
import * as config from "config";
import { userType } from "../parameters";
import * as moment from "moment";
const queue = new PQueue({ concurrency: 1 });
export const initializeEmailHandlers = () => {
  const channel = postal.channel(postalChannels.limonaija);
  channel.subscribe(postalTopics.userCreated, eventobj => {
    queue.add(() =>
      Promise.resolve(sendWelcomeEmailToUser(eventobj)).then(() => {
        console.log("Done: Sending Notifications");
      })
    );
  });
};

const sendWelcomeEmailToUser = (eventobj: any) => {
  var { userid, userinfo } = eventobj;
  const dateceated = moment(userinfo.dateCreated).format("DD/MM/YYYY");
  const emailconfirmlink = `${config.get(
    "clientaddress"
  )}/confirmemail/${userid}`;
  sendEmailConfirmationMail(
    userinfo.email,
    userinfo.name,
    userType.getDescription(userinfo.usertype).description,
    dateceated,
    emailconfirmlink
  );
};
