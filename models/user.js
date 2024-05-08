const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/config");
const bcrypt = require("bcrypt");

class User extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isAlphanumeric: true,
        len: [3, 25],
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    hooks:{
      beforeCreate: async(user) => {
        user.password = await bcrypt.hash(user.password,10);
        return user
      }
    },
    sequelize,
    modelName: "User",
    tableName: "groov_users",
    timestamps: true,
    updatedAt: false,
  }
);

module.exports = User;
