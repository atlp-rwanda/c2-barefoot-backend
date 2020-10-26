import db from '../models'

 const dummyData = (req, res) => {

    const user = {
        Name:"Jackson",
        createdAt: new Date(),
        updatedAt: new Date()
    }
    //console.log(db)
    db.DummyUser.create(user)
        .then((data) => {res.json(user); console.log(data);})
        .catch((err) => {res.json(err); console.log(err);})
}
export default dummyData