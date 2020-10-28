import models from '../../models';

exports.findThem = async (req, res) =>{
    try{
        const users= await models.user.findAll({});
        return res.status(200).json({ users });
    }catch(error){
        return res.status(500).json({error: "Internal error"});
    }
}


exports.deleteOne = async (req, res) =>{
    try{
        const userEmail = req.body.email;
        const deleted = await models.user.destroy({where: { email: userEmail}});
        if(deleted){
            res.status(200).json({deleted});
        }
        else{
            res.status(500).json({error: "user not deleted! Try again"});
        }
    }catch(erro){
        return res.status(500).json({ error: "Internal error"});
    }
}

// export default findThem;