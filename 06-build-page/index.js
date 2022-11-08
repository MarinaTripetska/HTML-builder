const fs = require("fs/promises");
const createReadStream = require('fs').createReadStream;
const path = require("path");

const { buildStyles } = require("../05-merge-styles")




async function buildHTML () {
  const pathToStylesDir = path.join(__dirname, "styles");
  const pathToDistDir = path.join(__dirname, "project-dist");

  try {
    //create dist dir:
    await fs.mkdir(pathToDistDir, { recursive: true });
    //create bundle css file:
    await buildStyles(pathToStylesDir, pathToDistDir);

  } catch (error) {
    console.log(error);
  }
};

buildHTML();