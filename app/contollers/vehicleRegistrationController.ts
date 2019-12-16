import { Request, Response } from "express";

import { createVehicleDetails } from "../commands/vehicleregistration/createVehicleDetails";
import { deleteVehicleDetails } from "../commands/vehicleregistration/deleteVehicleDetails";
import { createVehicleDetailUpload } from "../commands/vehicleregistration/createVehicleDetailUpload";
import { deleteVehicleDetailUpload } from "../commands/vehicleregistration/deleteVehicleDetailUpload";
import { submitVehicleDetail } from "../commands/vehicleregistration/submitVehicleDetail";

import {
  getVehicleDetailById,
  getVehicleDetailListByUserId,
  getVehicleDetailUploadList,
  getVehicleDetailUploadData
} from "../queries/vehicleDetailsQueries";
import { getNewGUID } from "../utilities/newGuid";
import * as fs from "fs";
import * as multiparty from "multiparty";
export class VehicleRegistrationController {
  public async createVehicleDetails(req: Request, res: Response) {
    try {
      const {
        userid,
        vehiclemakeid,
        vehiclemodelid,
        chasisNumber,
        licensenumber,
        description,
        yearOfPurchase,
        insurancedetails,
        insuranceexpirydate,
        kilometerstravelled
      } = req.body;

      const newid = getNewGUID();
      await createVehicleDetails(
        newid,
        userid,
        vehiclemakeid,
        vehiclemodelid,
        chasisNumber,
        licensenumber,
        description,
        yearOfPurchase,
        insurancedetails,
        insuranceexpirydate,
        kilometerstravelled
      );
      const returnlist: any[] = await getVehicleDetailListByUserId(userid);
      res.status(200).json(returnlist);
    } catch (error) {
      res.status(400).send(error);
    }
  }
  public async deleteVehicleDetails(req: Request, res: Response) {
    try {
      const { vehicledetailid, userid } = req.body;
      await deleteVehicleDetails(vehicledetailid);
      const returnlist: any[] = await getVehicleDetailListByUserId(userid);
      res.status(200).json(returnlist);
    } catch (error) {
      res.status(400).send(error);
    }
  }
  public async createVehicleDetailUpload(req: Request, res: Response) {
    try {
      var form = new multiparty.Form();
      var vehicledetailid;
      var vehicleuploadstype;
      var data = "";
      var bitmap;
      var contentType = "pdf";
      form.on("field", function(name, value) {
        try {
          if (name === "vehicledetailid") vehicledetailid = value;
          if (name === "vehicleuploadstype") vehicleuploadstype = value;

          if (
            vehicledetailid != "" &&
            vehicleuploadstype &&
            vehicleuploadstype != null &&
            vehicleuploadstype != ""
          ) {
            let convertedbaseimage = Buffer.from(bitmap).toString("base64");
            const newid = getNewGUID();
            createVehicleDetailUpload(
              vehicledetailid,
              newid,
              contentType,
              convertedbaseimage,
              vehicleuploadstype
            )
              .then(resp => {
                getVehicleDetailUploadList(vehicledetailid).then(returnlist =>
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

  public async deleteVehicleDetailUpload(req: Request, res: Response) {
    try {
      const { vehicledetailuploadid, vehicledetailid } = req.body;
      await deleteVehicleDetailUpload(vehicledetailuploadid);
      const returnlist: any[] = await getVehicleDetailUploadList(
        vehicledetailid
      );
      res.status(200).json(returnlist);
    } catch (error) {
      res.status(400).send(error);
    }
  }
  public async submitVehicleDetail(req: Request, res: Response) {
    try {
      const { vehicledetailid } = req.body;
      await submitVehicleDetail(vehicledetailid);
      var returnobj = await getVehicleDetailById(vehicledetailid);
      res.status(200).json(returnobj);
    } catch (error) {
      res.status(400).send(error);
    }
  }
  public async getVehicleDetailById(req: Request, res: Response) {
    try {
      const { vehicledetailid } = req.params;
      var returnobj = await getVehicleDetailById(vehicledetailid);
      res.status(200).json(returnobj);
    } catch (error) {
      res.status(400).send(error);
    }
  }
  public async getVehicleDetailListByUserId(req: Request, res: Response) {
    try {
      const { userid } = req.params;
      var returnlist = await getVehicleDetailListByUserId(userid);
      res.status(200).json(returnlist);
    } catch (error) {
      res.status(400).send(error);
    }
  }
  public async getVehicleDetailUploadData(req: Request, res: Response) {
    try {
      const { vehicledetailid } = req.params;
      var returnlist = await getVehicleDetailUploadList(vehicledetailid);

      res.status(200).json(returnlist);
    } catch (error) {
      res.status(400).send(error);
    }
  }
}
