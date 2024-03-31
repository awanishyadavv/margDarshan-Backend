import { Trip } from "../models/trip.js";
import ErrorHandler from "../middelwares/error.js";

// Add new Trip
export const newTrip = async (req, res, next) => {
    try {
        const { tripName, tripItems , isPublic} = req.body;

        let tripExistance = await Trip.findOne({tripName});

        if(tripExistance) return next(new ErrorHandler("Trip with this name already Exist", 404))

        if (!tripItems || !Array.isArray(tripItems) || tripItems.length === 0) {
            return res.status(400).json({
                success: false,
                message: "At least one item required in trip plan."
            });
        }
        const tripData = {
            tripName,
            tripItems,
            isPublic,
            user: req.user // Assuming req.user contains the user ID
        };

        await Trip.create(tripData);

        res.status(201).json({
            success: true,
            message: "Trip added successfully."
        });
    } catch (error) {
        next(error);
    }
};


// Get all Trips
export const myTrips = async (req, res, next) => {
    try {
        const userid = req.user._id;
        const trips = await Trip.find({user:userid});
        res.status(201).json({
            success:true,
            trips,
        })
       } catch (error) {
        next(error)
       }
};

// Get all Trips
export const publicTrips = async (req, res, next) => {
    try {
        const trips = await Trip.find({isPublic:true});
        res.status(201).json({
            success:true,
            trips,
        })
       } catch (error) {
        next(error)
       }
};


// Update Existing Trip
export const updateTrip = async (req, res, next) => {
    try {
        const { tripId } = req.params;
        const { tripName, tripItems, isPublic } = req.body;

        let trip = await Trip.findById(tripId);
        let checkTripName = await Trip.findOne({tripName});

        // if(checkTripName) return next(new ErrorHandler("Trip with this name already Exist", 404))

        if (!trip) {
            return next(new ErrorHandler("Trip not found", 404));
        }

        if (tripName) {
            trip.tripName = tripName;
        }

        if (tripItems) {
            trip.tripItems = tripItems;
        }

        if (isPublic) {
            trip.isPublic = isPublic;
        }

        await trip.save();
        res.status(200).json({
            success: true,
            message: "Trip updated successfully.",
        });
    } catch (error) {
        next(error);
    }
};


// Delete Trip
export const deleteTrip = async (req, res, next) => {
    try {
        const {tripId} = req.params;
    
        const trip = await Trip.findById(tripId);
    
        if(!trip) return next(new ErrorHandler("Trip not Found", 404))
    
        await trip.deleteOne();
    
        res.status(201).json({      
            success:true,
            message:"Trip Deleted"
        })
        } catch (error) {
            next(error)
        }
};