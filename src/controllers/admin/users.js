import usersService from '../../services/users';
import userValidation from '../../validation/createRole';

exports.findThem = async (req, res) =>{
    try{
        // const users= await models.user.findAll({});

        const users = await usersService.findUsers({});
        return res.status(200).json({ users });
    }catch(error){
        return res.status(500).json({error: "Internal error"});
    }
}


exports.deleteOne = async (req, res) =>{
    try{

        /* data validation */
        const { error } = userValidation.deleteValidationEmail(req.body);
        if (error) return res.status(400).json(error.details[0].message);


        const userEmail = req.body.email;
        const deleted = await usersService.deleteUser(userEmail);
        if(deleted){
            res.status(200).json({deleted});
        }
        else{
            res.status(500).json({error: "user not deleted! Try again"});
        }
    }catch(erro){
        return res.status(500).json({ error: "Internal error", erro});
    }
}

