const fs = require("fs").promises;
const path = require("path");
const { stdout, stderr } = require("node:process");

const pathToText = path.join(__dirname, "text.txt");

async function readFile() {
  try {
    const resp = await fs.readFile(pathToText);
    stdout.write(resp.toString())
  } catch (error) {
    stderr.write("error: ", error.message)
  }
}

readFile();