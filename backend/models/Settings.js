import mongoose from "mongoose";

const whatsappGroupLinkSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Link title is required"],
      trim: true,
    },
    url: {
      type: String,
      required: [true, "Link URL is required"],
      trim: true,
    },
  },
  { _id: false },
);

const settingsSchema = new mongoose.Schema(
  {
    whatsappGroupLinks: {
      type: [whatsappGroupLinkSchema],
      default: [],
    },
    adminContactNumber: {
      type: String,
      trim: true,
      default: "",
    },
    alertMessage: {
      type: String,
      trim: true,
      default: "احذر النصب! تعامل فقط من خلال أرقامنا الرسمية.",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Settings", settingsSchema);
