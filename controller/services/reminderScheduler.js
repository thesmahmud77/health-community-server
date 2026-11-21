import prescriptionDatabase from "../models/prescriptions/prescription.modal.js";
import notificationDatabase from "../models/notifications/notification.modal.js";

// "HH:mm" থেকে ১০ মিনিট আগে বের করা
const subtractTenMinutes = (timeStr) => {
  const [hours, minutes] = timeStr.split(":").map(Number);
  const totalMinutes = (hours * 60 + minutes - 10 + 1440) % 1440;
  const h = String(Math.floor(totalMinutes / 60)).padStart(2, "0");
  const m = String(totalMinutes % 60).padStart(2, "0");
  return `${h}:${m}`;
};

// বর্তমান ঢাকা সময় "HH:mm"
const getCurrentTimeHHMM = () => {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Dhaka",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date());
};

// শুধু Client-side নোটিফিকেশনের জন্য DB-তে সেভ করা
const createClientReminder = async (userEmail, medicineName, eatingTime) => {
  await notificationDatabase.create({
    userEmail: userEmail.toLowerCase().trim(),
    medicineName,
    eatingTime,
    message: `"${medicineName}" খাওয়ার সময় (${eatingTime}) আর ১০ মিনিট বাকি`,
    isRead: false,
  });
};

export const checkReminders = async () => {
  try {
    const nowTime = getCurrentTimeHHMM();
    const prescriptions = await prescriptionDatabase.find({});

    for (const doc of prescriptions) {
      for (const med of doc.medicines) {
        const reminderTime = subtractTenMinutes(med.eatingTime);

        if (reminderTime === nowTime) {
          const key = `${nowTime}_${med.medicineName}_${med.eatingTime}`;
          if (doc.lastSentKey === key) continue;

          await createClientReminder(
            doc.userEmail,
            med.medicineName,
            med.eatingTime,
          );

          doc.lastSentKey = key;
          await doc.save();
        }
      }
    }
  } catch (err) {
    console.error("Reminder error:", err.message);
  }
};

export const startReminderJob = () => {
  setInterval(checkReminders, 60 * 1000);
};
