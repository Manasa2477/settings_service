const { connect, sql } = require("./sqlserver");

 const checkuserid=async(userId)=>{
    const pool = await connect();
    const userDetails = await pool
      .request()
      .input("userId", sql.VarChar, userId)
      // .query(`
      //  SELECT * FROM USERs WHERE userId = @userId
      // `);
      .execute(DB.GETCHECKID)
    return userDetails;
}
module.exports={checkuserid};