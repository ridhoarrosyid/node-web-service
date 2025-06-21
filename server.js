const http = require("http");

const requestListener = (request, response) => {
  response.setHeader("Content-Type", "application/json");
  response.setHeader("Powered-By", "Node.js");
  response.statusCode = 200;

  const { method, url } = request;

  if (url === "/") {
    if (method === "GET") {
      response.statusCode = 200;
      response.end(JSON.stringify({ message: "Ini adalah homepage" }));
    } else {
      response.statusCode = 400;
      response.end(
        JSON.stringify({
          message: "Halaman tidak dapat diakses dengan " + method + " request",
        })
      );
    }
  } else if (url === "/about") {
    if (method === "GET") {
      response.statusCode = 200;
      response.end(
        JSON.stringify({ message: "Halo! Ini adalah halaman about" })
      );
    } else if (method === "POST") {
      let body = [];
      request.on("data", (chuck) => {
        body.push(chuck);
      });
      request.on("end", () => {
        body = Buffer.concat(body).toString();
        const { name } = JSON.parse(body);
      });
      response.statusCode = 200;
      response.end(
        JSON.stringify({
          message: "Halo, " + name + "! Ini adalah halaman about",
        })
      );
    } else {
      response.statusCode = 400;
      response.end(
        JSON.stringify({
          message: "Halaman tidak dapat diakses dengan " + method + " request",
        })
      );
    }
  } else {
    response.statusCode = 404;
    response.end(JSON.stringify({ message: "HALAMAN TIDAK DITEMUKAN" }));
  }

  //   switch (method) {
  //     case "GET":
  //       response.end("<h1>Hello HTTP Server GET!</h1>");
  //       break;
  //     case "POST":
  //       let body = [];
  //       request.on("data", (chuck) => {
  //         body.push(chuck);
  //       });
  //       request.on("end", () => {
  //         body = Buffer.concat(body).toString();
  //         const { name } = JSON.parse(body);
  //         response.end(`<h1>hi! ${name}</h1>`);
  //       });
  //       break;

  //     default:
  //       response.end("<h1>Hello World</h1>");
  //   }
};

const server = http.createServer(requestListener);

const port = 5000;
const host = "localhost";
server.listen(port, host, () => {
  console.log(`Server berjalan di http://${host}:${port}`);
});
