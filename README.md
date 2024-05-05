# qp-assessment

### Grocery Ordering System API Documentation

#### Overview

## This document details the API endpoints available for a grocery ordering system, covering functionalities for both users and administrators. The system is Dockerized for easy deployment and scaling, and all routes are protected by Bearer token authentication.

### General Information

- **Authentication:** All endpoints require Bearer token authentication. Ensure to include an authorization header with a valid token in each request, you can get one by using the login endpoint (/login).
- **Deployment:** The application is containerized using Docker, facilitating easy setup and scalability.

---

### User Routes

#### 1. List Available Grocery Items

- **Method:** GET
- **Endpoint:** `/groceries`
- **Description:** Retrieves a list of all grocery items with an inventory count greater than zero.
- **Response:** JSON array of grocery items.

#### 2. Place an Order

- **Method:** POST
- **Endpoint:** `/order`
- **Body:**
  ```json
  {
  	"items": [
  		{
  			"groceryItemId": 1,
  			"quantity": 2
  		}
  	]
  }
  ```
- **Validation Schema:** Checks that each item includes a valid `groceryItemId` and a positive `quantity`.
- **Description:** Allows a user to place an order with multiple grocery items.
- **Response:** Details of the placed order.

---

### Admin Routes

#### 1. Add Grocery Item

- **Method:** POST
- **Endpoint:** `/add-grocery-item`
- **Body:**
  ```json
  {
  	"name": "Apple",
  	"price": 0.99,
  	"inventory_count": 150
  }
  ```
- **Validation Schema:** Ensures name is 3-100 characters, price is positive, and inventory count is a non-negative integer.
- **Description:** Allows an admin to add a new grocery item to the system.
- **Response:** Details of the added grocery item.

#### 2. View All Grocery Items

- **Method:** GET
- **Endpoint:** `/grocery-items`
- **Description:** Retrieves a list of all grocery items regardless of inventory status.
- **Response:** JSON array of all grocery items.

#### 3. Remove Grocery Item

- **Method:** DELETE
- **Endpoint:** `/grocery-item/:id`
- **Description:** Allows an admin to remove a grocery item from the system.
- **Response:** Status of the removal operation.

#### 4. Update Grocery Item

- **Method:** PUT
- **Endpoint:** `/grocery-item/:id`
- **Body:**
  ```json
  {
  	"name": "Fresh Apple",
  	"price": 1.09
  }
  ```
- **Validation Schema:** At least one of the fields (name or price) must be provided.
- **Description:** Allows an admin to update the details of an existing grocery item.
- **Response:** Updated details of the grocery item.

#### 5. Manage Inventory Level

- **Method:** PATCH
- **Endpoint:** `/grocery-item/:id/inventory`
- **Body:**
  ```json
  {
  	"inventory_count": 100
  }
  ```
- **Validation Schema:** Ensures the inventory count is a non-negative integer.
- **Description:** Allows an admin to update the inventory level of a grocery item.
- **Response:** Updated inventory details of the grocery item.

---

### Auth Routes

#### 1. User Login

- **Method:** POST
- **Endpoint:** `/login`
- **Body:**
  ```json
  {
  	"email": "user@example.com",
  	"password": "Securepassword@123",
  	"account_type": "user"
  }
  ```
- **Validation Schema:** Checks for valid email format, password criteria, and account type (user/admin).
- **Description:** Authenticates a user and returns a token.
- **Response:** Bearer token for authentication.

#### 2. User Signup

- **Method:** POST
- **Endpoint:** `/sign-up`
- **Body:**
  ```json
  {
  	"first_name": "Ritik",
  	"last_name": "Banger",
  	"email": "newuser@example.com",
  	"password": "newSecurePassword@123",
  	"account_type": "admin"
  }
  ```
- **Validation Schema:** Validates names, email, password, and account type.
- **Description:** Registers a new user and returns a token.
- **Response:** Bearer token for newly registered user.

---

### Note

To run: docker-compose up
