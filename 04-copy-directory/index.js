const fs = require("fs/promises");
const path = require("path");
const { stderr } = require("node:process");
const pathToDestDir = path.join(__dirname, "files-copy");
const pathToSrcDir = path.join(__dirname, "files");

async function copyDir(src, dest) {
  try {
    // delete all old files in copy dir (it is better, because chekiang names of files could work only if we change nothing inside file)
    await fs.rm(dest, { recursive: true, force: true });
    // create dir, if dir don't exist:
    await fs.mkdir(dest, { recursive: true });
    // read files in src dir:
    const filesSrc = await fs.readdir(src, { withFileTypes: true });
    // copy all files in dest dir:
    filesSrc.forEach((file) => {
      const srcPath = path.join(src, file.name);
      const destPath = path.join(dest, file.name);

      if (file.isDirectory()) {
        copyDir(srcPath, destPath);
      } else {
        fs.copyFile(srcPath, destPath);
      }
    });
  } catch (error) {
    stderr.write(error);
  }
}

copyDir(pathToSrcDir, pathToDestDir);

module.exports = {
  copyDir,
};