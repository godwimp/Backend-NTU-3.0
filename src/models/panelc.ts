import { Model, DataTypes, Sequelize } from "sequelize";
import { PanelCData } from "../types/index";

class PanelC extends Model<PanelCData> implements PanelCData {
  public id!: number;
  public timestamp!: Date;
  public level1!: number;
  public level2!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(_models: any) {
    // ??
  }
}

export default (sequelize: Sequelize) => {
  PanelC.init(
    {
      timestamp: DataTypes.DATE,
      level1: DataTypes.FLOAT,
      level2: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "PanelC",
    }
  );
  return PanelC;
};
