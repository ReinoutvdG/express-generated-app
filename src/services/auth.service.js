const authDao = require("../dao/auth.dao");
const bcrypt = require("bcrypt");

async function authenticate(username, password) {
  const staff = await authDao.findByUsername(username);
  if (!staff) return null;

  const match = await bcrypt.compare(password, staff.password);
  if (!match) return null;

  return staff;
}


function registerStaff(staff, callback) {
  // Hash het wachtwoord voordat het in de DB gaat
  bcrypt.hash(staff.password, 10, (err, hash) => {
    if (err) return callback(err);

    const staffWithHash = {
      ...staff,
      password: hash
    };

    authDao.createStaff(staffWithHash, callback);
  });
}

module.exports = { 
    authenticate,
    registerStaff
};
