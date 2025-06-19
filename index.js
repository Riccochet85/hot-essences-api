export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const id = env.PRODUCT_MANAGER.idFromName("global");
    const stub = env.PRODUCT_MANAGER.get(id);
    return stub.fetch(request);
  }
};
