import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { connectDB } from "./config/db.js";
connectDB();


import { appConfig } from "./config/appConfig.js";
import { aiController } from "./controllers/aiController.js";
import { tripRequestController } from "./controllers/tripController.js";
import { adminLogin, seedAdmin } from "./controllers/adminAuthController.js";
import { authGuard, requireAdmin } from "./middleware/auth.js";
import { 
  listPlaces, createPlace, updatePlace, deletePlace,
  listEvents, createEvent, updateEvent, deleteEvent,
  listUpdates, createUpdate, updateUpdate, deleteUpdate,
  listReviews, createReview, updateReview, deleteReview
} from "./controllers/cmsController.js";

const app = express();
app.use(
  cors({
    origin: ["http://localhost:8080", "http://localhost:5173"],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = process.env.PORT;

// Get Gemini API Response
app.post("/chat-with-gemini", aiController);
app.post("/trip-request", tripRequestController);

// Admin auth
app.post("/admin/login", adminLogin);
app.post("/admin/seed", seedAdmin);

// Admin CMS routes (protected)
app.get("/admin/places", authGuard, requireAdmin, listPlaces);
app.post("/admin/places", authGuard, requireAdmin, createPlace);
app.put("/admin/places/:id", authGuard, requireAdmin, updatePlace);
app.delete("/admin/places/:id", authGuard, requireAdmin, deletePlace);

app.get("/admin/events", authGuard, requireAdmin, listEvents);
app.post("/admin/events", authGuard, requireAdmin, createEvent);
app.put("/admin/events/:id", authGuard, requireAdmin, updateEvent);
app.delete("/admin/events/:id", authGuard, requireAdmin, deleteEvent);

app.get("/admin/updates", authGuard, requireAdmin, listUpdates);
app.post("/admin/updates", authGuard, requireAdmin, createUpdate);
app.put("/admin/updates/:id", authGuard, requireAdmin, updateUpdate);
app.delete("/admin/updates/:id", authGuard, requireAdmin, deleteUpdate);

app.get("/admin/reviews", authGuard, requireAdmin, listReviews);
app.post("/admin/reviews", authGuard, requireAdmin, createReview);
app.put("/admin/reviews/:id", authGuard, requireAdmin, updateReview);
app.delete("/admin/reviews/:id", authGuard, requireAdmin, deleteReview);

// App listening
app.listen(PORT, () => {
  console.log("Gemini AI Server is listening on port number", PORT);
});
