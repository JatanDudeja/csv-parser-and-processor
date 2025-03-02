import csv from "csvtojson";

export async function convertCSVtoJSON(filePath: string) {
  return csv().fromFile(filePath);
}
