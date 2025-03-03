import { Worker } from "bullmq";
import ParsedCSV from "../models/parsedCSV";
import path from "path";
import sharp from "sharp";
import axios from "axios";
import fs from "fs";

const OUTPUT_DIR = "./compressed-images";
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR);

// export async function processImages(data: { id: string }) {
// const worker = new Worker("image-queue", async (message: { id: string }) => {
//   const { id } = message || {};
//   if (!id) {
//     console.log("ID not available skipping this");
//     return;
//   }

//   const rawCSVData = await ParsedCSV.findById(id);

//   if (!rawCSVData) {
//     console.log(`Nothing with id: ${id} exits in the db`);
//     return;
//   }

//   const compressedUrls: string[] = [];

//   for (const url of rawCSVData?.csvData?.["Input Image Urls"]) {
//     try {
//       console.log(`Downloading: ${url}`);

//       const response = await axios({ url, responseType: "arraybuffer" });

//       const fileName = `compressed_${Date.now()}.jpg`;
//       const outputPath = path.join(OUTPUT_DIR, fileName);

//       await sharp(response.data).jpeg({ quality: 50 }).toFile(outputPath);

//       compressedUrls.push(outputPath);
//     } catch (error: any) {
//       console.error(`Error processing ${url}:`, error.message);
//     }
//   }
// });
