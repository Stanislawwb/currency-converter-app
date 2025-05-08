# Currency Converter App

This is a test task application that provides a simple **currency converter** using real-time exchange rates. The project is built using the **MERN stack (MongoDB, Express, React, Node.js)** and includes **TypeScript** and **RTK (Redux Toolkit)** for state management on the frontend.


## ⚙️ How the App Works

### 🌍 Core Functionality

- On loading the main page, the app displays the current exchange rates of key currencies (USD, EUR, RUB, BYN) relative to the US dollar.
- When the user enters a value in one of the input fields, all other fields are **automatically recalculated in real time**.
- All exchange rate conversions are **processed on the server side**, ensuring consistent and centralized logic.

### ➕ Adding & Removing Currencies

- Users can add new currencies from a predefined list using the **“Add currency”** button.
- Each newly added currency appears with its own input field and dynamically updates based on the entered value.
- Currencies can also be removed with a single click.

### 📄 Second Tab: Full Currency List

- A second page/tab displays a **full table of available currencies**, each converted to 1 USD.
- The list can be **sorted by name or value**, with all sorting handled **server-side**.
- Switching between tabs preserves the state — previously entered values and selected currencies remain intact without re-fetching data unnecessarily.

### 💾 Caching and Performance

- All exchange rate data is **cached in a MongoDB database**.
- If data is **less than 2 hours old**, it’s served from the database.
- Otherwise, the backend fetches updated data from a banking API and updates the database.

### 🧭 Layout & Navigation

- The application includes a **static header** and a **static sidebar**.
- On **mobile devices**, the top navigation transforms into a **responsive burger menu**, allowing users to toggle the main navigation in a compact and user-friendly way.

### 📱 Responsive & User-Friendly Design

- The interface is fully responsive and optimized for desktop, tablet, and mobile devices.
- Dynamic currency inputs can be added or removed smoothly, without layout glitches or performance issues.
- Built with accessibility and user experience in mind.

---

## **Live Demo**
**[Currency Converter App](http://64.226.72.110)**

---

## **Tech Stack**
- **Frontend:** React, TypeScript, Vite, RTK (Redux Toolkit)
- **Backend:** Node.js, Express, TypeScript
- **Database:** MongoDB Atlas
- **Proxy & Server Management:** Nginx, PM2

---

## **Running the Project Locally**

### ** Clone the Repository**
- git clone https://github.com/Stanislawwb/currency-converter-app.git
- cd currency-converter-app

### ** Backend Setup**
- cd backend
- npm install

#### **Setup Environment Variables**
Create a `.env` file in the **backend** directory and add:

```sh
PORT=5000
MONGO_URI=mongodb+srv://stanislav1234:stanislav1234@cluster0.bz1ak.mongodb.net/currency_converter?retryWrites=true&w=majority&appName=Cluster0
BANKING_API_URL=https://api.exchangerate-api.com/v4/latest/USD
```

#### **Build & Start Backend**

- npm run build
- npm start


### **Frontend Setup**

- cd ../frontend
- npm install


#### **Setup Environment Variables**
Create a `.env` file in the **frontend** directory and add:
```env
VITE_API_URL=http://localhost:5000/api
```

#### **Build & Start Frontend**

- npm run dev  # For development
- npm run build  # For production

---

## **Server Deployment Steps (DigitalOcean)**

### ** Install Required Packages**

- apt update && apt upgrade -y
- apt install -y nodejs npm nginx git

### ** Clone & Setup Backend**

- cd ~
- git clone https://github.com/Stanislawwb/currency-converter-app.git

- cd currency-converter-app/backend

- npm install

- npm run build

- pm2 start dist/server.js --name backend --update-env

- pm2 save

- pm2 startup

### ** Setup Nginx Reverse Proxy**

### ** Setup Frontend on Server**
```sh
cd ~/currency-converter-app/frontend
npm install
npm run build
rm -rf /var/www/html/*
mv dist/* /var/www/html/
systemctl restart nginx
```

