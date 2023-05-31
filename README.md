# Inventory App

This is a simple inventory management application that allows users to create, update, and delete products in their inventory. It provides a user interface to interact with the backend API for managing products.

## Features

- User authentication: Users can sign up, log in, and log out to access their inventory.
- Create product: Users can add new products to their inventory with details such as name, category, quantity, price, description, and an optional image.
- Update product: Users can edit and update the details of existing products in their inventory.
- Delete product: Users can remove products from their inventory.
- View product: Users can view the details of a specific product in their inventory.
- List products: Users can see a list of all the products in their inventory.

## Technologies Used

- Frontend:
  - HTML, CSS, JavaScript
  - React.js: A JavaScript library for building user interfaces.
  - Redux: A state management library for React.js applications.
  - Axios: A promise-based HTTP client for making API requests.

- Backend:
  - Node.js: A JavaScript runtime for server-side development.
  - Express: A web application framework for Node.js.
  - MongoDB: A NoSQL database for storing product and user data.
  - Mongoose: A MongoDB object modeling tool for Node.js.
  - JSON Web Tokens (JWT): Used for user authentication and authorization.
  - bcrypt.js: A library for hashing user passwords.

## Installation and Setup

1. Clone the repository: `git clone https://github.com/KmKalpana/Inventory-App.git`
2. Install dependencies:
   - Navigate to the backend directory: `cd backend` and run `npm install`.
   - Navigate to the frontend directory: `cd frontend` and run `npm install`.
3. Configure environment variables:
   - In the backend directory, create a `.env` file and set the following variables:
     ```
     PORT=<port-number>
     MONGODB_URI=<mongodb-uri>
     JWT_SECRET=<jwt-secret>
     ```
4. Start the development server:
   - In the backend directory, run `npm start` to start the Node.js server.
   - In the frontend directory, run `npm start` to start the React development server.
5. Access the application:
   - Open a web browser and visit `http://localhost:<port-number>` to access the app.

## API Endpoints

- `POST /api/products`: Create a new product.
- `GET /api/products`: Get a list of all products.
- `GET /api/products/:id`: Get a specific product by ID.
- `PATCH /api/products/:id`: Update a specific product by ID.
- `DELETE /api/products/:id`: Delete a specific product by ID.
- `POST /api/users/login`: User login.
- `POST /api/users/register`: User registration.

## Folder Structure

- `backend`: Contains the backend server code.
- `frontend`: Contains the frontend React application code.
- `models`: Defines the Mongoose schemas for the database models.
- `controllers`: Implements the business logic for handling requests.
- `middlewares`: Contains custom middleware functions.
- `utils`: Utility functions, such as file upload.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
