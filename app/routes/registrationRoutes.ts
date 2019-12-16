import { RegistrationController } from "../contollers/registrationController";
import Auth from "../middleware/auth";
import * as multer from "multer";
var upload = multer({ dest: "uploads/" });
export const registerRegistrationRoutes = app => {
  var registrationController: RegistrationController = new RegistrationController();
  app
    .route("/api/registration/createDriverDetails")
    .post([Auth, registrationController.createDriverDetails]);
  app
    .route("/api/registration/updateDriverDetails")
    .post([Auth, registrationController.updateDriverDetails]);
  app
    .route("/api/registration/getDriverDetailsById/:id")
    .get(registrationController.getDriverDetailsById);
  app
    .route("/api/registration/getDriverDetailsByUserId/:userid")
    .get(registrationController.getDriverDetailsByUserId);
  app.post(
    "/api/registration/updateDriversPicture",
    registrationController.updateDriversPicture
  );
  app.post(
    "/api/registration/saveUploadedDocuments",
    registrationController.saveUploadedDocuments
  );
  app
    .route("/api/registration/getDriverDetailsUploadData/:id")
    .get(registrationController.getDriverDetailsUploadData);
  app
    .route("/api/registration/getDriverDetailsUploads/:driverdetailid")
    .get(registrationController.getDriverDetailsUploads);
  app
    .route("/api/registration/deleteDriversDetailUpload")
    .post([Auth, registrationController.deleteDriversDetailUpload]);
  app
    .route("/api/registration/submitDriverDetails")
    .post(registrationController.submitDriverDetails);
  app
    .route("/api/registration/getDriversRegistrationParameters/:userid")
    .get(registrationController.getDriversRegistrationParameters);
  app
    .route("/api/registration/validatePhoneCode")
    .post([Auth, registrationController.validatePhoneCode]);
  app
    .route("/api/registration/createAndSendPhoneValidationcode")
    .post([Auth, registrationController.createAndSendPhoneValidationcode]);
};
