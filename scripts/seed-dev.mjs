#!/usr/bin/env node

/**
 * Dev Fixtures SQL Generator
 * 
 * Generates SQL INSERT statements from JSON fixtures for development use.
 * WARNING: This is for development only - do not run in production!
 * 
 * Usage: node scripts/seed-dev.mjs
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

console.log('🌱 LINAK Client Portal - Dev Fixtures SQL Generator');
console.log('=' .repeat(60));
console.log('⚠️  WARNING: Development use only!');
console.log('=' .repeat(60));

try {
  // Load fixture data
  const usersPath = join(projectRoot, 'fixtures', 'users.json');
  const documentsPath = join(projectRoot, 'fixtures', 'documents.json');
  
  const users = JSON.parse(readFileSync(usersPath, 'utf8'));
  const documents = JSON.parse(readFileSync(documentsPath, 'utf8'));
  
  console.log(`📄 Loaded ${users.length} users and ${documents.length} documents from fixtures`);
  console.log('');
  
  // Generate SQL for users table
  console.log('-- =====================================================');
  console.log('-- Users Table SQL');
  console.log('-- =====================================================');
  console.log('');
  
  users.forEach(user => {
    const sql = `INSERT INTO users (
    id, 
    email, 
    role, 
    first_name, 
    last_name, 
    phone, 
    country, 
    created_at, 
    status,
    profile_data
  ) VALUES (
    '${user.id}',
    '${user.email}',
    '${user.role}', 
    '${user.first_name}',
    '${user.last_name}',
    '${user.phone}',
    '${user.country}',
    '${user.created_at}',
    '${user.status}',
    '${JSON.stringify(user.profile).replace(/'/g, "''")}'
  );`;
    
    console.log(sql);
    console.log('');
  });
  
  console.log('-- =====================================================');
  console.log('-- Documents Table SQL'); 
  console.log('-- =====================================================');
  console.log('');
  
  documents.forEach(doc => {
    const sql = `INSERT INTO documents (
    id,
    client_id,
    filename,
    display_name,
    document_type,
    status,
    upload_date,
    ${doc.reviewed_date ? 'reviewed_date,' : ''}
    ${doc.reviewer ? 'reviewer,' : ''}
    size_bytes,
    mime_type,
    tags,
    notes
    ${doc.rejection_reason ? ',rejection_reason' : ''}
    ${doc.action_required ? ',action_required' : ''}
  ) VALUES (
    '${doc.id}',
    '${doc.client_id}',
    '${doc.filename}',
    '${doc.display_name}',
    '${doc.document_type}',
    '${doc.status}',
    '${doc.upload_date}',
    ${doc.reviewed_date ? `'${doc.reviewed_date}',` : ''}
    ${doc.reviewer ? `'${doc.reviewer}',` : ''}
    ${doc.size_bytes},
    '${doc.mime_type}',
    '${JSON.stringify(doc.tags).replace(/'/g, "''")}',
    '${doc.notes.replace(/'/g, "''")}'
    ${doc.rejection_reason ? `,${doc.rejection_reason.replace(/'/g, "''")}` : ''}
    ${doc.action_required ? `,${doc.action_required.replace(/'/g, "''")}` : ''}
  );`;
    
    console.log(sql);
    console.log('');
  });
  
  console.log('-- =====================================================');
  console.log('-- Seed Generation Complete!');
  console.log('-- ====================================================='); 
  console.log('');
  console.log('📋 Next steps:');
  console.log('1. Review the SQL statements above');
  console.log('2. Copy relevant statements to your database');
  console.log('3. Ensure your database schema matches these columns');
  console.log('');
  console.log('💡 To save to file: node scripts/seed-dev.mjs > seed-output.sql');

} catch (error) {
  console.error('❌ Error generating SQL:', error.message);
  console.log('');
  console.log('🔧 Make sure fixtures/users.json and fixtures/documents.json exist');
  process.exit(1);
}