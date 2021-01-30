import getWeatherDataInfo from '../controllers/weatherApi';
import location  from '../controllers/locations';

export const isAllowedToView = async (req, res, next)=>{
    location = req.body.location;
    try{
        const weatherInfo= await getWeatherDataInfo(req, res);
        if(weatherInfo){
            locationData = await location({city:weatherInfo.city ,location:location});  
        }
    }
    catch( error ){
        next (error);
    }
}