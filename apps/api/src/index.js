const http = require("http");

const PORT = process.env.PORT || 4000;

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Access-Control-Allow-Origin", "*");

  if (req.url === "/health") {
    res.writeHead(200);
    res.end(
      JSON.stringify({
        status: "ok",
        service: "storia-food-api",
        message: "Backend API sẵn sàng cho Buổi 4",
        timestamp: new Date().toISOString(),
      })
    );
    return;
  }

  res.writeHead(200);
  res.end(
    JSON.stringify({
      name: "Storià Food API",
      version: "1.0.0",
      endpoints: ["/health"],
    })
  );
});

server.listen(PORT, () => {
  console.log(`[storia-food-api] Server running on http://localhost:${PORT}`);
});
