import { BestWeatherType } from "../../models/adminModels/bestWeatherType.js";
import ErrorHandler from "../../middelwares/error.js";


export const newWeather = async (req, res, next) => {
    try {
        const { bestWeather } = req.body;

        let checkWeather = await CategoryType.findOne({bestWeather});
        if(checkWeather) return next(new ErrorHandler("Weather already Exist", 404));

        await BestWeatherType.create({
            bestWeather,
        })

        res.status(201).json({
            success: true,
            message: "Weather Added Successfully",
        })
    } catch (error) {
        next(error)
    }
};


export const getWeather = async (req, res, next) => {
    try {
        const weathers = await BestWeatherType.find();
        res.status(201).json({
            success: true,
            weathers,
        })
    } catch (error) {
        next(error)
    }
};


export const updateWeather = async (req, res, next) => {
    try {
        const { weatherId } = req.params;
        const { bestWeather } = req.body;

        const weather = await BestWeatherType.findById(weatherId);
        if (!weather) return next(new ErrorHandler("Weather not Found", 404))

        if (bestWeather) {
            weather.bestWeather = bestWeather;
        }

        await weather.save();
        res.status(201).json({
            success: true,
            message: "Weather updated successfully",
            weather,
        });

    } catch (error) {
        next(error)
    }
};


export const deleteWeather = async (req, res, next) => {
    try {
        const { weatherId } = req.params;
        const weather = await BestWeatherType.findById(weatherId);

        if (!weather) return next(new ErrorHandler("Weather not Found", 404))

        await weather.deleteOne();

        res.status(201).json({
            success: true,
            message: "Weather Deleted"
        })
    } catch (error) {
        next(error)
    }
};