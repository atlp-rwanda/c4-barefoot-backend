import { createNotification } from '../services/notification';

const assignNotification = async (req, res, next) => {
    const userId = req.params.id;
    const { manager_id } = req.body;
    const newNotificantion = {
        user_id: userId,
        title: 'Assign user to manager',
        message: `You were assigned to manager of ${manager_id}`
        };
   const notification = await createNotification(newNotificantion); 
}
export default createNotification;
