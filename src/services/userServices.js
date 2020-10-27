import { DataTypes } from "sequelize";
import { sequelize } from "../models/index";
import users from "../models/user";

const userModel = users(sequelize, DataTypes);

export  const findUserByEmail = async (email) => {
    try {
        const userFound = await userModel.findOne({
            where: {
                email:email
            }
        })
        if(!userFound) return false;
        return userFound;
    } catch (error) {
        return false;
    }
}

export const updateUserPassword = async (email, newPassword) => {
    console.log(email, newPassword)
    try {
        const updatedUser = await userModel.update({passord: newPassword }, {where: {email}, returning: true});
    console.log(updatedUser)

    if(!updatedUser) return null;
    return updatedUser;
    } catch (error) {
        return null;
    }
}