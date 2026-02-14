// Run with: node scripts/generate-password-hash.mjs <your-password>
// Copy the output hash and set it as ADMIN_PASSWORD_HASH in .env.local

import bcrypt from "bcryptjs";

const password = process.argv[2];

if (!password) {
  console.error("Usage: node scripts/generate-password-hash.mjs <password>");
  process.exit(1);
}

const hash = bcrypt.hashSync(password, 12);
console.log("\nYour bcrypt hash (copy this to ADMIN_PASSWORD_HASH in .env.local):\n");
console.log(hash);
console.log("");
