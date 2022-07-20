const db = require('../models');
const Goal = db.readingGoal;
const mongoose = require('mongoose');
const { directory } = require('../models');
const toId = mongoose.Types.ObjectId;
const Book = db.book;
const Directory = db.directory;

const createGoal = async (req, res) => {
  //#swagger.summary = Use to register create a new goal
    req.params.book = toId(req.params.book);
      if (!req.body.description){
          res.status(400).send({message: 'Please make sure to fill-up all required data!'});
          return;
      }
        const newGoal = new Goal({
            user: req.user.email,
            description: req.body.description,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            book: req.params.book
        });
        newGoal.save();
            //decided not to expand error-handling on this part too much 
            //since bookId will always be valid if we get frontend to work
            Book.findById({ _id: req.params.book}).then((book) => {
              book.goal.push(newGoal)
              try{
                book.save();
                res.status(201).json({'message': `New goal was successfully created!`})
              }catch(err){
                res.status(500).json({'message': err.message})
              }}
            )
          };
        
 //get goals by logged-in user
 const getUserGoals = async (req, res) => {
   //#swagger.summary = Use to get all user goals
    await Goal.find({user: req.user.email}).populate({path: "book", model:"book", select:"name, publishDate, publisher, type"})
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'An error occurred while retrieving all the goals.'
       });
   });
};
 
//get everyone's goals
const getGoals = (req, res) => {
   //#swagger.summary = Use to get all goals
      console.log();
      Goal.find({}).populate({path: "book", model:"book", select:"name, publishDate, publisher, type"})
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message || 'An error occurred while retrieving all the goals.'
         });
     });
};

//get one single goal
const getGoal = (req, res) => {
   //#swagger.summary = Use to get one specific goal
      const id = req.params._id;

      Goal.findById({ _id: id }).populate({path: "book", model:"book", select:"name, publishDate, publisher, type"})
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
            message: err.message || 'An error occurred while retrieving the goal.'
          });
        });
};
// "description": req.body.name,
// "startDate": req.body.startDate,
// "endDate": req.body.endDate,
// "book": req.params.book
const updateGoal = (req, res) => {
   //#swagger.summary = Use to update a specific goal
    const id = req.params._id;
      const {description, startDate, endDate} = req.body;
      const updatedGoal= Goal.findByIdAndUpdate({_id: id},{description, startDate, endDate})
      .then(data => {
        if(!data){
          res.status(404).send({message: `Invalid ID given`})
        }else{
          res.send({'message': `Goal was successfully updated!`})
      }}).catch(err =>{
        res.status(500).send({message: err.message || 'An error occurred while deleting the pet'})
      })};

const deleteGoal = (req, res, next) => {
   //#swagger.summary = Use to delete a specific goal
    const id = toId(req.params._id);
    const result = Goal.findByIdAndDelete({_id:id})
    .then(data => {
        if(!data){
            return res.status(404).send({message: `Invalid ID given`})
        }else{
          // res.send({'message': `Goal was successfully deleted!`})
          // next();
            Book.find({goal: [id]}).then(bookData =>{
              if(!bookData){
                 return next();
              }
              try{
                Book.updateOne({_id: id}, 
                    {
                    $pull: {
                      goal: id,
                    },
                  });
                  res.send({'message': `Goal was successfully deleted!`})
                  // return next();
            }catch(err){
                 return next();
            }})
        }})
}
  

module.exports = {getUserGoals, getGoals, getGoal, createGoal, updateGoal, deleteGoal};
  
  