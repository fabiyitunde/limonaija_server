import { initializeEmailHandlers } from "../eventhandlers/emailEventHandlers";
import { initializeSMSHandlers } from "../eventhandlers/smsEventHandlers";
import { initializeFaceEnrollmentHandlers } from "../eventhandlers/faceEnrollmentEventHandlers";
export const initHandlers = () => {
  initializeEmailHandlers();
  initializeSMSHandlers();
  initializeFaceEnrollmentHandlers();
};
