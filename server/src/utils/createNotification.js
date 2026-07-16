import Notification from "../models/Notification.js";

const createNotification = async ({
  receiver,
  sender,
  title,
  message,
  type,
}) => {
  try {
    await Notification.create({
      receiver,
      sender,
      title,
      message,
      type,
    });
  } catch (error) {
    console.error("Notification Error:", error);
  }
};

export default createNotification;