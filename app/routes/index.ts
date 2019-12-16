import { registerRegistrationRoutes } from "./registrationRoutes";
import { registerAuthRoutes } from "./authRoutes";
import { registerParametersRoutes } from "./parametersRoute";
import { registerVehicleRegistrationRoutes } from "./vehicleRegistrationRoutes";
export const initRoutes = app => {
  registerRegistrationRoutes(app);
  registerAuthRoutes(app);
  registerParametersRoutes(app);
  registerVehicleRegistrationRoutes(app);
};
