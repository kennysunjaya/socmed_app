import Redis from "ioredis";

const redis = new Redis({
  port: 18809, // Redis port
  host: "redis-18809.c292.ap-southeast-1-1.ec2.redns.redis-cloud.com", // Redis host
  username: "default", // needs Redis >= 6
  password: "3gpdU34MGm5IOpJ7KhckW5fa1lvtBmvl",
  db: 0, // Defaults to 0
});

export default redis;
