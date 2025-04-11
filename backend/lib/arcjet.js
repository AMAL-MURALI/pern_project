//rate limiting is the process of limiting the number of req from a user in 1 min

import arcjet ,{tokenBucket,shield,detectBot} from "@arcjet/node";

import 'dotenv/config'

export const  aj=arcjet({
   key:process.env.ARCJET_KEY,
   characteristics:["ip.src"],
   rules:[
       shield({mode:'LIVE'}),
       detectBot({
        mode:"LIVE",
        //ALLOW SEARCH ENGINE
        allow:["CATEGORY:SEARCH_ENGINE"]
       }),

    //RATE LIMITING
    tokenBucket({
        mode:"LIVE",
        refillRate:30,//refill 5 tokens
        interval:5,//seconds
        capacity:20//tokens
    })
   ]
})