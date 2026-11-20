import { Router } from "express";
import { OtpGet } from "../controller/otp-get.js";
import { OtpSend } from "../controller/otp-send.js";
import { communityPost } from "../controller/post-api/post-post.js";
import { getPostApi } from "../controller/post-api/get-post.js";

const route = Router();

route.post("/otp-send", OtpSend);

route.get("/get-otp", OtpGet);
route.post("/create-post", communityPost);

// Get All the Post
route.get("/get-post", getPostApi);

// Get the Single Post

export default route;
