import models from '../models';

exports.findUsers = (query) =>{
    query.include = [{ model: models.Role, as: 'Role'},{ model: models.Line_manager, as: 'Line_manager'}];
    const users= models.User.findAndCountAll(query);

    return users;
}

exports.getUser = (query) =>{
    const user= models.User.findOne({where:{email:query.email}});

    return user;
}

exports.updateUserRole = (query) =>{
    
    const upDate = models.User.update({user_role_id: query.user_role_id},{where: {email: query.email}});
    return upDate;

}


exports.deleteUser = (data)=>{
    const deleting = models.User.destroy({where: {email :data}});
    return deleting;
}


exports.addLineManager = (query) =>{
    const added = models.Line_manager.create(query);
    return added;
}
exports.findLineManager = (query) =>{
    const found = models.Line_manager.findByPk(query);
    return found;
}
exports.findManager = (query) =>{
    const found = models.Line_manager.findOne({where:{first_name: query.first_name, last_name: query.last_name}});
    return found;
}

exports.updateUser = (query) =>{
    
    const upDating = models.User.update({manager_id: query.manager_id},{where: {email: query.email}});
    return upDating;

}


exports.changeRole = (query) =>{
    
    const changes = models.User.update({manager_id: query.change},{where: {manager_id: query.manager_id}});
    return changes;

}

exports.deleteManager = (data)=>{
    const deleting = models.Line_manager.destroy({where: {first_name: data.first_name, last_name: data.last_name}});
    return deleting;
}


