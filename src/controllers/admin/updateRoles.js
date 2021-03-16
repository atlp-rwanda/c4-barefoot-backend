import roleServices from '../../services/roles';
import readData from '../../utils/readData';
import models from '../../models'

const updateRoles = async (req, res, next) => {
    const id =req.params.id
    const requestData={name:'',description:''}
    requestData.name = req.body.role;
    requestData.description = req.body.description;
    const roles = readData.getPermissionsObject();
    try {
    const role= await models.Role.findOne({where:{id:id}});
    let perm=null;
    if (roles.hasOwnProperty(role.name) && role.name != requestData.name) {
        perm=roles[role.name];
        if(delete roles[role.name]){
          roles[requestData.name]=perm;
        };
    }
    const update = await models.Role.update(requestData,{where:{id:id}});  
    const dataJson = JSON.stringify(roles, null, 2);
    roleServices.saveInFile(dataJson);
    return res.send({message:"update successfully" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  
  };

  export default updateRoles;