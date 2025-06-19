export class ProductManager {
  constructor(state, env) {
    this.state = state;
    this.env = env;
    this.products = [];
    this.hidden = new Set();
  }

  async fetch(request) {
    const url = new URL(request.url);
    const { pathname } = url;

    if (pathname === "/add" && request.method === "POST") {
      const data = await request.json();
      const id = crypto.randomUUID();
      const product = { id, ...data };
      this.products.push(product);
      return new Response(JSON.stringify({ success: true, product }), { status: 200 });
    }

    if (pathname.startsWith("/edit/") && request.method === "PUT") {
      const id = pathname.split("/")[2];
      const data = await request.json();
      const index = this.products.findIndex(p => p.id === id);
      if (index === -1) return new Response("Not found", { status: 404 });
      this.products[index] = { ...this.products[index], ...data };
      return new Response(JSON.stringify({ success: true, product: this.products[index] }), { status: 200 });
    }

    if (pathname.startsWith("/hide/") && request.method === "PUT") {
      const id = pathname.split("/")[2];
      this.hidden.add(id);
      return new Response(JSON.stringify({ success: true, hidden: Array.from(this.hidden) }), { status: 200 });
    }

    if (pathname.startsWith("/show/") && request.method === "PUT") {
      const id = pathname.split("/")[2];
      this.hidden.delete(id);
      return new Response(JSON.stringify({ success: true, hidden: Array.from(this.hidden) }), { status: 200 });
    }

    if (pathname === "/hidden" && request.method === "GET") {
      const hiddenProducts = this.products.filter(p => this.hidden.has(p.id));
      return new Response(JSON.stringify(hiddenProducts), { status: 200 });
    }

    if (pathname === "/products" && request.method === "GET") {
      const visibleProducts = this.products.filter(p => !this.hidden.has(p.id));
      return new Response(JSON.stringify(visibleProducts), { status: 200 });
    }

    if (pathname.startsWith("/product/") && request.method === "GET") {
      const id = pathname.split("/")[2];
      const product = this.products.find(p => p.id === id);
      if (!product) return new Response("Not found", { status: 404 });
      return new Response(JSON.stringify(product), { status: 200 });
    }

    return new Response("Not found", { status: 404 });
  }
}
