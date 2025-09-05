
const requestCounts = new Map();
const WINDOW_SIZE = 15 * 60 * 1000; 
const MAX_REQUESTS = 100; 


// rate limter here... haha

export const rateLimiter = (req, res, next) => {
  const clientIP = req.ip || req.connection.remoteAddress;
  const now = Date.now();
  
  if (!requestCounts.has(clientIP)) {
    requestCounts.set(clientIP, { count: 1, resetTime: now + WINDOW_SIZE });
    return next();
  }
  
  const clientData = requestCounts.get(clientIP);
  
  if (now > clientData.resetTime) {
    requestCounts.set(clientIP, { count: 1, resetTime: now + WINDOW_SIZE });
    return next();
  }
  
  if (clientData.count >= MAX_REQUESTS) {
    return res.status(429).json({
      success: false,
      message: 'Too many requests. Please try again later.',
    });
  }
  
  clientData.count++;
  next();
};


export const errorHandler = (error, req, res, next) => {
  console.error('Error:', error);


  res.status(error.status || 500).json({
    success: false,
    message: error.message || 'Internal server error',
  });
};

export const requestLogger = (req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.path} - ${res.statusCode} - ${duration}ms`);
  });
  
  next();
};
