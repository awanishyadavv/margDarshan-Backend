import { Place } from "../models/place.js";
import { sendCookie } from "../utils/features.js";
import ErrorHandler from "../middelwares/error.js";



// Add new Place
export const newPlace = async(req,res, next) => {
    
    console.log(req.body);
    try {  
    const {placeId, placeName, email, category, subcategory, state, district, status, highlights, bestWeather, transportation, compound, nearbyPlaces, famous} = req.body;

    let place = await Place.findOne({placeName});

    if(place) return next(new ErrorHandler("Place already Exist", 404))

    place = await Place.create({placeId, placeName, email, category, subcategory, state, district, status, highlights, bestWeather, transportation, compound, nearbyPlaces, famous});

    sendCookie(place, res,"Added Successfully");
    } catch (error) {
        next(error)
    }
};


// Get Places with all attributes
export const getPlaces = async(req,res, next) => {
    try {
        const places = await Place.find({}).select('placeName highlights bestWeather transportation compound nearbyPlaces famous');
        res.status(201).json({
            success:true,
            places,
        })
    } catch (error) {
        next(error)
    }
};


// Get Place by Name of Simillar
export const getPlaceByName = async (req, res, next) => {
    try {
        const requestedPlace = req.params.placeName;
        let place = await Place.findOne({ placeName: requestedPlace });


        if (!place) {
            const regex = new RegExp(requestedPlace, 'i'); // 'i' flag for case-insensitive matching
            place = await Place.find({ placeName: regex });
        }

        if (!place || (Array.isArray(place) && place.length === 0)) {
            return res.status(404).json({
                success: false,
                message: "Place not found"
            });
        }
        res.status(200).json({
            success: true,
            place,
        });
    } catch (error) {
        next(error);
    }
};


// Get all places with selected attributes

export const getPlacesWithSelectedAttributes = async (req, res, next) => {
    try {
        const places = await Place.find({}).select('placeName category subcategory state district status');
        res.status(200).json({
            success: true,
            places,
        });
    } catch (error) {
        next(error);
    }
};



