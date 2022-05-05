const express = require('express');
const bodyPaser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

require('./config/database.js');

// middlewares
app.use(bodyPaser.urlencoded({extended: false}));
app.use(bodyPaser.json());

// Cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// Routes
app.use('/api', require('./routes/task.route'));

// server
app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));