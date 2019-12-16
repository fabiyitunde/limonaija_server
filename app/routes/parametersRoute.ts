import { ParametersController } from "../contollers/parametersController";

export const registerParametersRoutes = app => {
  var parametersController: ParametersController = new ParametersController();
  app
    .route("/api/parameters/getCountryList")
    .get(parametersController.getCountryList);
  app
    .route("/api/parameters/getStateList")
    .get(parametersController.getStateList);
  app
    .route("/api/parameters/getVehicleMakeList")
    .get(parametersController.getVehicleMakeList);
  app
    .route("/api/parameters/getVehicleModelList/:vehiclemakeid")
    .get(parametersController.getVehicleModelList);
  app
    .route("/api/parameters/createVehicleMake")
    .post(parametersController.createVehicleMake);
  app
    .route("/api/parameters/createVehicleModel")
    .post(parametersController.createVehicleModel);
};
