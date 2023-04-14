const MONGO_URL = process.env.MONGO_URL || undefined
const REDIS_URL = process.env.REDIS_URL || undefined

module.exports = {
  MONGO_URL,
  REDIS_URL,
}

// module.exports = {
//   MONGO_URL: 'mongodb://root:example@192.168.56.2:3456/todo',
//   REDIS_URL: 'redis://192.168.56.2:6379',
// }
