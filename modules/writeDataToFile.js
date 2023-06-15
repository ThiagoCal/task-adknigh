import fs from "fs";

export const writeDataToFile = (outputFile, jsonData) => {
  fs.writeFile(outputFile, jsonData, (err) => {
    if (err) {
      console.error("Error writing to output file:", err);
      return;
    }
    console.log("Data successfully written to", outputFile);
  });
}