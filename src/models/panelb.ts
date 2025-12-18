import { Model, DataTypes, Sequelize } from "sequelize";
import { PanelBData } from "../types/index";

class PanelB extends Model<PanelBData> implements PanelBData {
  public id!: number;
  public timestamp!: Date;
  public flow1!: number;
  public turbidity!: number;
  public ph!: number;
  public tds!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(_models: any) {
    // ??
  }
}

export default (sequelize: Sequelize) => {
  PanelB.init(
    {
      timestamp: DataTypes.DATE,
      flow1: DataTypes.FLOAT,
      turbidity: DataTypes.FLOAT,
      ph: DataTypes.FLOAT,
      tds: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "PanelB",
    }
  );
  return PanelB;
};
