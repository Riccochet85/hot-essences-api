# Hot-Essences API

This project is a Cloudflare Worker with Durable Object storage for managing a product inventory system.

## Features

- REST API endpoints for product management
- Durable Object for persistent state
- Swagger UI for API testing

## Files

- `index.js`: Main Worker logic
- `durable-object.js`: Durable Object class
- `swagger.json`: OpenAPI spec
- `wrangler.toml`: Deployment config

## Deployment

1. Upload files to Cloudflare Worker via dashboard
2. Bind Durable Object:
   - Binding name: `PRODUCT_MANAGER`
   - Class name: `ProductManager`
3. Set compatibility date and deploy
