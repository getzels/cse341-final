const { user } = require('../models');
const db = require('../models');
const Directory = db.directory;
const Book = db.book;
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
    const userEmail = req.user.email;
    const bookId = req.params._id;
    Directory.findOne({user: userEmail}).then((data)=>{
        if(!data){
            console.log('hehe')
            //create new directory if a directory hasn't been created yet
            const directory = new Directory;
            Book.findById({ _id: bookId }).then((book) => {
                if(!book){
                    res.status(404).send({message: `Cannot find book with id ${id}`})
                }
                const directoryData = {
                    user: userEmail,
                    note: req.body.note,
                    books: [{
                        id: book._id,
                        name: book.name
                    }]
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
            console.log('haha');
            Book.findById({ _id: bookId }).then((book) => {
                if(!book){
                    res.status(404).send({message: `Cannot find book with id ${id}`})
                }
                console.log(data.books)

                const bookIndex = data.books.findIndex(b => new String(b.id).trim() === new String(bookId).trim());
                (objInItems => new String(objInItems.productId).trim() === new String(product._id).trim());

                // if bookId is not found 
                if(bookIndex == -1){
                    console.log('hi');
                    console.log(bookIndex)
                    data.books.push({id: book._id, name: book.name})
                    try{
                        data.save();
                        res.status(201).json({'message': `New book was added in the directory!`})
                    }catch(err){
                        res.status(500).json({'message': err.message})
                    }
                }
                //if bookId is part of the array
                else if(bookIndex == 0 || 1){
                    console.log('hihi')
                    console.log(bookIndex);
                    res.send({message:'Book already exists in directory'})
                }
            }
           )
        }})}

//get directory from current user only        
const getDirectory = async (req,res) =>{
    Directory.find({user: req.user.email}).then((data)=>{
        res.send(data);
    }).catch((err)=>{
        res.status(500).send({
         message: err.message || 'An error occurred while retrieving the directory.'
    })}
)};

//delete user directory
const deleteDirectory = (req, res) => {
    const id = req.params._id;
    const result = Directory.findOneAndDelete({user: req.user.email})
    .then(data => {
            res.send({'message': `Directory was successfully deleted!`})
        }).catch(err =>{
          res.status(500).send({message: err.message || 'An error occurred while deleting the directory.'})
})}


module.exports = {createDirectory, getDirectory, deleteDirectory};
  