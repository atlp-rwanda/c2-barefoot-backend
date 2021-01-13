import { roles } from '../services/roles';
import findManager from '../services/findManager';

const assignUsers = async (req, res, next) => {
  try {
    const storedRole = await roles();
    storedRole.filter(async (rol) => {
      if (rol.name === 'manager') {
        const data = rol.id;
        const manager = await findManager(data);

        return res.status(200).json({
          status: 200, message: 'available managers', managers: manager
        });
      }
    });
  } catch (error) {
    next(error);
  }
};
export default assignUsers;
