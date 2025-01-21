const { exec } = require("child_process");

if (process.argv.length < 3) {
  console.error("Please provide a migration name.");
  console.log("Usage: node create-migration.js <migration-name>");
  process.exit(1);
}

const migrationName = process.argv[2];
const command = `npx typeorm migration:create ./src/migrations/${migrationName}`;

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error executing command: ${error.message}`);
    return;
  }

  if (stderr) {
    console.error(`Error: ${stderr}`);
    return;
  }

  console.log(stdout);
});
