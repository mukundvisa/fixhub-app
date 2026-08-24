const mysql = require("mysql2/promise");

const config = {
  host: "localhost",
  user: "root",
  password: "",
};

async function setup() {
  let connection;
  try {
    console.log("Connecting to MySQL server at localhost...");
    connection = await mysql.createConnection(config);

    // 1. Create database if it doesn't exist
    console.log("Creating database 'fixhub' if not exists...");
    await connection.query("CREATE DATABASE IF NOT EXISTS fixhub");
    console.log("Database 'fixhub' is ready.");

    // Use the database
    await connection.query("USE fixhub");

    // 2. Create Users table
    console.log("Creating 'users' table...");
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        phone VARCHAR(20) DEFAULT NULL,
        gender VARCHAR(20) DEFAULT NULL,
        bio TEXT DEFAULT NULL,
        address VARCHAR(255) DEFAULT NULL,
        city VARCHAR(100) DEFAULT NULL,
        country VARCHAR(100) DEFAULT NULL,
        pincode VARCHAR(20) DEFAULT NULL,
        profile_image VARCHAR(255) DEFAULT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 3. Create Fixcode table
    console.log("Creating 'fixcode' table...");
    await connection.query(`
      CREATE TABLE IF NOT EXISTS fixcode (
        id INT AUTO_INCREMENT PRIMARY KEY,
        programming_language VARCHAR(255) NOT NULL,
        program_title VARCHAR(255) NOT NULL,
        fix_code TEXT NOT NULL,
        user_id INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 4. Create Contacts table
    console.log("Creating 'contacts' table...");
    await connection.query(`
      CREATE TABLE IF NOT EXISTS contacts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        subject VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 5. Create Menus table
    console.log("Creating 'menus' table...");
    await connection.query(`
      CREATE TABLE IF NOT EXISTS menus (
        id INT AUTO_INCREMENT PRIMARY KEY,
        menu_json TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 6. Seed default menu if empty
    console.log("Checking if 'menus' table has any records...");
    const [rows] = await connection.query("SELECT COUNT(*) as count FROM menus");
    if (rows[0].count === 0) {
      console.log("Seeding default menu structure...");
      const defaultMenu = [
        { name: "Home", path: "/" },
        { name: "About Us", path: "/about" },
        { name: "Contact Us", path: "/contact" },
        { name: "Publish Fix", path: "/add-fix" },
        {
          name: "Dashboard",
          children: [
            { name: "My Fixes", path: "/my-fixes" },
            { name: "My Profile", path: "/profile" }
          ]
        }
      ];
      await connection.query(
        "INSERT INTO menus (menu_json) VALUES (?)",
        [JSON.stringify(defaultMenu)]
      );
      console.log("Default menu successfully seeded!");
    } else {
      console.log("Menus table already has records, skipping seeding.");
    }

    console.log("\nDatabase setup completed successfully! 🎉");
  } catch (error) {
    console.error("\n❌ Database setup failed:");
    console.error(error);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
      console.log("MySQL connection closed.");
    }
  }
}

setup();
