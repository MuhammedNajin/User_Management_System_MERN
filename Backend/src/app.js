const express = require('express');
const userRoute = require('./routes/userRoutes');
const adminRoute = require('./routes/adminRoutes');
const cors = require('cors');
const app = express();
const db = require('./config/databaseConfig');
const cookieParser = require('cookie-parser');
require('dotenv').config();

db.connectDatabase();

app.use(express.json());
app.use(cors({
   origin: 'http://localhost:5173',
   methods: ['GET', 'POST', 'PUT', 'DELETE'],
   credentials: true,
}));
app.use(cookieParser());

app.use('/api/users/', userRoute);
app.use('/api/admin/', adminRoute);
app.use((err, req, res, next) => {
   console.log(err);
})
app.listen(3080, () => {
   console.log(`http://localhost:3080`);
})





