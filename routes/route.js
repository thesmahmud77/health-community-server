import { Router } from "express";
import { getSingleData } from "../controller/post-api/get-single-data.js";
import { OtpGet } from "../controller/otp-controller/otp-get.js";
import { OtpSend } from "../controller/otp-controller/otp-send.js";
import { createPost } from "../controller/post-api/post-post.js";
import { createCategories } from "../controller/categories-controller/createCategories.js";
import { getAllCategories } from "../controller/categories-controller/getAllCategories.js";
import {
  getClientNotifications,
  markNotificationAsRead,
} from "../controller/notification-controller/notification.controller.js";
import {
  createPrescription,
  getUserPrescriptions,
} from "../controller/prescription-controller/createPrescription.js";
import { getPostApi } from "../controller/post-api/get-post.js";
import { createTest } from "../controller/test-controller/createTest.js";
import { getAllTests } from "../controller/test-controller/getAllTestsApi.js";
import { getSingleTestById } from "../controller/test-controller/getSingleTestById.js";

const route = Router();

// OTP Routes API
route.post("/otp-send", OtpSend);
route.get("/get-otp", OtpGet);

// POST Route API
route.post("/create-post", createPost);
route.get("/posts", getPostApi);
route.get("/post/:id", getSingleData);

// Categories Route API
route.post("/category", createCategories);
route.get("/category", getAllCategories);

// Prescription routes
route.post("/prescriptions", createPrescription);
route.get("/prescriptions", getUserPrescriptions);

// Client notification routes
route.get("/notifications", getClientNotifications);
route.patch("/notifications/:id/read", markNotificationAsRead);

route.post("/create-test", createTest);
route.get("/test", getAllTests);
route.get("/test/:id", getSingleTestById);

export default route;
