import models from '../models';

exports.findUsers = (query) =>{
    query.include = [{ model: models.role, as: 'role'},{ model: models.line_managers, as: 'line_manager'}];
    const users= models.user.findAndCountAll(query);

    return users;
}

exports.getUser = (query) =>{
    const user= models.user.findOne({where:{email:query.email}});

    return user;
}

exports.updateUserRole = (query) =>{
    
    const upDate = models.user.update({user_role: query.user_role},{where: {email: query.email}});
    return upDate;

}

exports.deleteUser = (data)=>{
    const deleting = models.user.destroy({where: {email :data}});
    return deleting;
}

