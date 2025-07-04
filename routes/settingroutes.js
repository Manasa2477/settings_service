const express = require("express");
const { APIS } = require("../config/constants");
const settingcontroller=require("../controllers/settingcontroller")
const router = express.Router();
router.use(APIS.SETTINGS.ENDPOINT.UPDATE_USER,settingcontroller.updateuser)
//updated router



module.exports=router;