import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

function createPage(pageName, fileType) {
  const extension = fileType === "tsx" ? "ts" : "js";
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const pageDir = path.join(__dirname, "../src", "pages", pageName);
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
  console.log(
    "Por favor, forneça o nome do componente: node createPage.js NomeDoComponente [jsx|tsx]"
  );
} else if (!["tsx", "jsx"].includes(fileType)) {
  console.log('Tipo de arquivo inválido. Use "jsx" ou "tsx".');
} else {
  createPage(pageName, fileType);
}
