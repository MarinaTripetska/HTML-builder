
const fs = require("fs/promises");
const path = require("path");

const pathToDestDir = path.join(__dirname, "files-copy");
const pathToSrcDir = path.join(__dirname, "files");

async function copyDir (src, dest) {
  try {
    // create dir, if dir don't exist:
    await fs.mkdir(dest, {recursive: true});
    // read files in both directories:
    const filesDest = await fs.readdir(dest, {withFileTypes: true});
    const filesSrc = await fs.readdir(src, {withFileTypes: true});
    // delete all old files in copy dir (it is better, because chekiang names of files could work only if we change nothing inside file)
    filesDest.forEach((file) => {
      const destPath = path.join(dest, file.name);
      if(file.isDirectory()) {
          // fs.readdir(destPath).then(res => {
          //   if(res.length === 0) {
          //     fs.rmdir(destPath);
          //   } else{
          //     fs.unlink(path.join(destPath, res[0]))
          //   }
          // });
      } else {
        fs.unlink(destPath);
      };
    });

    // copy all files in dest dir:
    filesSrc.forEach(file => {
          const srcPath = path.join(src, file.name);
          const destPath = path.join(dest, file.name);

          if(file.isDirectory()) {
            //TODO: deep files copy
          } else {
              fs.copyFile(srcPath, destPath);
          }
    });
  } catch (error) {
    console.log(error);
  }
};

copyDir(pathToSrcDir, pathToDestDir);

