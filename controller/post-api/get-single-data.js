import postDatabase from "../../models/post-actions/post.modal.js";

export const getSingleData = async (req, res) => {
  try {
    const id = req.params._id;
    const singlePost = await postDatabase.findOne(id);

    if (!singlePost) {
      return res
        .status(400)
        .json({ success: false, message: "Post Not Founed" });
    }
    res.status(200).json(singlePost);
  } catch (error) {
    console.log("Single Post Error", error);
  }
};
