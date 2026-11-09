import 'dotenv/config';
import './app.js';
import http from 'http';

setTimeout(() => {
  const req = http.request('http://localhost:3000/api/auth/login', {
    method: 'OPTIONS',
    headers: {
      'Origin': 'http://localhost:5173',
      'Access-Control-Request-Method': 'POST'
    }
  }, (res) => {
    console.log('STATUS:', res.statusCode);
    console.log('ALLOW-ORIGIN:', res.headers['access-control-allow-origin']);
    console.log('ALLOW-METHODS:', res.headers['access-control-allow-methods']);
    process.exit(0);
  });
  req.on('error', (err) => {
    console.error('ERROR:', err);
    process.exit(1);
  });
  req.end();
}, 1000);

