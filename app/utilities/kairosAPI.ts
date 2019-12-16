import fetch from "node-fetch";

const appkey: string = "c10c6f86";
const apikey: string = "4f88e19845085ad650ba061b00028f52";
const baseurl: string = "http://api.kairos.com";

export const enrolldriver = async (
  driverdetailid: string,
  driverpicture: string
) => {
  //fetch()
  const body = {
    image: driverpicture,
    subject_id: driverdetailid,
    gallery_name: "securitydb"
  };
  var response = await fetch(`${baseurl}/enroll`, {
    method: "post",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      app_id: appkey,
      app_key: apikey
    }
  });

  return response.json();
};
