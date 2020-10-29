import models from '../models';

// class Users {
//     constructor(query){
//         this._query = query;
//     }

exports.findUsers = (query) =>{
        const users= models.user.findAll(query);
        return users;
}

exports.deleteUser = (data)=>{
    const deleting = models.user.destroy({where: {email :data}});
    return deleting;
}

// }


// export default {findUsers, deleteUser};