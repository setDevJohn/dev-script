const fs = require("fs");
const path = require("path");

function createPage(pageName, fileType) {
  const extension = fileType === "tsx" ? "ts" : "js";
  const pageDir = path.join(__dirname, "../src", "page", pageName);
  const pageFile = path.join(pageDir, `${pageName}.${fileType}`);
  const styleFile = path.join(pageDir, `styles.${extension}`);

  if (fs.existsSync(pageDir)) {
    return console.log(`O componete ${pageName} já existe.`);
  }
  fs.mkdirSync(pageDir, { recursive: true });

  const pageContent = `import { PageContainer } from './styles.${extension}'

export const ${pageName} = () => {
  return (
    <PageContainer>
    </PageContainer>
  );
};
  `;
  fs.writeFileSync(pageFile, pageContent);

  const stylesContent = `import styled from "styled-components";

export const PageContainer = styled.div\`
  width: 100%;
\`;
  `;
  fs.writeFileSync(styleFile, stylesContent);

  console.log(`Componente ${pageName}.${fileType} criado com sucesso.`);
}

const pageName = process.argv[2];
const fileType = process.argv[3] || "tsx";

if (!pageName) {
  return console.log(
    "Por favor, forneça o nome do componente: node createPage.js NomeDoComponente [jsx|tsx]"
  );
}

if (!["tsx", "jsx"].includes(fileType)) {
  return console.log('Tipo de arquivo inválido. Use "jsx" ou "tsx".');
}

createPage(pageName, fileType);
