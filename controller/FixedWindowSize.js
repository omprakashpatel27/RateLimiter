const Redis = require('ioredis');
const redis = new Redis();

const saveData = async (count, LIMIT, timeStamp, currentStartTime, currentEndTime) => {

    timeStamp = new Date(timeStamp);

    if(count >= LIMIT) return "FAILED!";

    if(timeStamp.getTime() >= currentStartTime.getTime() && timeStamp.getTime() <= currentEndTime.getTime()){

        const newCurrentData = {
            count : count + 1,
            currentStartTime : currentStartTime,
            currentEndTime : currentEndTime
        }

        // SAVE DATA TO REDIS
        await redis.set('currentData', JSON.stringify(newCurrentData));

        return "Success";
    }

    return "FAILED!";
}

const FixedWindowSize = async (timeStamp) => {
    let count = 0, currentStartTime = new Date(), currentEndTime = new Date();
    const LIMIT = 5 // MAX_LIMIT FOR ALLOW SERVERS CALL  

    // GET DATA FROM REDIS

    await redis.get('currentData',(err, result) =>{
        if(!result){
            currentStartTime = new Date();
            currentEndTime = new Date(currentStartTime.getTime() + 60 * 1000);
            count = 0;
        }
        else{
            result = JSON.parse(result);
            count = result.count;
            currentStartTime = new Date(result.currentStartTime);
            currentEndTime = new Date(result.currentEndTime);
        }

    })

    return saveData(count, LIMIT, timeStamp,currentStartTime,currentEndTime);

}
module.exports = FixedWindowSize;