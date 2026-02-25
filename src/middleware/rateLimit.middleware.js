const redisClient = require("../config/redis");

const rateLimit = async (req, res, next) => {
  try {
    const key = `rate_limit:${req.ip}`;

    const requests = await redisClient.incr(key);

    // First request → set expiry (60 sec window)
    if (requests === 1) {
      await redisClient.expire(key, 60);
    }

    // Limit: 10 requests per minute
    if (requests > 10) {
      return res.status(429).json({
        success: false,
        message: "Too many requests. Try again later."
      });
    }

    next();
  } catch (error) {
    console.log(error);
    next();
  }
};

module.exports = rateLimit;