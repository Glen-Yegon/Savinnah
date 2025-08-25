const fs = require("fs");
const path = require("path");
const UglifyJS = require("uglify-js");
const CleanCSS = require("clean-css");

const folderPath = __dirname; // current folder

// Delete old minified files before creating new ones
fs.readdirSync(folderPath).forEach(file => {
  if (file.endsWith(".min.js") || file.endsWith(".min.css")) {
    fs.unlinkSync(path.join(folderPath, file));
    console.log(`Deleted: ${file}`);
  }
});

// Minify JS and CSS files
fs.readdirSync(folderPath).forEach(file => {
  const filePath = path.join(folderPath, file);

  if (file.endsWith(".js") && !file.endsWith(".min.js")) {
    const code = fs.readFileSync(filePath, "utf8");
    const result = UglifyJS.minify(code);

    if (result.error) {
      console.error(`Error minifying ${file}:`, result.error);
    } else {
      const minFilePath = filePath.replace(".js", ".min.js");
      fs.writeFileSync(minFilePath, result.code, "utf8");
      console.log(`Minified: ${file} → ${path.basename(minFilePath)}`);
    }
  }

  if (file.endsWith(".css") && !file.endsWith(".min.css")) {
    const code = fs.readFileSync(filePath, "utf8");
    const result = new CleanCSS().minify(code);

    if (result.errors.length) {
      console.error(`Error minifying ${file}:`, result.errors);
    } else {
      const minFilePath = filePath.replace(".css", ".min.css");
      fs.writeFileSync(minFilePath, result.styles, "utf8");
      console.log(`Minified: ${file} → ${path.basename(minFilePath)}`);
    }
  }
});
