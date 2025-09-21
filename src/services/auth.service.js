const authDao = require("../dao/auth.dao");
const crypto = require("crypto");

function hashPassword(password) {
  // SHA-1 base64 encriptying
  // niet het beste maar de db heeft standaard een pw limiet van 40 tekens
  // dit is dus voor het aantonen dat het beveiligt is maar als ik geen aangeleverde database had zou ik bcrypt gebruiken :/
  return crypto.createHash('sha1').update(password).digest('base64');
}

async function authenticate(username, password) {
  const staff = await authDao.findByUsername(username);
  if (!staff) return null;

  // hash het binnenkomende wachtwoord en vergelijk
  const candidateHash = hashPassword(password);

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
