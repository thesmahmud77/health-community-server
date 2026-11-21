import categoriesDatabase from "../../models/categories/categories.modal.js";
import postDatabase from "../../models/post-actions/post.modal.js";

export const createPost = async (req, res) => {
  try {
    const postData = { ...req.body };
    const { postType, category } = postData;

    const matchedPostType = await categoriesDatabase.findOne({ postType });
    const isAvailable = Boolean(matchedPostType);

    // ২. categoriesDatabase থেকে category-এর autoApprove অনুযায়ী status নির্ধারণ
    let postStatus = "pending";

    if (category) {
      const categoryDoc = await categoriesDatabase.findOne({ category }).lean();
      if (categoryDoc?.autoApprove === true) {
        postStatus = "approved";
      } else {
        postStatus = "pending";
      }
    }
    console.log(postStatus);

    const createdPost = await postDatabase.create({
      ...postData,
      status: postStatus,
    });

    return res.status(201).json({
      success: true,
      exists: isAvailable,
      postType,
      matchedPostType,
      message: "পোস্ট সফলভাবে তৈরি হয়েছে",
      data: createdPost,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "চেক করতে সমস্যা হয়েছে",
      error: error.message,
    });
  }
};
