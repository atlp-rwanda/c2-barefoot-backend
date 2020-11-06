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
    
    const upDate = models.user.update({user_role_id: query.user_role_id},{where: {email: query.email}});
    return upDate;

}


exports.deleteUser = (data)=>{
    const deleting = models.user.destroy({where: {email :data}});
    return deleting;
}


exports.addLineManager = (query) =>{
    const added = models.line_managers.create(query);
    return added;
}
exports.findLineManager = (query) =>{
    const found = models.line_managers.findByPk(query);
    return found;
}
exports.findManager = (query) =>{
    const found = models.line_managers.findOne({where:{first_name: query.first_name, last_name: query.last_name}});
    return found;
}

exports.updateUser = (query) =>{
    
    const upDating = models.user.update({manager_id: query.manager_id},{where: {email: query.email}});
    return upDating;

}


exports.changeRole = (query) =>{
    
    const changes = models.user.update({manager_id: query.change},{where: {manager_id: query.manager_id}});
    return changes;

}

exports.deleteManager = (data)=>{
    const deleting = models.line_managers.destroy({where: {first_name: data.first_name, last_name: data.last_name}});
    return deleting;
}


