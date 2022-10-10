const axios = require('axios')
const redis = require('redis')

const redisClient = redis.createClient()

//for expiration date
const EXPIRATION = 60


const redisAPI = async(req,res)=>{
    redisClient.get("weatherdata", async(error, weatherdata)=>{

        if(error){
            console.log(error)
        }

        if (weatherdata != null){
            return res.json(JSON.parse(weatherdata))
        }else{
            const {data} = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=Chicago&appid=63bdb51dde03c0c24aff2141d65d6fe5`

            )
            redisClient.setex("weatherdata",EXPIRATION,JSON.stringify(data))
               res.json(data)
            
            
        }
    })



}


module.exports = {redisAPI}