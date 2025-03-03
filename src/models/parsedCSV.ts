import mongoose from "mongoose";

const parsedCSVSchema = new mongoose.Schema(
  {
    csvData: [
      {
        sNo: String,
        productName: String,
        images: [String],
        compressedImages: {
          type: [String],
          required: false,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const ParsedCSV = mongoose.model("ParsedCSV", parsedCSVSchema);

export default ParsedCSV;
