import { Request, Response } from "express";
import {
  getCountryList,
  getStateList,
  getVehicleMakeList,
  getVehicleModelList
} from "../queries/parameterQueries";
import { createVehicleMake } from "../commands/parameters/createVehicleMake";
import { createVehicleModel } from "../commands/parameters/createVehicleModel";
import { getNewGUID } from "../utilities/newGuid";
export class ParametersController {
  public async getCountryList(req: Request, res: Response) {
    try {
      var returnlist = await getCountryList();
      res.status(200).json(returnlist);
    } catch (error) {
      res.status(400).send(error);
    }
  }
  public async getStateList(req: Request, res: Response) {
    try {
      var returnlist = await getStateList();
      res.status(200).json(returnlist);
    } catch (error) {
      res.status(400).send(error);
    }
  }
  public async getVehicleMakeList(req: Request, res: Response) {
    try {
      var returnlist: any[] = await getVehicleMakeList();
      res.status(200).json(returnlist);
    } catch (error) {
      res.status(400).send(error);
    }
  }
  public async getVehicleModelList(req: Request, res: Response) {
    try {
      const { vehiclemakeid } = req.params;
      var returnlist: any[] = await getVehicleModelList(vehiclemakeid);
      res.status(200).json(returnlist);
    } catch (error) {
      res.status(400).send(error);
    }
  }
  public async createVehicleMake(req: Request, res: Response) {
    try {
      const { code, description } = req.body;
      const newid = getNewGUID();
      await createVehicleMake(newid, code, description);
      var returnlist: any[] = await getVehicleMakeList();
      res.status(200).json(returnlist);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  public async createVehicleModel(req: Request, res: Response) {
    try {
      const { vehiclemakeid, code, description } = req.body;
      const newid = getNewGUID();
      await createVehicleModel(newid, vehiclemakeid, code, description);
      var returnlist: any[] = await getVehicleModelList(vehiclemakeid);
      res.status(200).json(returnlist);
    } catch (error) {
      res.status(400).send(error);
    }
  }
}
