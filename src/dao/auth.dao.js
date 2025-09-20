const db = require('../util/db');
const logger = require('../util/logger');

function findByUsername(username) {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM staff WHERE username = ?",
      [username],
      function (err, results) {
        if (err) return reject(err);
        resolve(results[0]);
      }
    );
  });
}


function createStaff(staff, callback) {
  logger.debug(`DAO: createStaff ${JSON.stringify(staff)}`);

  db.query(
    `INSERT INTO staff (first_name, last_name, username, password, address_id, store_id)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [staff.first_name, staff.last_name, staff.username, staff.password, staff.address_id, staff.store_id],
    function (err, result) {
      if (err) {
        logger.error("DAO createStaff error: " + err.message);
        return callback(err);
      }
      callback(null, result.insertId);
    }
  );
}

module.exports = { 
    findByUsername,
    createStaff
 };
