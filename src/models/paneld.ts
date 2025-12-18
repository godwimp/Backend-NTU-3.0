import { Model, DataTypes, Sequelize } from "sequelize";
import { PanelDData } from "../types/index";

class PanelD extends Model<PanelDData> implements PanelDData {
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
  PanelD.init(
    {
      timestamp: DataTypes.DATE,
      level1: DataTypes.FLOAT,
      level2: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "PanelD",
    }
  );
  return PanelD;
};
