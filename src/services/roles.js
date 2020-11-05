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

exports.deleteOne = (data)=>{
    const deleted = models.role.destroy({where:{ name: data}});
    return deleted;
}

exports.readFile = () =>{
    return fs.readFileSync('./permissions/index.json');
}


exports.saveInFile = (data) =>{
    return fs.writeFileSync('./permissions/index.json', data);
}

exports.fileExistOrNot = (file) =>{
    if(!fs.existsSync(file)){
        return fs.writeFileSync(file, '{}');
    }
    return 0;
}