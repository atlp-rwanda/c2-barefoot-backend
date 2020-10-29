import fs from 'fs';
import models from '../models';

exports.createOne = (data)=>{
    const created = models.Role.create(data);
    return created;
}

exports.deleteOne = (data)=>{
    const deleted = models.Role.destroy({where:{ name: data}});
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