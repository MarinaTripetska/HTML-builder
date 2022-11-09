const fs = require("fs/promises");
const createReadStream = require('fs').createReadStream;
const path = require("path");

const { buildStyles } = require("../05-merge-styles");
const { copyDir } = require("../04-copy-directory");



async function buildHTML () {
  const pathToStylesDir = path.join(__dirname, "styles");
  const pathToDistDir = path.join(__dirname, "project-dist");
  const pathToAssetsSrc = path.join(__dirname, "assets");
  const pathToAssetsCopy = path.join(pathToDistDir, "assets")
  try {
    //create dist dir:
    await fs.mkdir(pathToDistDir, { recursive: true });
    //create bundle css file:
    await buildStyles(pathToStylesDir, pathToDistDir);
    //copy assets dir:
    await copyDir(pathToAssetsSrc, pathToAssetsCopy)
    //TODO: create html bundle
  } catch (error) {
    console.log(error);
  }
};

buildHTML();