#!/usr/bin/env node

/**
 * Dev Fixtures Seed Script for LINAK Client Portal
 * 
 * This script generates step-by-step Supabase SQL/CLI commands to insert demo data.
 * It does NOT automatically execute commands - you must run them manually in Supabase SQL Editor.
 * 
 * Usage: node scripts/seed-dev.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fixturesDir = path.join(__dirname, '..', 'fixtures');

console.log('🌱 LINAK Client Portal - Dev Fixtures Seed Script\n');
console.log('⚠️  IMPORTANT: This script generates SQL commands but does NOT execute them automatically.');
console.log('   Copy and paste the SQL commands into your Supabase SQL Editor to insert dev data.\n');

try {
  // Load fixture data
  const usersData = JSON.parse(fs.readFileSync(path.join(fixturesDir, 'users.json'), 'utf8'));
  const documentsData = JSON.parse(fs.readFileSync(path.join(fixturesDir, 'documents.json'), 'utf8'));

  console.log('📋 STEP 1: Insert Demo Users');
  console.log('============================================');
  console.log('Copy and paste this SQL into Supabase SQL Editor:\n');
  
  console.log('-- Insert demo users into profiles table');
  usersData.forEach(user => {
    console.log(`INSERT INTO profiles (id, email, full_name, role, created_at, updated_at) VALUES`);
    console.log(`  ('${user.id}', '${user.email}', '${user.full_name}', '${user.role}', '${user.created_at}', '${user.updated_at}');`);
  });
  
  console.log('\n📄 STEP 2: Insert Demo Documents');
  console.log('============================================');
  console.log('Copy and paste this SQL into Supabase SQL Editor:\n');
  
  console.log('-- Insert demo documents into documents table');
  documentsData.forEach(doc => {
    console.log(`INSERT INTO documents (id, title, description, file_path, file_type, file_size, status, client_id, uploaded_at, processed_at, tags) VALUES`);
    console.log(`  ('${doc.id}', '${doc.title}', '${doc.description}', '${doc.file_path}', '${doc.file_type}', ${doc.file_size}, '${doc.status}', '${doc.client_id}', '${doc.uploaded_at}', ${doc.processed_at ? `'${doc.processed_at}'` : 'NULL'}, ARRAY['${doc.tags.join("', '")}']);`);
  });

  console.log('\n🔐 STEP 3: Authentication Setup (Optional)');
  console.log('============================================');
  console.log('If you want to create actual auth users, use Supabase Auth UI or CLI:\n');
  
  usersData.forEach(user => {
    console.log(`-- Create auth user for ${user.email}`);
    console.log(`-- Use Supabase Dashboard > Authentication > Users > "Add User"`);
    console.log(`-- Email: ${user.email}, Password: demo123456, Auto-confirm: true`);
  });

  console.log('\n📁 STEP 4: Storage Setup (Optional)');
  console.log('============================================');
  console.log('Create storage bucket and folders:\n');
  console.log('1. Go to Supabase Dashboard > Storage');
  console.log('2. Create bucket: "client-documents" (make it public if needed)');
  console.log('3. Upload demo files to these paths:');
  
  documentsData.forEach(doc => {
    console.log(`   - ${doc.file_path}`);
  });

  console.log('\n✅ NEXT STEPS:');
  console.log('==============');
  console.log('1. Copy the SQL commands above into Supabase SQL Editor');
  console.log('2. Execute each INSERT statement');
  console.log('3. Verify data was inserted in Database > Tables');
  console.log('4. Test authentication with demo@linak.com / demo123456');
  console.log('5. Check document upload/download functionality\n');

  console.log('🎯 Dev environment is ready for testing!');

} catch (error) {
  console.error('❌ Error reading fixture files:', error.message);
  console.log('\nMake sure you have created the fixture files:');
  console.log('- fixtures/users.json');
  console.log('- fixtures/documents.json');
}
