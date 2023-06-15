import fs from "fs";
import csv from "csv-parser";

export const readFile = async (inputFile) => {
  const lines = [];
  const stream = fs.createReadStream(inputFile);
  const csvStream = csv();

  stream.pipe(csvStream);
  let indx = 0;
  for await (const data of csvStream) {
    lines.push({ ...data, indx });
    indx++;
  }

  return lines;
};

export const sortedByMac = (lines) => {
  const sortedByMac = {};

  lines.forEach((line) => {
    const mac = line["MAC"];
    const main = line["main"];
    const sub = line["sub"];

    if (!sortedByMac[mac]) {
      sortedByMac[mac] = [];
    }
    sortedByMac[mac].push({ main, sub });
  });
  const objMac = Object.entries(sortedByMac).map((entry) => {
    return { key: entry[0], values: entry[1] };
  });

  objMac.sort((a, b) => {
    return a.key.localeCompare(b.key);
  });
  return objMac;
};

export const sortedByMain = (lines) => {
  const sortedByMain = {};

  lines.forEach((line) => {
    const mac = line["MAC"];
    const main = line["main"];
    const sub = line["sub"];

    if (!sortedByMain[main]) {
      sortedByMain[main] = {};
    }
    if (!sortedByMain[main][sub]) {
      sortedByMain[main][sub] = 0;
    }
    sortedByMain[main][sub]++;
  });
  const objMain = Object.entries(sortedByMain).map((entry) => {
    return { key: entry[0], values: entry[1] };
  });

  objMain.sort((a, b) => {
    return a.key.localeCompare(b.key);
  });
  return objMain;
};

export const sortedByAll = (lines) => {
  const sortedByMac = {};
  const sortedByMain = {};
  const sortedBySsid = {};

  lines.forEach((line) => {
    const mac = line["MAC"];
    const main = line["main"];
    const sub = line["sub"];
    const ssid = line["SSID"];

    if (!sortedByMac[mac]) {
      sortedByMac[mac] = [];
    }
    sortedByMac[mac].push({ main, sub });

    if (!sortedByMain[main]) {
      sortedByMain[main] = {};
    }
    if (!sortedByMain[main][sub]) {
      sortedByMain[main][sub] = 0;
    }
    sortedByMain[main][sub]++;

    if (!sortedBySsid[ssid]) {
      sortedBySsid[ssid] = {};
    }
    if (!sortedBySsid[ssid][main]) {
      sortedBySsid[ssid][main] = 0;
    }
    sortedBySsid[ssid][main]++;
  });

  const objMac = Object.entries(sortedByMac).map((entry) => {
    return { key: entry[0], values: entry[1] };
  });

  objMac.sort((a, b) => {
    return a.key.localeCompare(b.key);
  });

  const objMain = Object.entries(sortedByMain).map((entry) => {
    return { key: entry[0], values: entry[1] };
  });

  objMain.sort((a, b) => {
    return a.key.localeCompare(b.key);
  });

  const objSsid = Object.entries(sortedBySsid).map((entry) => {
    return { key: entry[0], values: entry[1] };
  });

  objSsid.sort((a, b) => {
    return a.key.localeCompare(b.key);
  });

  return { objMac, objMain, objSsid };
};
