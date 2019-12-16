import fetch from "node-fetch";

export const sendSMS = async (phonenos: string, message: string) => {
  const url = `http://www.estoresms.com/smsapi.php?username=fabson&password=fabson@123&sender=LIMONaija&recipient=${phonenos}&message=${message}&dnd=true`;
  await fetch(url);
};
