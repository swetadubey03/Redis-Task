const axios = require('axios');
const redis = require('redis')

//for expiration date
const EXPIRATION = 20

const redisClient = redis.createClient()



const redisAPI = async(req,res)=>{
    redisClient.get("weatherdata", async(error, weatherdata)=>{
        
        if(error){
            console.log(error)
        }

        if (weatherdata != null){
            return res.json(JSON.parse(weatherdata))
        }else{
            const {weatherdata} = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=London&appid=63bdb51dde03c0c24aff2141d65d6fe5`

            )
            redisClient.setEx("weatherdata", EXPIRATION, JSON.stringify(weatherdata))
            res.json(weatherdata)
        }
    })



}


module.exports = {redisAPI}