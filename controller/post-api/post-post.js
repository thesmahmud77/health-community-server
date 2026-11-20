import postDatabase from "../../models/post.modal.js";

export const communityPost = async (req, res) => {
  try {
    const postData = req.body;
    const posting = await postDatabase.create(postData);
    console.log(posting);
    res
      .status(200)
      .json({ success: true, message: "পোস্ট সঠিক ভাবে আপলোড হয়েছে" });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "পোস্ট আপলোড হয়েছে নি", error });
  }
};
