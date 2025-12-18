import { Request, Response } from "express";
import { WhereOptions } from "sequelize";
import db from "../models";
import moment from "moment";
import { TimeFilter } from "../types/index";

const { PanelA, PanelB, PanelC, PanelD, PanelE } = db;

export class DataController {
  private static buildTimeFilter(filter?: TimeFilter): WhereOptions {
    if (!filter) return {};

    const filterMap: Record<TimeFilter, WhereOptions> = {
      daily: {
        createdAt: {
          $gte: moment().startOf("day").toDate(),
          $lte: moment().endOf("day").toDate(),
        },
      },
      weekly: {
        createdAt: {
          $gte: moment().startOf("isoWeek").toDate(),
          $lte: moment().endOf("isoWeek").toDate(),
        },
      },
      monthly: {
        createdAt: {
          $gte: moment().startOf("month").toDate(),
          $lte: moment().endOf("month").toDate(),
        },
      },
    };

    console.log(`${filter.charAt(0).toUpperCase() + filter.slice(1)} filter`);
    return filterMap[filter] || {};
  }

  static async getPanelData(
    req: Request,
    res: Response,
    panelModel: any
  ): Promise<void> {
    const { filter } = req.query as { filter?: TimeFilter };
    console.log("Filter received: ", req.query);

    const where = DataController.buildTimeFilter(filter);

    try {
      const data = await panelModel.findAll({ where });
      res.status(200).json(data);
    } catch (err: any) {
      res.status(500).json({ err: err.message });
    }
  }

  static async getLatestPanelData(
    _req: Request,
    res: Response,
    panelModel: any
  ): Promise<void> {
    try {
      const data = await panelModel.findOne({
        order: [["timestamp", "DESC"]],
      });
      res.status(200).json(data);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getPanelA(req: Request, res: Response): Promise<void> {
    await DataController.getPanelData(req, res, PanelA);
  }

  static async getPanelB(req: Request, res: Response): Promise<void> {
    await DataController.getPanelData(req, res, PanelB);
  }

  static async getPanelC(req: Request, res: Response): Promise<void> {
    await DataController.getPanelData(req, res, PanelC);
  }

  static async getPanelD(req: Request, res: Response): Promise<void> {
    await DataController.getPanelData(req, res, PanelD);
  }

  static async getPanelE(req: Request, res: Response): Promise<void> {
    await DataController.getPanelData(req, res, PanelE);
  }

  static async getLatestPanelA(req: Request, res: Response): Promise<void> {
    await DataController.getLatestPanelData(req, res, PanelA);
  }

  static async getLatestPanelB(req: Request, res: Response): Promise<void> {
    await DataController.getLatestPanelData(req, res, PanelB);
  }

  static async getLatestPanelC(req: Request, res: Response): Promise<void> {
    await DataController.getLatestPanelData(req, res, PanelC);
  }

  static async getLatestPanelD(req: Request, res: Response): Promise<void> {
    await DataController.getLatestPanelData(req, res, PanelD);
  }

  static async getLatestPanelE(req: Request, res: Response): Promise<void> {
    await DataController.getLatestPanelData(req, res, PanelE);
  }
}
