import prescriptionDatabase from "../../models/prescriptions/prescription.modal.js";

// প্রেসক্রিপশন তৈরি
export const createPrescription = async (req, res) => {
  try {
    const { userEmail, medicines } = req.body;

    if (!userEmail || !Array.isArray(medicines) || medicines.length === 0) {
      return res.status(400).json({
        success: false,
        message: "userEmail এবং medicines অ্যারে আবশ্যক",
      });
    }

    const created = await prescriptionDatabase.create({
      userEmail,
      medicines,
    });

    return res.status(201).json({
      success: true,
      message: "প্রেসক্রিপশন সেভ হয়েছে",
      data: created,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "প্রেসক্রিপশন সেভ করতে সমস্যা হয়েছে",
      error: error.message,
    });
  }
};

// ইউজারের প্রেসক্রিপশন দেখা
export const getUserPrescriptions = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "email কোয়েরি প্যারামিটার আবশ্যক",
      });
    }

    const prescriptions = await prescriptionDatabase
      .find({ userEmail: email.toLowerCase().trim() })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: prescriptions.length,
      data: prescriptions,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "প্রেসক্রিপশন আনতে সমস্যা হয়েছে",
      error: error.message,
    });
  }
};
