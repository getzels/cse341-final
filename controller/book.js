const db = require('../models');
const Book = db.book;


const createBook = async (req, res) => {
      if (!req.body.name || !req.body.publishDate || !req.body.category || !req.body.publisher || !req.body.type){
          res.status(400).send({message: 'Please make sure to fill-up all required data!'});
          return;
      }
      try{
      const book = await Book.create({
          "name": req.body.name,
          "publishDate": req.body.publishDate,
          "category": req.body.category,
          "publisher": req.body.publisher,
          "type": req.body.type,
      });
      res.status(201).json({'message': `New book was successfully created!`})
      }catch(err){
          res.status(500).json({'message': err.message})
      }
 };

const getBooks = (req, res) => {
      console.log();
      Book.find({})
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message || 'An error occurred while retrieving all the books.'
         });
     });
};

const getBook = (req, res) => {
      const id = req.params._id;

      Book.findById({ _id: id })
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
            message: err.message || 'An error occurred while retrieving the book.'
          });
        });
};


/** name: String,
        publishDate: String,
        category: String,
        publisher: String,
        type: String */
const updateBook = (req, res) => {
    const id = req.params._id;
      const {name, publishDate, category, publisher, type} = req.body;
      const updatedBook = Book.findByIdAndUpdate({_id: id},{name, publishDate, category, publisher, type})
      .then(data => {
        if(!data){
          res.status(404).send({message: `Invalid ID given`})
        }else{
          res.send({'message': `Book was successfully updated!`})
      }}).catch(err =>{
        res.status(500).send({message: err.message || 'An error occurred while deleting the pet'})
      })};

const deleteBook = (req, res) => {
    const id = req.params._id;
    const result = Book.findByIdAndDelete({_id:id})
    .then(data => {
        if(!data){
            res.status(404).send({message: `Invalid ID given`})
        }else{
            res.send({'message': `Book was successfully deleted!`})
        }}).catch(err =>{
          res.status(500).send({message: err.message || 'An error occurred while deleting the book.'})
})}

module.exports = {getBooks, getBook, createBook, updateBook, deleteBook};
  
  