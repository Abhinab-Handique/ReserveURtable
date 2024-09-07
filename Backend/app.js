import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { errorMiddleware } from "./error/error.js";
import reservationRouter from "./routes/reservation.js";
import { dbConnection } from "./database/dbConnection.js";
import Restaurant from './models/restaurantSchema.js';
import User from './models/user.js';  // Import the User model
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const app = express();
dotenv.config({ path: "./config/config.env" });

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';  // JWT secret from environment or fallback

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["POST"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/reservation", reservationRouter);
app.get("/", (req, res, next) => {
  return res.status(200).json({
    success: true,
    message: "HELLO WORLD AGAIN"
  });
});

// Register route
app.post('/SignUp', async (req, res) => {
  const { name, email, password, role, restaurantId } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,  // Store hashed password
      role,
      restaurantId
    });

    await newUser.save();

    // Create JWT token
    const token = jwt.sign({ userId: newUser._id, role: newUser.role }, JWT_SECRET, {
      expiresIn: '1h'
    });

    res.status(201).json({ token, message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create JWT token
    const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: '1h'
    });

    res.status(200).json({ token, message: 'Logged in successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

// Protected route example
app.get('/profile', authenticateToken, (req, res) => {
  res.json({ message: 'Profile data', user: req.user });
});

// Middleware to verify JWT tokens


// Route to add a new restaurant
app.post('/restaurant', async (req, res) => {
  const { name, menuItems } = req.body;
  try {
    const newRestaurant = new Restaurant({ name, menuItems });
    await newRestaurant.save();
    res.status(201).json(newRestaurant);
  } catch (e) {
    console.log(e);
    res.status(404).json({ message: 'Error in saving Restaurant' });
  }
});

// Route to get all menu items
app.get('/menu', async (req, res) => {
  try {
    const restaurants = await Restaurant.find(); // Fetch all restaurants
    res.json(restaurants); // Send JSON response
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
app.post('/logout', (req, res) => {
   
  res.status(200).json({ message: 'Logged out successfully' });
});

// Database connection
dbConnection();

// Error handling middleware
app.use(errorMiddleware);

export default app;
