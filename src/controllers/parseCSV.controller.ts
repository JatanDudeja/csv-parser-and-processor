import { Request, Response } from "express";
import { convertCSVtoJSON } from "../utils/csvtojson.utl";
import { ParsingHelper } from "../helpers/parsing.helper";
import ParsedCSV from "../models/parsedCSV";
import { processImages } from "./worker.controller";

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

    const images = parsingHelper.getImages(
      parsedCSVJSON,
      parsedCSVStoredData?.id
    );

    await processImages(images);

    // const imageURLs = parsedCSVJSON.map({});
  }

  // covert the file to json if it exists
  res.send("done");
  return;
}
