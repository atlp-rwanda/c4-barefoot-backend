import { roles } from '../services/roles';
import findManager from '../services/findManager';
// import manager from '../services/findManager';

const assignUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10);
    const storedRole = await roles();
    storedRole.filter(async (rol) => {
      if (rol.name === 'manager') {
        // console.log(rol.id);
        const data = rol.id;
        // console.log(data);
        const manager = await findManager(data, page);

        return res.status(200).json({
          status: 200, message: 'available managers', page, managers: manager
        });
      }
    });
  } catch (error) {
    console.log(error.message);
  }

//   console.log(manager);
};
export default assignUsers;
