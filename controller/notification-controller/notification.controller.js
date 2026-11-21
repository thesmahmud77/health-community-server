import notificationDatabase from "../../models/notifications/notification.modal.js";

// Client-এর জন্য নোটিফিকেশন আনা
export const getClientNotifications = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "email কোয়েরি প্যারামিটার আবশ্যক",
      });
    }

    const notifications = await notificationDatabase
      .find({ userEmail: email.toLowerCase().trim() })
      .sort({ createdAt: -1 });

    const unreadCount = notifications.filter((item) => !item.isRead).length;

    return res.status(200).json({
      success: true,
      unreadCount,
      data: notifications,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "নোটিফিকেশন আনতে সমস্যা হয়েছে",
      error: error.message,
    });
  }
};

// নোটিফিকেশন read করা
export const markNotificationAsRead = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await notificationDatabase.findByIdAndUpdate(
      id,
      { isRead: true },
      { new: true },
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "নোটিফিকেশন পাওয়া যায়নি",
      });
    }

    return res.status(200).json({
      success: true,
      data: updated,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "নোটিফিকেশন আপডেট করতে সমস্যা হয়েছে",
      error: error.message,
    });
  }
};
