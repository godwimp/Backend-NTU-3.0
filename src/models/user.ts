import { Model, DataTypes, Sequelize } from "sequelize";
import { hashPassword } from "../helpers/bcrypt";
import { UserAttributes } from "../types/index";

const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/i;
const PASSWORD_MIN_LENGTH = 6;
const PASSWORD_MAX_LENGTH = 24;


class User extends Model<UserAttributes> implements UserAttributes {
  public id!: number;
  public name!: string;
  public username!: string;
  public email!: string;
  public password!: string;
  public role!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(_models: any) {
    // ??
  }
}

export default (sequelize: Sequelize): typeof User => {
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Name is required",
          },
          notEmpty: {
            msg: "Name is required",
          },
        },
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          name: "username",
          msg: "Username already exists",
        },
        validate: {
          notNull: {
            msg: "Username is required",
          },
          notEmpty: {
            msg: "Username is required",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          name: "email",
          msg: "Email already exists",
        },
        validate: {
          notNull: {
            msg: "Email is required",
          },
          notEmpty: {
            msg: "Email is required",
          },
          isEmail: {
            msg: "Email is not valid",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Password is required",
          },
          notEmpty: {
            msg: "Password is required",
          },
          len: {
            args: [PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH],
            msg: `Password min ${PASSWORD_MIN_LENGTH} characters`,
          },
          is: {
            args: PASSWORD_REGEX,
            msg: "Password must contain at least one uppercase letter, one lowercase letter, and one number",
          },
        },
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "user",
      },
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate: (user: User) => {
          user.password = hashPassword(user.password);
        },
      },
    }
  );
  return User;
};
