module.exports = [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];

module.exports = {
  load: {
    before: ['cors', 'responseTime', 'logger', 'query', 'body', 'session', 'favicon', 'public'],
    after: ['parser', 'router'],
  },
  settings: {
    cors: {
      enabled: true,
      origin: ['*'], // Allow all origins, or specify your frontend origin(s) here
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      headers: ['Content-Type', 'Authorization', 'Origin', 'X-Requested-With', 'Accept'],
    },
  },
};
