import { createClient, RedisClientType } from 'redis';

let redisClient: RedisClientType | undefined;

export async function getRedisClient(): Promise<RedisClientType> {
  const redisUrl = process.env.REDIS_URL;

  if (!redisUrl) {
    throw new Error('❌ Missing REDIS_URL. Make sure it’s set in your runtime environment.');
  }

  if (!redisClient || !redisClient.isOpen) {
    redisClient = createClient({ url: redisUrl });
    redisClient.on('error', (err) => console.error('Redis Client Error:', err));
    await redisClient.connect();
  }

  return redisClient;
}
