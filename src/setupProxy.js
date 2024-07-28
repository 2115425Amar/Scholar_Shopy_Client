const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://ecommerce-2-mern.onrender.com',
      changeOrigin: true,
    })
  );
};