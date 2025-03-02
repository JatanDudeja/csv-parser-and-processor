import { convertCSVtoJSON } from "../utils/csvtojson.utl";

interface SingleRowDTO {
  "S. No.": string | number;
  "Product Name": string;
  "Input Image Urls": string;
}

export class ParsingHelper {
  private readonly requiredKeys = [
    "S. No.",
    "Product Name",
    "Input Image Urls",
  ];

  validateCSVJSON(data: object[]): boolean {
    data?.forEach((item) => {
      const itemKeys = Object.keys(item);

      const hasAllKeys = this.requiredKeys?.every((requiredKey) =>
        itemKeys?.includes(requiredKey)
      );

      if (itemKeys.length > 3 || !hasAllKeys) {
        return false;
      }
    });

    return true;
  }

  getImages(
    data: SingleRowDTO[],
    id: string,
  ): { productName: string | number; images: string[] }[] {
    return data.map((singleRow) => {
      return {
        id,
        productName: singleRow?.["S. No."],
        images: (
          singleRow[this.requiredKeys[2] as keyof SingleRowDTO] as string
        )?.split(","),
      };
    });
  }

  async parseCSV(file: any) {
    console.log(">>>yoyo: ", file);

    let parsedCSVJSON;

    if (file) {
      try {
        parsedCSVJSON = await convertCSVtoJSON(file?.path);
        return;
      } catch (error) {
        console.log(">>>error: ", error);
        return;
      }
    }

    if (parsedCSVJSON) {
      // const imageURLs = parsedCSVJSON.map({});
    }

    // covert the file to json if it exists
    return;
  }
}
