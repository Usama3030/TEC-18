const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const userRoutes = require('./routes/userRoutes');
const businessRoutes = require('./routes/businessRoutes');
const buildingRoutes = require('./routes/buildingRoutes');
const checklistTypesRoutes = require('./routes/checklistRoutes');
const mongoose = require("./db/db");

app.use(bodyParser.json());


app.use(express.json());

app.use('/api', userRoutes);
app.use('/api2', businessRoutes);
app.use('/api3', buildingRoutes);
app.use('/api4', checklistTypesRoutes)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
