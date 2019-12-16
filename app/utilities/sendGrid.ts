import * as sendgrid from "sendgrid";
import * as config from "config";
export const sendEmailConfirmationMail = (
  toemail: string,
  toname: string,
  usertype: string,
  datecreated: string,
  confirmemaillink: string
) => {
  var sg = sendgrid(config.get("sendgridAPIkey"));

  var request = sg.emptyRequest();
  request.body = {
    from: {
      email: config.get("fromemail"),
      name: "LIMO Naijia"
    },
    personalizations: [
      {
        to: [
          {
            email: toemail,
            name: toname
          }
        ],
        substitutions: {
          "-name-": toname,
          "-email-": toemail,
          "-usertype-": usertype,
          "-datecreated-": datecreated,
          "-confirmemaillink-": confirmemaillink
        }
      }
    ],
    subject: "Welcome To LIMO Naijia Partner Email Verification",
    template_id: "1805ab81-ddb1-48d5-a4fd-0b27fe953d9f"
  };
  request.method = "POST";
  request.path = "/v3/mail/send";

  sg.API(request, function(error, response) {
    console.log(response.statusCode);
    console.log(response.body);
    console.log(response.headers);
  });
};
export const sendemail = (email: string, subject: string, body: string) => {
  var helper = sendgrid.mail;
  var fromEmail = new helper.Email(config.get("fromemail"));
  var toEmail = new helper.Email(email);
  var subject = subject;
  var content = new helper.Content("text/plain", body);
  var mail = new helper.Mail(fromEmail, subject, toEmail, content);
  var sub = new helper.Substitution("", "");

  var sg = sendgrid(config.get("sendgridAPIkey"));

  var request = sg.emptyRequest({
    method: "POST",
    path: "/v3/mail/send",
    body: mail.toJSON()
  });

  sg.API(request, function(error, response) {
    if (error) {
      console.log("Error response received");
    }
    console.log(response.statusCode);
    console.log(response.body);
    console.log(response.headers);
  });
};
