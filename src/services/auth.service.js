const authDao = require("../dao/auth.dao");
const crypto = require("crypto");

function hashPassword(password) {
  // SHA-1 base64 geeft ±28 tekens
  return crypto.createHash('sha1').update(password).digest('base64');
}

async function authenticate(username, password) {
  const staff = await authDao.findByUsername(username);
  if (!staff) return null;

  // hash het binnenkomende wachtwoord en vergelijk
  const candidateHash = hashPassword(password);

  // gebruik timingSafeEqual om leaks te voorkomen
  const match = crypto.timingSafeEqual(
    Buffer.from(candidateHash),
    Buffer.from(staff.password)
  );

  if (!match) return null;
  return staff;
}

function registerStaff(staff, callback) {
  try {
    const hash = hashPassword(staff.password);

    const staffWithHash = {
      ...staff,
      password: hash,
      address_id: 1,
      store_id: 1
    };

    authDao.createStaff(staffWithHash, callback);
  } catch (err) {
    callback(err);
  }
}

module.exports = {
  authenticate,
  registerStaff
};
