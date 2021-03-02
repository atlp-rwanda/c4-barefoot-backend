import accommodations from './accommodations';
import userService from './user.service';


export const findTripAccomodations= async (travel) =>{
if( travel.Trip.length > 0 && travel.Trip[0].dataValues.accommodationId !== null){
    const accommodationInfo = await Promise.all(travel.Trip.map( async (trip) =>{

      const accommodation= await accommodations.getSingleAccommodation(trip.dataValues.accommodationId);
      if( accommodation ){
        return accommodation.dataValues
      }
      else{
        return { error: 'No info on this accomodation'}
      }
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
