import express, {urlencoded, Request, Response, NextFunction} from 'express';
import serverless from "serverless-http";
import cors from 'cors';
import mongoose, {connect} from "mongoose";
import { json } from 'body-parser';
import path from 'path';

import cookieSession from "cookie-session";
import passport from "passport";

import { MONGO_URI, COOKIE_KEY } from './utils/secrets';

// import { DB } from "./shared/database";
// import { logger } from "./utils/logger";

import userRoutes from './modules/User/route';
import authRoutes from './modules/AuthenticateUser/route';
import authMerchantRoutes from './modules/AuthenticateMerchant/route';
import organizationRoutes from './modules/Organization/route';
import productRoutes from './modules/Product/route';
import merchantRoutes from './modules/Merchant/route';

// import uploadRoutes from './modules/Upload/route';

require('./modules/AuthenticateUser/passportUser');
require('./modules/AuthenticateUser/passportGoogleUser');
require('./modules/AuthenticateMerchant/passportMerchant');
require('./modules/AuthenticateMerchant/passportGoogleMerchant');

// const http = require('http');
// const socketIo = require('socket.io');
// const natural = require('natural');

mongoose.set('strictQuery', false);
// connect(MONGO_URI, () => {
//   console.log("connected to db");
// });

// connect('mongodb+srv://gamificationusr:0Ndm5CkMqm6IPZdQ@cluster0.hlbkvls.mongodb.net/?retryWrites=true&w=majority');
connect('mongodb://127.0.0.1:27017/merchantprodb');

const app = express();
app.use(cors());

// const httpServer = require('http').createServer(app);
// const io = require('socket.io')(httpServer, {
//   cors: {
//      origin: "http://localhost:8100", //specific origin you want to give access to,
//   },
// });

// // Sample dataset of sentences and their corresponding categories
// const sentences = [
//   "Welcome to our platform. Let me guide you through the onboarding process.",
//   "To transfer funds, please follow the instructions provided.",
//   "You can view your transaction history in the dashboard."
// ];
// const categories = ["onboarding", "transfer", "history"];

// // Initialize tokenizer and TF-IDF vectorizer
// const tokenizer = new natural.WordTokenizer();
// const tfidf = new natural.TfIdf();

// // Tokenize and add documents to TF-IDF vectorizer
// sentences.forEach((sentence, index) => {
//   const tokens = tokenizer.tokenize(sentence.toLowerCase());
//   tfidf.addDocument(tokens);
// });

// // Keywords for each category
// const categoryKeywords = {
//   onboarding: ["welcome", "guide", "register", "sign up"],
//   transfer: ["transfer", "funds", "send"],
//   history: ["transaction", "history"]
// };


app.use(json());
app.use(urlencoded({ extended: true, }));

// setting up cookieSession
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [COOKIE_KEY],
  })
);

// app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// app.use('/api/users', userRoutes);
// app.use('/api/auth', authRoutes);
// app.use('/api/merchant/auth', authMerchantRoutes);
// app.use('/api/organizations', organizationRoutes);
// app.use('/api/products', productRoutes);
// app.use('/api/merchant', merchantRoutes);

const buildPath = path.normalize(path.join(__dirname, '../client/build'));
app.use(express.static(buildPath));

// app.use(express.static(__dirname));

// app.get('/', (req: any, res: any) => {
//     res.send("Welcome to BillOn.")
// });

app.get('(/*)?', async (req, res, next) => {
    res.sendFile(path.join(buildPath, 'index.html'));
});

app.use('/static', express.static(path.join(__dirname, 'public')))


// app.use((err: Error, req: Request, res:Response, next: NextFunction) => {
//     res.status(500).json({ success: false,  statusCode: 500, message: err.message, data: null });
// });

// Error handling middleware
app.use((err: Error, req: Request, res:Response, next: NextFunction) => {
  if (err instanceof mongoose.Error.ValidationError) {
      const errors = Object.keys(err.errors).map(key => ({
          field: key,
          message: err.errors[key].message
      }));
      return res.status(400).json({
          status: 'error',
          errors
      });
  }
  next(err);
});


// WebSocket connection
// io.on('connection', (socket) => {
//   console.log('user connected');
//   // Handle incoming chat messages
//   socket.on('chat message', (msg) => {
//       console.log("===============user input====================");
//       console.log(msg);
//       console.log("===============end user input================");
//       // Tokenize message and calculate TF-IDF scores
//       const tokens = tokenizer.tokenize(msg.toLowerCase());

//       const categoryScores = {};
//       Object.keys(categoryKeywords).forEach(category => {
//           categoryScores[category] = tokens.reduce((score, token) => {
//               if (categoryKeywords[category].includes(token.toLowerCase())) {
//                   score++;
//               }
//               return score;
//           }, 0);
//       });
//       const prediction = Object.keys(categoryScores).reduce((prev, curr) => {
//           return categoryScores[curr] > categoryScores[prev] ? curr : prev;
//       });

//       console.log("===============bot prediction====================");
//       console.log(prediction);
//       console.log("===============end bot prediction================");
      
//       // Send the predicted category back to the client
//       socket.emit('category prediction', { username: 'bot', message: prediction });
//   });

//   // Handle disconnection
//   socket.on('disconnect', () => {
//       console.log('user disconnected');
//   });
// });

// const port = process.env.PORT || 3001;
const port = process.env.PORT || 8080;
app.listen(port, ()=> console.log(`MerchantPro API is running on Port ${port}`));
// io.listen(3006);

app.use("/.netlify/functions/app/api/users", userRoutes);
export const handler = serverless(app);
