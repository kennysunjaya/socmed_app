import Redis from "ioredis";

const redis = new Redis({
  port: 18809,
  host: "redis-18809.c292.ap-southeast-1-1.ec2.redns.redis-cloud.com", // Redis host
  username: "default",
  password: "3gpdU34MGm5IOpJ7KhckW5fa1lvtBmvl",
  db: 0,
});

export default redis;
