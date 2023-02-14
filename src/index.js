const http = require('node:http');
const { URL } = require('node:url');
const routes = require('./routes');

const server = http.createServer((request, response) => {
  const parsedUrl = new URL(`http://localhost:3000${request.url}`);

  console.log(
    `Request method: ${request.method} | Endpoint: ${parsedUrl.pathname}`
  );

  let { pathname } = parsedUrl;
  let id = null;
  const splitEndpoint = pathname.split('/').filter(Boolean);

  if (splitEndpoint.length > 1) {
    pathname = `/${splitEndpoint[0]}/:id`;
    id = splitEndpoint[1];
  }

  console.log({
    pathname,
    splitEndpoint,
    id
  })

  const route = routes.find(
    (route) => route.endpoint === pathname && route.method === request.method
  );

  if (route) {
    request.query = Object.fromEntries(parsedUrl.searchParams);
    request.params = { id };
    route.handler(request, response);
  } else {
    response.writeHead(404, {
      'Content-Type': 'text/html',
    });
    response.end(`Cannot ${request.method} ${pathname}`);
  }
});

server.listen(3000, () =>
  console.log('Server started at http://localhost:3000')
);
