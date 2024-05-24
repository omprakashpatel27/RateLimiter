const Redis = require('ioredis');
const redis = new Redis();

const saveData = async (count, currentStartTime, currentEndTime) => {
    const newCurrentData = {
        count : 0,
        currentStartTime : currentStartTime,
        currentEndTime : currentEndTime
    }

    await redis.set('currentData',JSON.stringify(newCurrentData));
}

const UpdateRedisFixedWindow = async () =>{
    let count, currentStartTime, currentEndTime;

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
            currentStartTime = new Date(currentStartTime.getTime() + 60 * 1000);
            currentEndTime = new Date(result.currentEndTime);
            currentEndTime = new Date(currentEndTime.getTime() + 60 * 1000);
        }

        // SAVE DATA TO REDIS 
        saveData(count, currentStartTime,currentEndTime);
    })
}

module.exports = UpdateRedisFixedWindow;