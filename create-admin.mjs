import { createAdminUser } from "./server/db.js";

const username = process.argv[2] || "admin";
const password = process.argv[3] || "admin123";
const email = process.argv[4] || "admin@nukleo.digital";

console.log("Creating admin user...");
console.log(`Username: ${username}`);
console.log(`Email: ${email}`);

try {
  await createAdminUser({ username, password, email });
  console.log("✅ Admin user created successfully!");
  console.log(`\nYou can now login at /admin/login with:`);
  console.log(`Username: ${username}`);
  console.log(`Password: ${password}`);
  process.exit(0);
} catch (error) {
  console.error("❌ Error creating admin user:", error.message);
  process.exit(1);
}
