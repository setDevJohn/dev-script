const fs = require("fs");
const path = require("path");

function createStructure(fileType) {
  const extension = fileType === "tsx" ? "ts" : "js";
  const rootDir = path.join(__dirname, "../src");
  const components = path.join(rootDir, "components");
  const assets = path.join(rootDir, "assets");
  const pages = path.join(rootDir, "pages");
  const utils = path.join(rootDir, "utils");
  const styles = path.join(rootDir, "styles");

  const folderList = [components, assets, pages, utils, styles];

  folderList.forEach((folder) => {
    if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true });
  });

  const globalStylesContent = `import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle\`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Arial, Helvetica, sans-serif;
  }

  html {
    font-size: 62.5%;
  }

  img {
    max-width: 100%;
  }

  ul {
    list-style: none;
  }

  a {
    text-decoration: none;
  }

  button {
    border: none;
  }
\`;

  `;
  const globalStylesFile = path.join(styles, `globalStyles.${extension}`);
  fs.writeFileSync(globalStylesFile, globalStylesContent);
}

const fileType = process.argv[2] || "tsx";

if (!["tsx", "jsx"].includes(fileType)) {
  return console.log('Tipo de arquivo inválido. Use "jsx" ou "tsx".');
}

createStructure(fileType);
