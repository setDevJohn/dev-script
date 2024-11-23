import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

function createComponent(componentName, fileType) {
  const extension = fileType === "tsx" ? "ts" : "js";
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const componentDir = path.join(
    __dirname,
    "../src",
    "components",
    componentName
  );
  const componentFile = path.join(componentDir, `${componentName}.${fileType}`);
  const styleFile = path.join(componentDir, `styles.${extension}`);

  if (fs.existsSync(componentDir)) {
    return console.log(`O componete ${componentName} já existe.`);
  }
  fs.mkdirSync(componentDir, { recursive: true });

  const componentContent = `import { ComponentContainer } from './styles.${extension}'

export const ${componentName} = () => {
  return (
    <ComponentContainer>
    </ComponentContainer>
  );
};
  `;
  fs.writeFileSync(componentFile, componentContent);

  const stylesContent = `import styled from "styled-components";

export const ComponentContainer = styled.div\`
  width: 100%;
\`;
  `;
  fs.writeFileSync(styleFile, stylesContent);

  console.log(`Componente ${componentName}.${fileType} criado com sucesso.`);
}

const componentName = process.argv[2];
const fileType = process.argv[3] || "tsx";

if (!componentName) {
  console.log(
    "Por favor, forneça o nome do componente: node createComponent.js NomeDoComponente [jsx|tsx]"
  );
} else if (!["tsx", "jsx"].includes(fileType)) {
  console.log('Tipo de arquivo inválido. Use "jsx" ou "tsx".');
} else {
  createComponent(componentName, fileType);
}
