import accommodations from './accommodations';
import userService from './user.service';


const checkAccomodationData= (accommodation)=>{
  return accommodation ? accommodation.dataValues : { error: 'No info on this accomodation'}
}

export const findTripAccomodations= async (travel) =>{
if( travel.Trip.length > 0 && travel.Trip[0].dataValues.accommodationId !== null){
    const accommodationInfo = await Promise.all(travel.Trip.map( async (trip) =>{

      const accommodation= await accommodations.getSingleAccommodation(trip.dataValues.accommodationId);
      
      return checkAccomodationData(accommodation);
    }))
    return accommodationInfo;

    
  }

}

export const findTravelUserInfo= async (travel)=>{

    const user= await userService.getUserById(travel.userId)
    const userInfo= {
      username: user.dataValues.username,
      firstName: user.dataValues.first_name,
      lastName: user.dataValues.last_name,
      profilePpicture: user.dataValues.profile_picture
    }
    return userInfo;
}
