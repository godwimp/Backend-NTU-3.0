import express from "express";
import { DataController } from "../controllers/DataController";

const router = express.Router();

router.get("/panelA", DataController.getPanelA);
router.get("/panelB", DataController.getPanelB);
router.get("/panelC", DataController.getPanelC);
router.get("/panelD", DataController.getPanelD);
router.get("/panelE", DataController.getPanelE);

router.get("/panelA1/latest", DataController.getLatestPanelA);
router.get("/panelB1/latest", DataController.getLatestPanelB);
router.get("/panelC1/latest", DataController.getLatestPanelC);
router.get("/panelD1/latest", DataController.getLatestPanelD);
router.get("/panelE1/latest", DataController.getLatestPanelE);

export default router;