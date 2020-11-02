import models from '../models';

exports.findUsers = (query) =>{
    const users= models.user.findAndCountAll(query);
    return users;
}

exports.deleteUser = (data)=>{
    const deleting = models.user.destroy({where: {email :data}});
    return deleting;
}
