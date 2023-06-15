import {
  readFile,
  sortedByMac,
  sortedByMain,
  sortedByAll,
} from "./modules/loadCSV.js";

import { writeDataToFile } from "./modules/writeDataToFile.js";

async function main() {
  const csvFilePath = "./mqtt_log.csv";
  const csvFileContent = await readFile(csvFilePath);

  writeDataToFile("./files/csv.json", JSON.stringify(csvFileContent));

  /* sorted only by MAC */
  // const byMacJson = sortedByMac(csvFileContent);
  // console.log(byMacJson);

  /* sorted only by main */
  // const byMainJson = sortedByMain(csvFileContent);
  // console.log(byMainJson);

  /* sorted only by MAC & by main */
  const byAllJson = sortedByAll(csvFileContent);
  // console.log(byAllJson);

  writeDataToFile(
    "./files/sortedByMac.json",
    JSON.stringify(byAllJson.objMac, null, 4)
  );
  writeDataToFile(
    "./files/sortedByMain.json",
    JSON.stringify(byAllJson.objMain, null, 4)
  );
  writeDataToFile(
    "./files/sortedBySsid.json",
    JSON.stringify(byAllJson.objSsid, null, 4)
  );
  writeDataToFile(
    "./files/sortedByMac2.json",
    JSON.stringify(byAllJson.objMac2, null, 4)
  );
}

main();
