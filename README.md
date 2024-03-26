# Shopping API with Stripe JWT

This project implements a shopping API using JWT authentication and Stripe for payment processing.

## Project Structure

- .env
- .gitignore
- api
  - config
    - db_conf.js
  - middleware
    - verifyToken.js
  - models
    - Cart.js
    - Order.js
    - Product.js
    - User.js
  - routes
    - auth.js
    - cart.js
    - order.js
    - product.js
    - stripe.js
    - users.js
- app.js
- package-lock.json
- package.json
- server.js



## Description

- `.env`: Configuration file for environment variables. Make sure to configure your environment variables appropriately before running the application.
- `.gitignore`: Specifies intentionally untracked files to ignore.
- `api/`: Main directory containing the API code.
  - `config/`: Configuration files, including `db_conf.js` for database configuration.
  - `middleware/`: Custom middleware functions, such as `verifyToken.js` for JWT authentication.
  - `models/`: Data models for MongoDB collections (e.g., `Cart.js`, `Order.js`, `Product.js`, `User.js`).
  - `routes/`: Express route handlers for different API endpoints (e.g., `auth.js`, `cart.js`, `order.js`, `product.js`, `stripe.js`, `users.js`).
- `app.js`: Entry point of the application.
- `package-lock.json`: Automatically generated for any operations where npm modifies either the `node_modules` tree or `package.json`.
- `package.json`: Metadata file for the project, including dependencies and project configurations.
- `server.js`: Server setup and initialization.

## Usage

1. Ensure Node.js and npm are installed on your system.
2. Clone this repository.
3. Install dependencies using `npm install`.
4. Configure environment variables in the `.env` file.
5. Start the server using `npm start`.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvement, please feel free to open an issue or submit a pull request.


