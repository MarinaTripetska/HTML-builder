const fs = require("fs/promises");
const { WriteStream } = require("fs");
const path = require("path");

const { buildStyles } = require("../05-merge-styles");
const { copyDir } = require("../04-copy-directory");

async function buildHTML(pathSrc, pathToDest, pathToComponentsDir) {
  try {
    const template = await fs.readFile(pathSrc, "utf8");
    let result = template;

    const components = await fs.readdir(pathToComponentsDir, {
      withFileTypes: true,
    });

    components.forEach(async (comp) => {
      if (comp.isFile()) {
        const fileType = path.extname(comp.name);
        const filePath = path.join(pathToComponentsDir, comp.name);
        const fileName = path.basename(comp.name).replace(fileType, "");

        if (fileType === ".html") {
          const fileContent = await fs.readFile(filePath, "utf-8");
          const outputHTML = await WriteStream(pathToDest);
          result = result.replaceAll(`{{${fileName}}}`, fileContent);
          outputHTML.write(result);
        }
      }
    })
  } catch (error) {
    console.log(error.message);
  }
}

async function buildPage() {
  const pathToStylesDir = path.join(__dirname, "styles");
  const pathToDistDir = path.join(__dirname, "project-dist");
  const pathToAssetsSrc = path.join(__dirname, "assets");
  const pathToAssetsCopy = path.join(pathToDistDir, "assets");
  const pathToHTML = path.join(__dirname, "template.html");
  const pathToBuildHTML = path.join(pathToDistDir, "index.html");
  const pathToTemplatesDir = path.join(__dirname, "components");

  try {
    await fs.rm(pathToDistDir, { recursive: true, force: true });
    //create dist dir:
    await fs.mkdir(pathToDistDir, { recursive: true });
    //create bundle css file:
    await buildStyles(pathToStylesDir, pathToDistDir);
    //copy assets dir:
    await copyDir(pathToAssetsSrc, pathToAssetsCopy);
    // create html bundle:
    await buildHTML(pathToHTML, pathToBuildHTML, pathToTemplatesDir);
  } catch (error) {
    console.log(error);
  }
}

buildPage();
