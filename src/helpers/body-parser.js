function bodyParser(request, callback) {
  let body = '';

  request.on('data', (chunk) => {
    body += chunk;
  });

  request.on('end', () => {
    const parsedBody = JSON.parse(body);
    request.body = parsedBody;
    callback();
  });
}

module.exports = bodyParser;
