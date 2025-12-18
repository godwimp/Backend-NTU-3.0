import fs from "fs";
import path from "path";
import { Sequelize, DataTypes } from "sequelize";
import process from "process";

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../../config/config.json")[env];

interface DB {
  [key: string]: any;
  sequelize: Sequelize;
  Sequelize: typeof Sequelize;
}

const db: DB = {} as DB;

const initializeSequelize = (): Sequelize => {
  if (config.use_env_variable) {
    return new Sequelize(
      process.env[config.use_env_variable] as string,
      config
    );
  }
  return new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
};

const isValidModelFile = (file: string): boolean => {
  return (
    file.indexOf(".") !== 0 &&
    file !== basename &&
    (file.endsWith(".ts") || file.endsWith(".js")) &&
    !file.includes(".test.") &&
    !file.endsWith(".d.ts")
  );
};

const loadModels = (sequelize: Sequelize): void => {
  fs.readdirSync(__dirname)
    .filter(isValidModelFile)
    .forEach((file) => {
      const importedModel = require(path.join(__dirname, file));
      const model = (importedModel.default || importedModel)(
        sequelize,
        DataTypes
      );
      db[model.name] = model;
    });
};

const associateModels = (): void => {
  Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });
};

const sequelize = initializeSequelize();
loadModels(sequelize);
associateModels();

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
