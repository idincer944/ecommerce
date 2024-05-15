# E-Commerce Backend Application

Welcome to the E-Commerce Backend Application! This project provides a simple yet robust backend solution for an E-Commerce platform, allowing for efficient management of products, orders, and users.

## Features

- **Product Management**: Easily add, update, and delete products with comprehensive CRUD operations.
- **Order Management**: Handle orders seamlessly, including order creation, cancellation, and status updates.
- **User Authentication**: Ensure secure access to the application with user authentication and authorization mechanisms.
- **Database Integration**: Utilize MySQL database for persistent data storage, managed efficiently with Prisma ORM.
- **Scalability**: Built with scalability in mind, allowing for future expansion and additional features.

## Technologies Used

- **Node.js**: A JavaScript runtime environment for building scalable and efficient server-side applications.
- **Express.js**: A minimalist web framework for Node.js, providing a robust set of features for building web applications.
- **TypeScript**: A superset of JavaScript that adds static typing to the language, enhancing code organization and error detection.
- **Prisma ORM**: A modern database toolkit for Node.js and TypeScript, simplifying database interactions and ensuring type safety.
- **MySQL**: A popular open-source relational database management system, used for storing and retrieving application data.

## Getting Started

To run the application locally, follow these steps:

1. Clone this repository to your local machine.
2. Install dependencies by running `npm install`.
3. Set up your MySQL database and update the connection details in the `.env` file.
4. Start the application by running `npm start`.
5. Access the application endpoints using a REST client or browser.

## Endpoints

### Product Routes
- **GET /products**: Retrieve a list of all products.
- **GET /products/:id**: Retrieve a specific product by ID.
- **POST /products**: Create a new product.
- **PUT /products/:id**: Update an existing product.
- **DELETE /products/:id**: Delete a product by ID.

### Order Routes
- **POST /orders**: Create a new order.
- **PUT /orders/:id/cancel**: Cancel an existing order.
- **GET /users/:id/orders**: Retrieve orders for a specific user.
- **GET /orders**: Get a list of all orders.
- **GET /orders/:id**: Get order details by ID.
- **GET /orders/index**: Get a list of all orders. (Admin)
- **GET /orders/users/:id**: Get orders for a specific user by ID. (Admin)
- **PUT /orders/status/:id**: Change the status of an order by ID. (Admin)

### User Routes
- **POST /users/address**: Add a new address for the user.
- **DELETE /users/address/:id**: Delete an address by ID.
- **GET /users/address**: Get a list of all addresses for the user.
- **PUT /users**: Update user profile details.
- **GET /users/:id**: Get user details by ID.
- **GET /users**: Get a list of all users.
- **PUT /users/role/:id**: Change user role by ID.

### Cart Routes
- **POST /carts**: Add a product to the cart.
- **PUT /carts/:id**: Change the quantity of a product in the cart.
- **DELETE /carts/:id**: Delete a product from the cart by ID.
- **GET /carts**: Get the user's cart.

## Contact

For inquiries or support, please contact at [idincer944@gmail.com].
