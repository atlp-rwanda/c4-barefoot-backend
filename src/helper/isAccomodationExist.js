import models from '../models'
export async function isAccommodationExist(id, next) {
    var result = ''
    await models.Accommodation.findByPk(id)
    .then((data) =>{
        result = data
    })
    .catch((err) => {
        result = null
    })
    return result
}