const db = require('../models');
const User = db.user;

const createUser = async (req, res) => {
      if (!req.body.firstName || !req.body.lastName || !req.body.email){
          res.status(400).send({message: 'Please make sure to fill-up all required data!'});
          return;
      }
      try{
      const user = await User.create({
          "firstName": req.body.firstName,
          "lastName": req.body.lastName,
          "email": req.body.email
      });
      res.status(201).json({'message': `New user was successfully created!`})
      }catch(err){
          res.status(500).json({'message': err.message})
      }
 };

const getUsers = (req, res) => {
      User.find({})
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message || 'An error occurred while retrieving all the users.'
         });
     });
};

const getUser = (req, res) => {
      const id = req.params._id;
      User.findById({ _id: id })
        .then((data) => {
          if(!data){
            res.status(404).send({message: `Invalid ID given`})
          }
          else{
            res.send(data);
          }
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message || 'An error occurred while retrieving the user.'
          });
        });
};

const deleteUser = (req, res) => {
    const id = req.params._id;
    const result = User.findByIdAndDelete({_id:id})
    .then(data => {
        if(!data){
            res.status(404).send({message: `Invalid ID given`})
        }else{
            res.send({'message': `User #${id} was successfully deleted!`})
        }}).catch(err =>{
          res.status(500).send({message: err.message || 'An error occurred while deleting the user.'})
})}


module.exports = {getUsers, getUser, createUser, deleteUser};
  
  