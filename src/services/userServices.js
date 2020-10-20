import { DataTypes } from "sequelize";
import { sequelize } from "../models/index";
import users from "../models/user";

const userModel = users(sequelize, DataTypes);

export  const findUserByEmail = async (email) => {
    try {
        const userFound = await userModel.findOne({
            where: {
                email
            }
        })
        if(!userFound) return false;
        return userFound;
    } catch (error) {
        return false;
    }
}