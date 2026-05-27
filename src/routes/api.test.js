const { describe, it, before, after, beforeEach } = require("node:test");
const assert = require("node:assert");
const http = require("node:http");
const { app } = require("../server");

let server;
const BASE = "http://localhost:3001";

function request(method, path, body) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE);
    const options = {
      method,
      hostname: url.hostname,
      port: url.port,
      path: url.pathname,
      headers: { "Content-Type": "application/json" },
    };
    const req = http.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        resolve({ status: res.statusCode, body: JSON.parse(data) });
      });
    });
    req.on("error", reject);
    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
}

before(() => {
  return new Promise((resolve) => {
    server = app.listen(3001, resolve);
  });
});

after(() => {
  return new Promise((resolve) => {
    server.close(resolve);
  });
});

describe("Menu API", () => {
  it("GET /api/menu returns all menu items", async () => {
    const res = await request("GET", "/api/menu");
    assert.strictEqual(res.status, 200);
    assert.ok(Array.isArray(res.body));
    assert.ok(res.body.length > 0);
  });

  it("GET /api/menu/mains returns only mains", async () => {
    const res = await request("GET", "/api/menu/mains");
    assert.strictEqual(res.status, 200);
    assert.ok(res.body.every((item) => item.category === "mains"));
  });

  it("GET /api/menu/unknown returns 404", async () => {
    const res = await request("GET", "/api/menu/unknown");
    assert.strictEqual(res.status, 404);
  });
});

describe("Cart API", () => {
  beforeEach(async () => {
    const cartRes = await request("GET", "/api/cart");
    for (const item of cartRes.body.items) {
      await request("DELETE", `/api/cart/${item.cartId}`);
    }
  });

  it("POST /api/cart adds an item", async () => {
    const res = await request("POST", "/api/cart", { menuItemId: 1 });
    assert.strictEqual(res.status, 201);
    assert.strictEqual(res.body.name, "Grilled Salmon");
  });

  it("GET /api/cart returns cart with total", async () => {
    await request("POST", "/api/cart", { menuItemId: 1 });
    const res = await request("GET", "/api/cart");
    assert.strictEqual(res.status, 200);
    assert.ok(res.body.items.length > 0);
    assert.ok(typeof res.body.total === "number");
  });

  it("POST /api/cart with invalid item returns 404", async () => {
    const res = await request("POST", "/api/cart", { menuItemId: 999 });
    assert.strictEqual(res.status, 404);
  });

  it("DELETE /api/cart/:id removes an item", async () => {
    const addRes = await request("POST", "/api/cart", { menuItemId: 2 });
    const res = await request("DELETE", `/api/cart/${addRes.body.cartId}`);
    assert.strictEqual(res.status, 200);
  });

  it("POST /api/cart/checkout completes order", async () => {
    await request("POST", "/api/cart", { menuItemId: 1 });
    const res = await request("POST", "/api/cart/checkout");
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.body.status, "confirmed");
    assert.ok(res.body.orderId);
  });

  it("POST /api/cart/checkout with empty cart returns 400", async () => {
    const res = await request("POST", "/api/cart/checkout");
    assert.strictEqual(res.status, 400);
  });
});
