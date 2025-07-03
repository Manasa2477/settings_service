const { DB } = require("../config/dbstoredprocedures");
const sql = require("mssql");
const {
  Validatephno,
  Validationemail,
  Validatepin,
} = require("../config/validation");
const { hashnumber } = require("../config/crypto");
const { checkuserid } = require("../config/checkuserid");
const { connect } = require("../config/sqlserver");
const updateuser = async (req, res, next) => {
  try {
    const userId = req.headers["x-user-id"];
    console.log("user details", userId);
    const user = await checkuserid(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const pool = await connect();
    const { phoneNumber, email } = req.body;
    var hashedPhonenumber = null;
    if (phoneNumber) {
      if (!Validatephno(phoneNumber)) {
        return res.json({
          message: " Getting Invalid phone number",
        });
      } else {
        hashedPhonenumber = hashnumber(phoneNumber);
      }
    }
    if (email) {
      if (!Validationemail(email)) {
        return res.json({ message: "Invaild email" });
      }
    }

    const result = await pool
      .request()
      .input("phoneNumber", sql.VarChar, hashedPhonenumber)
      .input("userId", sql.VarChar, userId)
      .input("email", sql.VarChar, email)
      .execute(DB.UPDATE_USER);
    if (result.rowsAffected[0] === 1) {
      return res.json({
        message: "User updated successfully",
      });
    } else {
      return res.status(500).json({ message: "User updation failed" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  updateuser,
};
