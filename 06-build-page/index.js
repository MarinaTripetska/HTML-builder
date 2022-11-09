const fs = require("fs/promises");
const path = require("path");

const { buildStyles } = require("../05-merge-styles");
const { copyDir } = require("../04-copy-directory");

async function buildHTML (pathSrc, pathToDest, pathToComponentsDir) {
  try {
    const componentsNames = [];
    const template = await fs.readFile(pathSrc, "utf8");
    let result = template;

    const components = await fs.readdir(pathToComponentsDir, { withFileTypes: true });
    components.forEach(comp => {
      if(comp.isFile()){
        const fileType = path.extname(comp.name);
        if(fileType === ".html"){
          const name = path.basename(comp.name).replace(fileType, "");
          componentsNames.push(name);
        }
      }
    });

    componentsNames.forEach(async name => {
      const positionInTxt = template.search(`{{${name}}}`);

      if(positionInTxt !== -1) {
        const pathToComponent = path.join(pathToComponentsDir, `${name}.html`);
        const componentContent = await fs.readFile(pathToComponent, "utf8")
        result = result.replace(`{{${name}}}`, componentContent);
        await fs.writeFile(pathToDest, result);
      }
    })

  } catch (error) {
    console.log(error.message);
  }
}

async function buildPage () {
  const pathToStylesDir = path.join(__dirname, "styles");
  const pathToDistDir = path.join(__dirname, "project-dist");
  const pathToAssetsSrc = path.join(__dirname, "assets");
  const pathToAssetsCopy = path.join(pathToDistDir, "assets");
  const pathToHTML = path.join(__dirname, "template.html");
  const pathToBuildHTML = path.join(pathToDistDir, "index.html");
  const pathToTemplatesDir = path.join(__dirname, "components");

  try {
    await fs.rm(pathToDistDir, { recursive: true, force: true})
    //create dist dir:
    await fs.mkdir(pathToDistDir, { recursive: true });
    //create bundle css file:
    await buildStyles(pathToStylesDir, pathToDistDir);
    //copy assets dir:
    await copyDir(pathToAssetsSrc, pathToAssetsCopy)
    // create html bundle:
    await buildHTML(pathToHTML, pathToBuildHTML, pathToTemplatesDir);

  } catch (error) {
    console.log(error);
  }
};

buildPage();