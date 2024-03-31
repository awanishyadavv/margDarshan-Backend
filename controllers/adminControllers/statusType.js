import { StatusType } from "../../models/adminModels/statusType.js";
import ErrorHandler from "../../middelwares/error.js";


export const newStatus = async (req, res, next) => {
    try {
        const { status } = req.body;
        let checkStatus = await StatusType.findOne({ status });
        if (checkStatus) return next(new ErrorHandler("Status already Exist", 404));

        await StatusType.create({
            status,
        })

        res.status(201).json({
            success: true,
            message: "Status Added Successfully",
        })

    } catch (error) {
        next(error)
    }
};


export const getStatus = async (req, res, next) => {
    try {
        const allStatus = await StatusType.find();
        res.status(201).json({
            success: true,
            allStatus,
        })
    } catch (error) {
        next(error)
    }
};


export const updateStatus = async (req, res, next) => {
    try {
        const { statusId } = req.params;
        const { status } = req.body;

        const checkStatus= await StatusType.findById(statusId);
        if (!checkStatus) return next(new ErrorHandler("Status not Found", 404))

        if (status) {
            checkStatus.status = status;
        }
        await checkStatus.save();
        res.status(201).json({
            success: true,
            message: "Status updated successfully",
            checkStatus,
        });

    } catch (error) {
        next(error)
    }
};


export const deleteStatus = async (req, res, next) => {
    try {
        const { statusId } = req.params;
        const checkStatus= await StatusType.findById(statusId);
        if (!checkStatus) return next(new ErrorHandler("Status not Found", 404))
        await checkStatus.deleteOne();

        res.status(201).json({
            success: true,
            message: "Status Deleted"
        })
    } catch (error) {
        next(error)
    }
};