import mongoose from "mongoose";

const ImageMetadataSchema = new mongoose.Schema(
  {
    requestID: { type: mongoose.Schema.Types.ObjectId, ref: "ParsedCSV" },
    imageHash: String,
    originalUrl: String,
    compressedUrl: String,
    status: {
      type: String,
      enum: ["pending", "processing", "completed", "failed"],
      default: "pending",
    },
    error: String,
  },
  { timestamps: true }
);

// Composite key of requestID and imageHash where
// requestID is foreign key to table ParsedCSV
ImageMetadataSchema.index({ requestID: 1, imageHash: 1 }, { unique: true });

export const ImageJob = mongoose.model("ImageMetadata", ImageMetadataSchema);
