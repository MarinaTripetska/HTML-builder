const fs = require("fs/promises");
const path = require("path");
const { stderr } = require("node:process");

const pathToDir = path.join(__dirname, "secret-folder");

function bytesToKBytes(bytes) {
  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1000)));
  return (bytes / Math.pow(1000, i)).toFixed(3);
}

async function readDir() {
  try {
    const files = await fs.readdir(pathToDir, {
      encoding: "utf8",
      withFileTypes: true,
    });
    files.forEach((file) => {
      if (!file.isDirectory()) {
        const pathToFile = path.join(pathToDir, file.name);
        const nameFile = path.basename(pathToFile);
        const extFile = path.extname(pathToFile);

        fs.stat(pathToFile).then((res) => {
          console.log(
            `${nameFile.replace(extFile, "")} - ${extFile.replace(
              ".",
              ""
            )} - ${bytesToKBytes(res.size)}kb`
          );
        });
      }
    });
  } catch (error) {
    stderr.write("error: ", error.message);
  }
}

readDir();