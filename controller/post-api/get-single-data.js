import postDatabase from "../../models/post-actions/post.modal.js";

export const getSingleData = async (req, res) => {
  try {
    const { id } = req.params;
    const singlePost = await postDatabase.findById(id);

    if (!singlePost) {
      return res
        .status(404)
        .json({ success: false, message: "Post Not Found" });
    }

    res.status(200).json(singlePost);
  } catch (error) {
    console.log("Single Post Error", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
