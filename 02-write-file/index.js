const { stdin, stdout, stderr } = require("process");
const path = require("path");
const createWriteStream = require("fs").createWriteStream;

async function writeStream() {
  const pathToTxtFile = path.join(__dirname, "text.txt");
  const readText = createWriteStream(pathToTxtFile, "utf-8");

  try {
    stdout.write(
      "Hi! Write a text and I will write it down.\nType 'exit' or press Ctrl + C to close me\n"
    );

    stdin.on("data", (data) => {
      if (data.toString().trim() === "exit") {
        process.exit();
      } else {
        readText.write(data);
      }
    });

    process.on("SIGINT", () => process.exit());
    process.on("exit", () => stdout.write(`\nI'm closing :)`));
  } catch (error) {
    stderr.write(error);
  }
}
writeStream();