const fs = require("fs").promises;
const { ReadStream } = require("fs");
const path = require("path");
const { stdout, stderr } = require("node:process");

const pathToText = path.join(__dirname, "text.txt");

async function readFile() {
  try {
    const readStream = await ReadStream(pathToText, "utf-8");
    readStream.on("data", data => stdout.write(data));
  } catch (error) {
    stderr.write("error: ", error.message);
  }
}

readFile();