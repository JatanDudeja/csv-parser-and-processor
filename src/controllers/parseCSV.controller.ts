import { Request, Response } from "express";
import { convertCSVtoJSON } from "../utils/csvtojson.utl";
import { ParsingHelper } from "../helpers/parsing.helper";
import ParsedCSV from "../models/parsedCSV";
// import { processImages } from "./worker.controller";
import { addToQueue } from "../utils/queue.util";
import { ImageJob } from "../models/imageMetadata";

export async function parseCSV(req: Request, res: Response) {
  console.log(">>>yoyo: ", req?.file);

  let parsedCSVJSON;

  if (req?.file) {
    try {
      parsedCSVJSON = await convertCSVtoJSON(req?.file?.path);
      res.json(parsedCSVJSON);
      return;
    } catch (error) {
      console.log(">>>error: ", error);
      res.send("error");
      return;
    }
  }

  const parsingHelper = new ParsingHelper();
  if (parsedCSVJSON) {
    // validate csv
    if (!parsingHelper.validateCSVJSON(parsedCSVJSON)) {
      res.status(400).json("CSV is not of the correct format");
      return;
    }

    const parsedCSVStoredData = await ParsedCSV.create({
      csvData: parsedCSVJSON,
    });

    const imageMetadata = [];

    // parsedCSVStoredData?.['Input Image Urls'].forEach((entry) => {
    //   entry.images.forEach((imageUrl) => {
    //     const imageHash = crypto.createHash("sha256").update(imageUrl).digest("hex");
    
    //     imageJobs.push({
    //       requestID: entry._id,
    //       imageHash, // Unique identifier per image
    //       originalUrl: imageUrl,
    //       status: "pending",
    //     });
    //   });
    // });
    
    // await ImageJob.insertMany(imageJobs);

    await addToQueue({
      id: parsedCSVStoredData?.id
    });

    // const imageURLs = parsedCSVJSON.map({});
  }

  // covert the file to json if it exists
  res.send("done");
  return;
}
