import { createClient, RedisClientType } from 'redis';

let redisClient: RedisClientType | undefined;

export async function getRedisClient(): Promise<RedisClientType> {
  if (!redisClient || !redisClient.isOpen) {
    const redisUrl = process.env.REDIS_URL;
    if (!redisUrl) {
      throw new Error('REDIS_URL is not defined in the environment variables.');
    }

    redisClient = createClient({ url: redisUrl });
    redisClient.on('error', (err) => console.error('Redis Client Error', err));
    await redisClient.connect();
  }
  return redisClient;
}
