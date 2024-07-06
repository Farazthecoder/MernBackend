import Book from "../models/book.model.js";

export const getBook = async (req,res)=>{
   try {
     const bookInfo = await Book.find()
     res.status(200).json(bookInfo)
   } catch (error) {
     res.status(500).json({message:error.message})
   }
}