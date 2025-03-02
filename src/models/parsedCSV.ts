import mongoose from "mongoose";

const parsedCSVSchema = new mongoose.Schema(
  {
    csvData: {
      type: Object,
    },
  },
  {
    timestamps: true,
  }
);

const ParsedCSV = mongoose.model("ParsedCSV", parsedCSVSchema);

export default ParsedCSV;
