const express = require("express")

const router = express.Router()

const {redisAPI} = require("../controller/weatherController")



router.route('/').get(redisAPI)

module.exports = router