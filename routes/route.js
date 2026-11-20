import { Router } from "express";
import { OtpGet } from "../controller/otp-get.js";
import { OtpSend } from "../controller/otp-send.js";
import { testapi } from "../controller/test-api.js";

const route = Router();

route.post("/otp-send", OtpSend);

route.get("/get-otp", OtpGet);
route.get("/test", testapi);

export default route;
