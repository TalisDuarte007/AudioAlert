const fs = require("fs");
const path = require("path");

function checkAndCreateConfig() {
  // Salvar o arquivo na raiz do projeto
  const filePath = path.join(__dirname, "../../../../alarms_config.json");

  if (!fs.existsSync(filePath)) {
    const defaultConfig = { alarms: [] };
    fs.writeFileSync(filePath, JSON.stringify(defaultConfig, null, 2), "utf-8");
    console.log("Arquivo criado em:", filePath);
    return "Arquivo criado!";
  }
  console.log("Arquivo já existe em:", filePath);
  return "Arquivo já existe!";
}

module.exports = { checkAndCreateConfig };
