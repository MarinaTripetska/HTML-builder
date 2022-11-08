const fs = require("fs/promises");
const createReadStream = require('fs').createReadStream;
const path = require("path");

const pathToStylesDir = path.join(__dirname, "styles");
const pathToDistDir = path.join(__dirname, "project-dist");

async function buildStyles(stylesDir, distDir){
  try {
    const bundleFilePath = path.join(distDir, 'bundle.css');
    await fs.writeFile(bundleFilePath, '');
    const stylesFiles = await fs.readdir(stylesDir, { withFileTypes: true });

  stylesFiles.forEach(file => {
    if (file.isFile) {

      const pathToFile = path.join(stylesDir, file.name)
      const extName = path.extname(pathToFile)

      if (extName === ".css") {

        const readStream = createReadStream(pathToFile);
        const chunks = [];

        readStream.on("data", (chunk) => {
          chunks.push(chunk.toString())
        })

        readStream.on('error', () => {
          throw new Error('Incorrect file path or file name!')
        })

        readStream.on('end', () => {
          const result = chunks.join('');

          fs.appendFile(bundleFilePath, result + "\r\n");
        });
      }

    }
  });
  } catch (error) {
    console.log(error);
  }
}

buildStyles(pathToStylesDir, pathToDistDir)