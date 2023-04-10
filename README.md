# Node test

- To install application dependencies:
  - `yarn`
    - or
  - `npm i`
    - or
  - `pnpm i`
- To run this app locally

  - set in your .env variables:

        `  DATABASE_URL='mongodb://127.0.0.1:27017/node-test'schema=public"

    PORT=3333
    HOST=localhost`

  - Next step is run docker-compose file:
    - PS: this next step requires you to have Docker installed on your machine
      - `docker copose up`
  - Next step run script `dev`:
    - `yarn dev`
      - or
    - `npm run dev`
      - or
    - `pnpm run dev`

# Test:

    To run the tests you must run `yarn test` (or `npm run test` or `pnpm run test`)

# App Routes

    - Mock
      - POST /mocks
        - description:  should create mock data for api use;

    - Auth
      - POST /auth/login
        - description:  should authenticate and set a user logged in;
        - body: {
          email: string;
          password: string;
        }

    - Users
      - POST /users
        - description:  should create a new user;
        - body: {
          name: string;
          email: string;
          password: string;
        }

    - Products
      - GET /products
        - description: should return all products;
      - GET /products/:id
        - description: should return a unique product;
        - params: {
          _id: string;
        }
      - POST /products
        - description:  should create a new product;
        - body: {
          name: string;
          qty: number;
          price: number;
          categories?: string[];
        }
      - PATCH /products
        - description:  should update a product;
        - body: {
          name?: string;
          qty?: number;
          price?: number;
          categories?: string[];
        }
      - DELETE /products
        - description:  should delete a new product;
        - params: {
          _id: string;
        }

    - Category
      - GET /categories
        - description: should return all categories;
      - GET /categories/:id
        - description: should return a unique category;
        - params: {
          _id: string;
        }
      - POST /categories
        - description:  should create a new category;
        - body: {
          name: string;
          parent?: string;
        }
      - PATCH /categories
        - description:  should update a category;
        - body: {
          name: string;
          parent?: string;
        }
      - DELETE /categories
        - description:  should delete a new category;
        - params: {
          _id: string;
        }
