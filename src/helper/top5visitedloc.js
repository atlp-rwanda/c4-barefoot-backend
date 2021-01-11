import models from '../models'

const top5VisitedLocation = async (req, res, next)=>{
    const locations = await models.Location.findAll({
        attributes: ['LocationName']
    })
    let locationArr = {}
    locations.forEach(location => {
        const name = location.LocationName
        if(locationArr.hasOwnProperty(name)){
            locationArr[name] = locationArr[name] + 1
        } else{
            locationArr[name] = 1
        }
    });
    let sortedLocations = []
    
    for( const key in locationArr){
        sortedLocations.push([key,locationArr[key]])
    }
    sortedLocations.sort(function(a, b) {
        return b[1] - a[1];
    });
    return sortedLocations
}
export default top5VisitedLocation