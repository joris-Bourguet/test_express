require('./config/env');

const express = require('express')
const cors = require('cors')
const router = express.Router();

const errorHandler = require('./middlewares/errorHandler');
const powered = require('./middlewares/powered')
const auth = require('./middlewares/auth');

const apiRoutes = require('./routes/api');

const port = 3001

const app = express();

// @see https://expressjs.com/en/resources/middleware/cors.html
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// Middleware
app.use(cors(corsOptions))
app.use(powered)
app.use(auth)

app.use('/api', apiRoutes);

app.get('/protected', (req, res) => {
  res.json({message: 'Tu es authentifié', user: req.user});
});

// Error handling middleware
app.use(errorHandler);
app.use(router)

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
})