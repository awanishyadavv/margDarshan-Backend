import { StateDistrict } from "../../models/adminModels/stateDistrict.js";
import ErrorHandler from "../../middelwares/error.js";


export const newStateDistrict = async (req, res, next) => {
    try {
       const {state,districts} = req.body;

       let checkState = await StateDistrict.findOne({state});
       if(checkState) return next(new ErrorHandler("State already Exist", 404));

       await StateDistrict.create({
        state, districts,
    })

    res.status(201).json({
        success: true,
        message: "State Added Successfully",
    })

    } catch (error) {
        next(error)
    }
};


export const getStateDistrict = async (req, res, next) => {
    try {
      const state = await StateDistrict.find();
        res.status(201).json({
            success: true,
            state,
        })
    } catch (error) {
        next(error)
    }
};


export const updatestateDistrict = async (req, res, next) => {
    try {
        const { stateId } = req.params;
        const { state, districts } = req.body;

        const checkState= await StateDistrict.findById(stateId);
        if (!checkState) return next(new ErrorHandler("State not Found", 404))

        if (state) {
            checkState.state = state;
        }
        if (districts) {
            checkState.districts = districts;
        }

        await checkState.save();
        res.status(201).json({
            success: true,
            message: "State updated successfully",
            checkState,
        });

    } catch (error) {
        next(error)
    }
};


export const deleteStateDistrict = async (req, res, next) => {
    try {
        const { stateId } = req.params;
        const checkState= await StateDistrict.findById(stateId);
        if (!checkState) return next(new ErrorHandler("State not Found", 404))

        await checkState.deleteOne();

        res.status(201).json({
            success: true,
            message: "State Deleted"
        })
    } catch (error) {
        next(error)
    }
};