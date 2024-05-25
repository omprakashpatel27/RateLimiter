# Rate Limiter

## Problem Statement 
Build a Rate Limiter that stops users from submitting to many requests. 

## Capacity Estimation 
Assumption : 1 Billion ( 10^9 ) user going to call the rate limiter , we are using userId, timestamp from each userId every post call , userId corresponds to 8 bytes & also we are tracking the counts the service is called which takes 4 bytes , let suppose we have 20 services , then amount of data needed to store is : 
10^9 * 20 * (8 + 4) = 240 GB of data.

## Where does the Rate Limiter go
Option 1 : Perform rate Limiting on each service 
Pro : No extra network calls required to perform rate limiting.
Cons : Application & rate limiting scaling are tightly coupled.

Option 2 : Dedicated Distributed rate limiter 
Pros : Shields application from large bursts of network calls
Cons : Introduces extra networking calls to api requests.

## Caching 
We consider Option 2 , so it require extra network calls, we can reduce it by using write back cache on load balancer.

## Database Choice 
we want both read & write to be as fast as possible and we don't have that much data to store , so use can use Redis/Memcached.

## Replication Choice 
we need our application to fault tolerant ,
1. Multi Leader Replication : could increase the write throughput, lower write load on each system, have to wait for anti entropy for counts to synchronize.  
2. Single Leader Replication : counts of requests on master are accurate, can do all reads on master

we go with single leader replication. 

## Rate Limiting Algorithms 
1. Token Bucketing
2. Leaky Bucket
3. Fixed Window Size
4. Sliding Window log

Here we used Fixed Window Size.

## High Level Design 
![image](https://github.com/omprakashpatel27/RateLimiter/assets/59342793/434c01c2-ac68-497e-8500-5283a424e364)


