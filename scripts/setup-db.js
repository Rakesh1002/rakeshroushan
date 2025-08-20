#!/usr/bin/env node

/**
 * Database Setup Script for Payload CMS
 * 
 * This script helps you set up your database for development.
 * Run with: node scripts/setup-db.js
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up Payload CMS Database...\n');

// Check if .env.local exists
const envPath = path.join(process.cwd(), '.env.local');
if (!fs.existsSync(envPath)) {
  console.log('❌ .env.local file not found!');
  console.log('📝 Please create .env.local with the following variables:\n');
  
  const envTemplate = `# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/your_database"

# Payload CMS Configuration
PAYLOAD_SECRET="your-super-secret-key-here-min-32-chars"
NEXT_PUBLIC_PAYLOAD_URL="http://localhost:3000"

# Email Configuration (Optional)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com" 
SMTP_PASS="your-app-password"
SMTP_FROM="noreply@yourdomain.com"

# Additional Configuration
NODE_ENV="development"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
`;

  console.log(envTemplate);
  console.log('\n💡 Database Options:');
  console.log('1. 🌐 Vercel Postgres (Recommended for production)');
  console.log('   - Visit: https://vercel.com/storage/postgres');
  console.log('   - Create database and copy connection string');
  console.log('');
  console.log('2. 🐘 Local PostgreSQL');
  console.log('   - Install: https://postgresql.org/download/');
  console.log('   - Create database: createdb your_blog_db');
  console.log('   - URL format: postgresql://username:password@localhost:5432/your_blog_db');
  console.log('');
  console.log('3. ☁️ Cloud Providers:');
  console.log('   - Railway: https://railway.app/');
  console.log('   - Supabase: https://supabase.com/');
  console.log('   - Neon: https://neon.tech/');
  console.log('');
  process.exit(1);
}

console.log('✅ .env.local found!');

// Load environment variables
require('dotenv').config({ path: envPath });

if (!process.env.DATABASE_URL) {
  console.log('❌ DATABASE_URL not found in .env.local');
  console.log('📝 Please add your database connection string to .env.local');
  process.exit(1);
}

if (!process.env.PAYLOAD_SECRET) {
  console.log('❌ PAYLOAD_SECRET not found in .env.local');
  console.log('📝 Please add a secure secret (32+ characters) to .env.local');
  console.log('💡 You can generate one at: https://generate-secret.vercel.app/32');
  process.exit(1);
}

console.log('✅ Environment variables configured!');
console.log('🔗 Database URL: ' + process.env.DATABASE_URL.replace(/:[^:@]*@/, ':****@'));

try {
  console.log('\n🔧 Installing dependencies...');
  execSync('pnpm install', { stdio: 'inherit' });
  
  console.log('\n🗄️ Setting up database schema...');
  console.log('ℹ️  Payload will automatically create tables on first run');
  
  console.log('\n✅ Setup complete!');
  console.log('\n🚀 Next steps:');
  console.log('1. Run: pnpm dev');
  console.log('2. Visit: http://localhost:3000/admin');
  console.log('3. Create your first admin user');
  console.log('4. Start creating blog posts!');
  
} catch (error) {
  console.error('❌ Setup failed:', error.message);
  process.exit(1);
}