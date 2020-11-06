import fs from 'fs';
import models from '../models';

exports.createOne = (data)=>{
    const created = models.role.create(data);
    return created;
}

exports.findRole = (data) =>{
    const found = models.role.findOne({where:{ name: data.name}});
    return found;
}
exports.findRoles = (data) =>{
    const foundRoles = models.role.findAndCountAll(data);
    return foundRoles;
}
exports.findLineManagers = (data) =>{
    const foundManagers = models.line_managers.findAll(data);
    return foundManagers;
}

exports.findRoleById = (query)=>{
    const role = models.role.findOne({where:{id: query.id}});
    return role;
}
exports.changeRole = (query) =>{
    
    const changes = models.user.update({user_role_id: query.change},{where: {user_role_id: query.role_id}});
    return changes;

}
exports.deleteOne = (data)=>{
    const deleted = models.role.destroy({where:{ id: data}});
    return deleted;
}

exports.readFile = () =>{
    return fs.readFileSync('./src/config/permissions/index.json');
}


exports.saveInFile = (data) =>{
    return fs.writeFileSync('./src/config/permissions/index.json', data);
}
