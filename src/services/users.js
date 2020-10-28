import models from '../models';

class Users {
    constructor(query){
        this._query = query;
    }

    findUsers(query){
        const users= models.user.findAll(query);
        return users;
    }
}


export default Users;