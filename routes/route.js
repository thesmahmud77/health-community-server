import { Router } from "express";
import { getSingleData } from "../controller/post-api/get-single-data.js";
import { OtpGet } from "../controller/otp-controller/otp-get.js";
import { OtpSend } from "../controller/otp-controller/otp-send.js";
import { createPost } from "../controller/post-api/post-post.js";
import { createCategories } from "../controller/categories-controller/createCategories.js";
import { getAllCategories } from "../controller/categories-controller/getAllCategories.js";
import { createHospital } from "../controller/hospital-controller/create.hospital.js";
import { allHospitalInfo } from "../controller/hospital-controller/all.hospital.js";
import { singleHospitalInfo } from "../controller/hospital-controller/single.hospital.js";

const route = Router();

// OTP Routes API
route.post("/otp-send", OtpSend);
route.get("/get-otp", OtpGet);

// POST Route API
route.post("/create-post", createPost);
route.get("/get-post", createPost);
route.get("/get-post/:id", getSingleData);

// Categories Route API
route.post("/categoris-find", createCategories);
route.get("/categoris-all-data", getAllCategories);

// Hospital Route API
route.post("/create-hospital", createHospital);
route.get("/hospital", allHospitalInfo);
route.get("/hospital/:id", singleHospitalInfo);

export default route;
