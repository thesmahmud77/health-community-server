import postDatabase from "../../models/post.modal.js";

export const getPostApi = async (req, res) => {
  try {
    const posts = await postDatabase.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: posts.length, posts });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "পোস্ট পাওয়া যায় নি", error });
  }
};
