const http = require('http');

function makeRequest() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 5173,
      path: '/',
      method: 'GET',
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          data: data,
          headers: res.headers,
        });
      });
    });

    req.on('error', reject);
    req.end();
  });
}

makeRequest().then((response) => {
  console.log('Status:', response.status);
  console.log('Has root element:', response.data.includes('id="root"'));
  console.log('Has Chess Streamers title:', response.data.includes('Chess Streamers'));
  console.log('Content length:', response.data.length);
  
  // Check for components
  console.log('Has StreamerList:', response.data.includes('streamer-list'));
  console.log('Has Pagination:', response.data.includes('pagination'));
  
  process.exit(0);
}).catch((err) => {
  console.error('Error:', err.message);
  process.exit(1);
});
