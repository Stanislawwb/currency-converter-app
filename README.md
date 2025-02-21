# Currency Converter App

This is a test task application that provides a simple **currency converter** using real-time exchange rates. The project is built using the **MERN stack (MongoDB, Express, React, Node.js)** and includes **TypeScript** and **RTK (Redux Toolkit)** for state management on the frontend.

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
VITE_API_BASE_URL=http://localhost:5000/api
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

