export const userType = {
  Partner: 1,
  Passenger: 2,
  Staff: 3,
  getDescription: (value: number) => {
    switch (value) {
      case 1:
        return { id: value, description: "Partner" };
      case 2:
        return { id: value, description: "Passenger" };
      default:
        return { id: value, description: "Staff" };
    }
  }
};
export const postalChannels = {
  limonaija: "limonaija"
};
export const postalTopics = {
  userCreated: "userCreated",
  pictureUploaded: "pictureUploaded",
  phoneNumberValidationCodeCreated: "phoneNumberValidationCodeCreated"
};
export const meansOfID = {
  InternationPassport: 1,
  DriversLicense: 2,
  NationalIDCard: 3,
  VotersCard: 4,
  getDescription: (value: number) => {
    switch (value) {
      case 1:
        return "InternationPassport";
      case 2:
        return "DriversLicense";
      case 3:
        return "NationalIDCard";
      default:
        return "VotersCard";
    }
  }
};
export const driverRegistrationStatus = {
  Pending: 1,
  Submitted: 2,
  Approved: 3,
  getDescription: (value: number) => {
    switch (value) {
      case 1:
        return "Pending";
      case 2:
        return "Submitted";
      default:
        return "Approved";
    }
  }
};
export const vehicleRegistrationStatus = {
  Pending: 1,
  Submitted: 2,
  Approved: 3,
  getDescription: (value: number) => {
    switch (value) {
      case 1:
        return "Pending";
      case 2:
        return "Submitted";
      default:
        return "Approved";
    }
  }
};
export const driverUploadsType = {
  DriversLicense: 1,
  NationalID: 2,
  Credentials: 3,
  getDescription: (value: number) => {
    switch (value) {
      case 1:
        return { id: value, description: "DriversLicense" };
      case 2:
        return { id: value, description: "NationalID" };
      default:
        return { id: value, description: "Credentials" };
    }
  }
};
export const vehicleUploadsType = {
  VehicleParticulars: 1,
  VehiclePicture: 2,
  getDescription: (value: number) => {
    switch (value) {
      case 1:
        return { id: value, description: "VehicleParticulars" };

      default:
        return { id: value, description: "VehiclePicture" };
    }
  }
};
