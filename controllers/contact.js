import { Contact } from "../models/contact.js";
import ErrorHandler from "../middelwares/error.js";



// New Query/ Contact
export const newContact = async(req,res, next) => {
    try {
        const {name, email, subject, query} = req.body;

        let openQuery = await Contact.findOne({email,isQueryClosed: false});

        if(openQuery) return next(new ErrorHandler("Open query already exist with this email", 404));

        await Contact.create({name, email, subject, query})

        res.status(200).json({
            success: true,
            message: "Query send Successfully.",
        });
    } catch (error) {
        next(error)
    }
};

// Fetch Query/ Contact
export const getContact = async(req,res, next) => {
    try {
        const queries = await Contact.find()
        res.status(201).json({
            success:true,
            queries,
        })
    } catch (error) {
        next(error)
    }
};


export const updateQuery = async(req, res, next) => {
    try {
        const{status, isQueryClosed} = req.body;
        const {queryId} = req.params;

        let query = await Contact.findById(queryId);

        if(!query) return next(new ErrorHandler("Query doesn't exist with this ID", 404));

        query.status = status;
        query.isQueryClosed = isQueryClosed;

        await query.save();

        res.status(200).json({
            success:true,
            message:"Query updated successfully",
            query,
        })

    } catch (error) {
        next(error)
    }
}

