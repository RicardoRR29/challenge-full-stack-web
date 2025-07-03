const { execSync } = require("child_process");

// push o schema para o banco de testes PostgreSQL
execSync("npx prisma db push --schema=prisma/schema.prisma", {
  stdio: "inherit",
});
