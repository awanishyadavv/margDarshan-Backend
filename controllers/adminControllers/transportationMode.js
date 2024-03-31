import {TransportationMode} from "../../models/adminModels/transportationMode.js";
import ErrorHandler from "../../middelwares/error.js";


export const newTransportationMode = async (req, res, next) => {
    try { 
        const { transportationMode } = req.body;
        let checkTransMode = await TransportationMode.findOne({ transportationMode });
        if (checkTransMode) return next(new ErrorHandler("Transportation Mode already Exist", 404));

        await TransportationMode.create({
            transportationMode,
        })

        res.status(201).json({
            success: true,
            message: "Transportaion Mode Added Successfully",
        })

    } catch (error) {
        next(error)
    }
};


export const getTransportationMode = async (req, res, next) => {
    try {
        const allTransMode = await TransportationMode.find();
        res.status(201).json({
            success: true,
            allTransMode,
        })
    } catch (error) {
        next(error)
    }
};


export const updateTransportationMode = async (req, res, next) => {
    try {
        const { transModeId } = req.params;
        const { transportationMode } = req.body;

        const checkTransMode= await TransportationMode.findById(transModeId);
        if (!checkTransMode) return next(new ErrorHandler("Transportation Mode not Found", 404))

        if (transportationMode) {
            checkTransMode.transportationMode = transportationMode;
        }

        await checkTransMode.save();
        res.status(201).json({
            success: true,
            message: "Transportation Mode updated successfully",
        });
    } catch (error) {
        next(error)
    }
};


export const deleteTransportationMode = async (req, res, next) => {
    try {
        const { transModeId } = req.params;
        const checkTransMode= await TransportationMode.findById(transModeId);
        if (!checkTransMode) return next(new ErrorHandler("Transportation Mode not Found", 404))

        await checkTransMode.deleteOne();
        res.status(201).json({
            success: true,
            message: "Transportation Mode Deleted"
        })
    } catch (error) {
        next(error)
    }
};