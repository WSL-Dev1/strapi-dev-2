module.exports = {
  // Middleware order
  load: {
    before: ['responseTime', 'logger', 'query', 'body', 'session', 'favicon', 'public'],
    after: ['parser', 'router'],
  },
  // Middleware settings
  settings: {
    cors: {
      enabled: true,
      origin: ['*'], // Allow all origins, or specify your frontend origin(s) here
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      headers: ['Content-Type', 'Authorization', 'Origin', 'X-Requested-With', 'Accept'],
    },
    responseTime: {
      enabled: false,
    },
    logger: {
      enabled: true,
      level: 'info',
    },
    query: {
      enabled: true,
    },
    body: {
      enabled: true,
    },
    session: {
      enabled: true,
    },
    favicon: {
      enabled: true,
    },
    public: {
      enabled: true,
    },
    parser: {
      enabled: true,
    },
    router: {
      enabled: true,
    },
  },
};
