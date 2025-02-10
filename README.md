# Customer-Retailer Relation Management System

## Overview
The **Customer-Retailer Relation Management System** is a web-based platform designed to ensure transparency in tracking orders and complaints between customers and retailers. The system provides a seamless interaction between both parties, allowing efficient data management and communication.

## Features
- Transparent tracking of orders and complaints
- User-friendly frontend built with **HTML & CSS**
- **Multiple Web Pages** designed for smooth navigation
- **MySQL Database** integration for efficient data management
- **Express.js** used as the backend framework to connect the frontend with the database

## Tech Stack
- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Express.js
- **Database:** MySQL
- **Server:** Node.js

## Installation & Setup
### Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/)
- [MySQL](https://www.mysql.com/)

### Steps to Run the Project
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/customer-retailer-crm.git
   ```
2. Navigate to the project directory:
   ```bash
   cd customer-retailer-crm
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up the MySQL database:
   - Create a new MySQL database
   - Import the SQL schema files from the `database` directory
5. Configure the `.env` file with database credentials:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_NAME=yourdatabase
   ```
6. Start the Express.js server:
   ```bash
   node server.js
   ```
7. Open `index.ejs` in a browser to access the application.

## Project Structure
```
customer-retailer-crm/
│── public/
│   ├── css/
│   │   ├── Customer1.css
│   │   ├── Customer11.css
│   │   ├── form1.css
│   │   ├── index.css
│   │   ├── login.css
│   │   ├── register.css
│   │   ├── retailer.css
│   │   ├── retailer11.css
│   ├── javascript/
│       ├── login1.js
│
│── views/
│   ├── Customer1.ejs
│   ├── Customer11.ejs
│   ├── Customer12.ejs
│   ├── Customer13.ejs
│   ├── index.ejs
│   ├── login.ejs
│   ├── register.ejs
│   ├── retailer1.ejs
│   ├── retailer11.ejs
│   ├── retailer12.ejs
│   ├── retailer13.ejs
│   ├── retailer14.ejs
│
│── customer.js
│── customer13.js
│── db_config.js
│── login.js
│── register.js
│── retailer.js
│── retailer14.js
│── server.js
│── package.json
│── package-lock.json
│── README.md
```

## Future Enhancements
- Implement authentication using JWT
- Add role-based access for customers and retailers
- Enhance UI with Bootstrap/Tailwind CSS
- Integrate email notifications for order updates

## Contributors
- **Deepak Soni** (Developer)

## License
This project is open-source and available under the [MIT License](LICENSE).
