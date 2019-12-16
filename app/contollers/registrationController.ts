import { Request, Response } from "express";
import { createDriverDetails } from "../commands/registration/createDriverDetails";
import { updateDriverDetails } from "../commands/registration/updateDriverDetails";
import { updateDriversPicture } from "../commands/registration/updateDriversPicture";
import { saveUploadedDocuments } from "../commands/registration/saveUploadedDocuments";
import { deleteDriversDetailUpload } from "../commands/registration/deleteDriversDetailUpload";
import { submitDriverDetails } from "../commands/registration/submitDriverDetails";

import { validatePhoneCode } from "../commands/registration/validatePhoneCode";
import { createAndSendPhoneValidationcode } from "../commands/registration/createAndSendPhoneValidationcode";
import { getCountryList, getStateList } from "../queries/parameterQueries";
import {
  getDriverDetailsByUserId,
  getDriverDetailsUploads,
  getDriverDetailsUploadData,
  getDriverDetailsUploadById,
  addextraData
} from "../queries/driverDetailsQueries";
import { getDriverDetailsById } from "../queries/driverDetailsQueries";
import { getNewGUID } from "../utilities/newGuid";
import * as fs from "fs";
import * as multiparty from "multiparty";

export class RegistrationController {
  public async createDriverDetails(req: Request, res: Response) {
    try {
      const {
        userid,
        firstname,
        lastname,
        dateofbirth,
        countrycode,
        statecode,
        driverslicensenumber,
        address1,
        address2,
        gender,
        gsmnumber,
        meansOfId,
        idNumber
      } = req.body;
      const newid = getNewGUID();
      await createDriverDetails(
        newid,
        userid,
        firstname,
        lastname,
        dateofbirth,
        countrycode,
        statecode,
        driverslicensenumber,
        address1,
        address2,
        gender,
        gsmnumber,
        meansOfId,
        idNumber
      );
      var driverdetails: any = addextraData(await getDriverDetailsById(newid));
      res.status(200).json(driverdetails);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }
  public async updateDriverDetails(req: Request, res: Response) {
    try {
      const {
        id,
        firstname,
        lastname,
        dateofbirth,
        countrycode,
        statecode,
        driverslicensenumber,
        address1,
        address2,
        gender,
        gsmnumber,
        meansOfId,
        idNumber
      } = req.body;
      await updateDriverDetails(
        id,
        firstname,
        lastname,
        dateofbirth,
        countrycode,
        statecode,
        driverslicensenumber,
        address1,
        address2,
        gender,
        gsmnumber,
        meansOfId,
        idNumber
      );
      var driverdetails: any = addextraData(await getDriverDetailsById(id));
      res.status(200).json(driverdetails);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }
  public async getDriverDetailsById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      var returnobj = addextraData(await getDriverDetailsById(id));
      res.status(200).json(returnobj);
    } catch (error) {
      res.status(400).send(error);
    }
  }
  public async getDriverDetailsByUserId(req: Request, res: Response) {
    try {
      const { userid } = req.params;
      var returnobj = addextraData(await getDriverDetailsByUserId(userid));
      res.status(200).json(returnobj);
    } catch (error) {
      res.status(400).send(error);
    }
  }
  public async validatePhoneCode(req: Request, res: Response) {
    try {
      const { driverdetailsid, code } = req.body;
      await validatePhoneCode(driverdetailsid, code);
      var returnobj = addextraData(await getDriverDetailsById(driverdetailsid));
      res.status(200).json(returnobj);
    } catch (error) {
      res.status(400).send(error);
    }
  }
  public async createAndSendPhoneValidationcode(req: Request, res: Response) {
    try {
      const { driverdetailsid } = req.body;
      await createAndSendPhoneValidationcode(driverdetailsid);
      var returnobj = addextraData(await getDriverDetailsById(driverdetailsid));
      res.status(200).json(returnobj);
    } catch (error) {
      res.status(400).send(error);
    }
  }
  public async updateDriversPicture(req: Request, res: Response) {
    try {
      var form = new multiparty.Form();
      var driverdetailid;
      var data = "";
      var bitmap;
      form.on("field", function(name, value) {
        if (name === "driverdetailid") {
          driverdetailid = value;
          let convertedbaseimage = Buffer.from(bitmap).toString("base64");
          updateDriversPicture(driverdetailid, convertedbaseimage).then(
            resp => {
              getDriverDetailsById(driverdetailid).then(returnobj =>
                res.status(200).json(returnobj)
              );
            }
          );
        }
      });
      form.on("file", function(name, file) {
        bitmap = fs.readFileSync(file.path);
      });
      form.on("part", function(part) {
        if (!part.filename) return;

        part.setEncoding("binary"); //read as binary
        part.on("data", function(d) {
          data = data + d;
        });
        part.on("end", function() {});
      });
      form.parse(req);
    } catch (error) {
      res.status(400).send(error);
    }
  }
  public async saveUploadedDocuments(req: Request, res: Response) {
    try {
      var form = new multiparty.Form();
      var driverdetailid;
      var driverUploadsType;
      var data = "";
      var bitmap;
      var contentType = "pdf";
      form.on("field", function(name, value) {
        try {
          if (name === "driverdetailid") driverdetailid = value;
          if (name === "driverUploadsType") driverUploadsType = value;

          if (
            driverdetailid != "" &&
            driverUploadsType &&
            driverUploadsType != null &&
            driverUploadsType != ""
          ) {
            let convertedbaseimage = Buffer.from(bitmap).toString("base64");
            const newid = getNewGUID();
            saveUploadedDocuments(
              driverdetailid,
              newid,
              contentType,
              convertedbaseimage,
              driverUploadsType
            )
              .then(resp => {
                getDriverDetailsUploads(driverdetailid).then(returnlist =>
                  res.status(200).json(returnlist)
                );
              })
              .catch(err => res.status(400).send(err));
          }
        } catch (error) {
          res.status(400).send(error);
        }
      });
      form.on("file", function(name, file) {
        bitmap = fs.readFileSync(file.path);
      });
      form.on("part", function(part) {
        if (!part.filename) return;
        part.setEncoding("binary"); //read as binary
        part.on("data", function(d) {
          data = data + d;
        });
        part.on("end", function() {});
      });
      form.parse(req);
    } catch (error) {
      res.status(400).send(error);
    }
  }
  public async getDriverDetailsUploadData(req: Request, res: Response) {
    try {
      const { id } = req.params;
      var returnobj = await getDriverDetailsUploadData(id);
      res.contentType(returnobj.contentType);
      res.send(returnobj.content);
    } catch (error) {
      res.status(400).send(error);
    }
  }
  public async getDriverDetailsUploads(req: Request, res: Response) {
    try {
      const { driverdetailid } = req.params;
      var returnlist = await getDriverDetailsUploads(driverdetailid);
      res.status(200).json(returnlist);
    } catch (error) {
      res.status(400).send(error);
    }
  }
  public async deleteDriversDetailUpload(req: Request, res: Response) {
    try {
      const { id } = req.body;
      var driverdetailuploadrec = await getDriverDetailsUploadById(id);
      await deleteDriversDetailUpload(id);
      var returnlist = await getDriverDetailsUploads(
        driverdetailuploadrec.driverdetailsid
      );
      res.status(200).json(returnlist);
    } catch (error) {
      res.status(400).send(error);
    }
  }
  public async submitDriverDetails(req: Request, res: Response) {
    try {
      const { driverdetailsid } = req.body;
      await submitDriverDetails(driverdetailsid);
      var returnobj = addextraData(await getDriverDetailsById(driverdetailsid));
      res.status(200).json(returnobj);
    } catch (error) {
      res.status(400).send(error);
    }
  }
  public async getDriversRegistrationParameters(req: Request, res: Response) {
    try {
      const { userid } = req.params;
      var driverdetails: any = await getDriverDetailsByUserId(userid);

      var returnobj: any = {};
      returnobj.countrylist = await getCountryList();
      returnobj.statelist = await getStateList();
      returnobj.registrationstatus =
        driverdetails == null ? 0 : driverdetails.registrationStatus;
      returnobj.driverdata =
        driverdetails == null ? null : addextraData(driverdetails);
      res.status(200).json(returnobj);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }
}
