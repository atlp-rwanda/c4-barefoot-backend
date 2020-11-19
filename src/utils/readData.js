import roleServices from '../services/roles';

exports.getPermissionsObject = () => {
  /* read data from index.json file */
  const existingData = roleServices.readFile();

  /* converting the data from buffer to json format */
  const roles = JSON.parse(existingData);
  return roles;
};
