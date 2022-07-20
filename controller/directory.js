const db = require('../models');
const Directory = db.directory;
const Book = db.book;
const mongoose = require('mongoose');
const toId = mongoose.Types.ObjectId;
/** 
{
    book:{
     type: mongoose.Schema.Types.ObjectId,
     ref: 'Book'
    },
    user:{
     type: mongoose.Schema.Types.ObjectId,
     ref: 'User'
    },
    note:{
     type: String
    },
*/
const createDirectory = async (req, res) => {
     //#swagger.summary = Use to create user directory/profile
    const userEmail = req.user.email;
    const bookId= toId(req.params._id);
    await Directory.findOne({user: userEmail}).then((data)=>{
        if(!data){
            // console.log('hehe')
            //create new directory if a directory hasn't been created yet
            const directory = new Directory;
            Book.findById({ _id: bookId }).then((book) => {
                if(!book){
                    res.status(404).send({message: `Cannot find book with id ${id}`})
                }
                const directoryData = {
                    user: userEmail,
                    note: req.body.note,
                    books: [bookId]
                }
                
                const result = new Directory(directoryData);
                try{
                    const saveResult =result.save();
                    res.status(201).json({'message': `New book was added in the directory!`})
                }catch(err){
                    res.status(500).json({'message': err.message})
                }
            })}
        else{
            // console.log('haha');
            Book.findById({ _id: bookId }).then((book) => {
                if(!book){
                    return res.status(404).send({message: `Cannot find book with id ${bookId}`})
                }
                console.log(data.books)

                const isExisting = data.books.includes(bookId);

                // if bookId is not found 
                if(!isExisting){
                    // console.log('hi');
                    data.books.push(bookId)
                    try{
                        data.save();
                        res.status(201).json({'message': `New book was added in the directory!`})
                    }catch(err){
                        res.status(500).json({'message': err.message})
                    }
                }
                //if bookId is part of the array
                else if(isExisting){
                    // console.log('hihi')
                    res.send({message:'Book already exists in directory'})
                }
            }
           )}
        })}


//get all directories from all users       
const getDirectories = async (req,res) =>{
     //#swagger.summary = Use to get all directories
    await Directory.find({}).populate({path:"books", model: "book"}).populate
    ({path:"books", populate:{path:"goal", model: "readingGoal",match:{user:req.user.email}}})
    .then((data)=>{
        res.send(data);
    }).catch((err)=>{
        res.status(500).send({
         message: err.message || 'An error occurred while retrieving the directory.'
    })}
)};
//select: "description, startDate", new: true
//get user directory from current user only        
const getDirectory = async (req,res) =>{
    await Directory.find({user: req.user.email}).populate({path:"books", model: "book"}).populate
    ({path:"books", populate:{path:"goal", model: "readingGoal", match:{user:req.user.email}}})
    .then((data)=>{
        // const dead = data.filter(deadGoal => JSON.stringify(deadGoal).books != null)
        // console.log(dead);
        res.send(data);
    }).catch((err)=>{
        return res.status(500).send({
         message: err.message || 'An error occurred while retrieving the directory.'
    })}
)};

//delete user directory
const deleteDirectory = async (req, res) => {
    const result = await Directory.findOneAndDelete({user: req.user.email})
    .then(data => {
            res.send({'message': `Directory was successfully deleted!`})
        }).catch(err =>{
          res.status(500).send({message: err.message || 'An error occurred while deleting the directory.'})
})}

//delete book from directory
//in progress

// const deleteBook = async (req, res) => {
//     const userEmail = req.user.email;
//     const bookId= toId(req.params._id);
//     await Directory.findOne({user: userEmail}, {books: [bookId]).then((data)=>{
//         if(!data){
//             res.status(500).send({'message': `Directory not found/book not found in directory`})
//         }try{
//             Directory.updateOne({user: req.user.email}, 
//                 {
//                     $pull: {
//                       books: bookId,
//                     },
//                   });
//                   res.send({'message': `Book was successfully deleted!`})
//         }catch(err){
//             res.status(500).json({'message': err.message})
//         }})
//     }

     


module.exports = {createDirectory, getDirectory, deleteDirectory};
  