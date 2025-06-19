export class ProductManager {
  constructor(state, env) {
    this.state = state;
    this.env = env;
    this.products = [];
  }

  async fetch(request) {
    const url = new URL(request.url);
    const pathname = url.pathname;

    if (request.method === 'POST' && pathname === '/add') {
      const data = await request.json();
      this.products.push(data);
      return new Response(JSON.stringify({ success: true, product: data }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (request.method === 'PUT' && pathname.startsWith('/edit/')) {
      const id = pathname.split('/edit/')[1];
      const data = await request.json();
      const index = this.products.findIndex(p => p.id === id);
      if (index !== -1) {
        this.products[index] = { ...this.products[index], ...data };
        return new Response(JSON.stringify({ success: true, product: this.products[index] }), {
          headers: { 'Content-Type': 'application/json' },
        });
      } else {
        return new Response(JSON.stringify({ error: 'Product not found' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    }

    if (request.method === 'GET' && pathname === '/products') {
      return new Response(JSON.stringify(this.products), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response('Not Found', { status: 404 });
  }
}
