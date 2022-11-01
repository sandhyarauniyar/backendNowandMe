const express = require('express');
const app = express();
const db = require('./models');
const dotenv = require('dotenv');
const router = require('./routes/userRoutes.js');
const bodyParser = require('body-parser');
const cors = require('cors');

const sequelize = require('sequelize');

const PORT = 8080;
dotenv.config();
app.use(express.json());
app.use(cors());

(async () => {
    await db.sequelize.sync({ force: true });
})();

app.use(router);
app.use(bodyParser.json());
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

