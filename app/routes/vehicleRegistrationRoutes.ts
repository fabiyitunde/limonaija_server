import { VehicleRegistrationController } from "../contollers/vehicleRegistrationController";
import Auth from "../middleware/auth";
import * as multer from "multer";
var upload = multer({ dest: "uploads/" });

export const registerVehicleRegistrationRoutes = app => {
  var vehicleregistrationController: VehicleRegistrationController = new VehicleRegistrationController();
  app
    .route("/api/vehicleregistration/createVehicleDetails")
    .post([Auth, vehicleregistrationController.createVehicleDetails]);
  app
    .route("/api/vehicleregistration/deleteVehicleDetails")
    .post([Auth, vehicleregistrationController.deleteVehicleDetails]);
  app
    .route("/api/vehicleregistration/createVehicleDetailUpload")
    .post([Auth, vehicleregistrationController.createVehicleDetailUpload]);
  app
    .route("/api/vehicleregistration/deleteVehicleDetailUpload")
    .post([Auth, vehicleregistrationController.deleteVehicleDetailUpload]);
  app
    .route("/api/vehicleregistration/submitVehicleDetail")
    .post([Auth, vehicleregistrationController.submitVehicleDetail]);
  app
    .route("/api/vehicleregistration/getVehicleDetailById/:vehicledetailid")
    .get(vehicleregistrationController.getVehicleDetailById);
  app
    .route("/api/vehicleregistration/getVehicleDetailListByUserId/:userid")
    .get(vehicleregistrationController.getVehicleDetailListByUserId);
  app
    .route(
      "/api/vehicleregistration/getVehicleDetailUploadData/:vehicledetailid"
    )
    .get(vehicleregistrationController.getVehicleDetailUploadData);
};
