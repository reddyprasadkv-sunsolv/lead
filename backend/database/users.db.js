const crypto = require('crypto');

// Utility to hash passwords securely using PBKDF2 with salt
function hashPassword(password, salt = crypto.randomBytes(16).toString('hex')) {
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  return { salt, hash };
}

// Utility to verify password against stored salt and hash
function verifyPassword(password, salt, storedHash) {
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  return hash === storedHash;
}

// Pre-hashed secure credentials
const adminCreds = hashPassword('Sunsolv@2026Secure!', 'sunsolv_admin_salt_2026');
const consultantCreds = hashPassword('Sunsolv#Advisory2026', 'sunsolv_consultant_salt_2026');

const USERS = [
  {
    id: 'usr_admin_info',
    name: 'Sunsolv Admin',
    email: 'info@sunsolv.in',
    role: 'Super Admin',
    salt: adminCreds.salt,
    hash: adminCreds.hash,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-08-01T00:00:00.000Z'
  },
  {
    id: 'usr_admin_01',
    name: 'Sunsolv Administrator',
    email: 'admin@sunsolv.in',
    role: 'Super Admin',
    salt: adminCreds.salt,
    hash: adminCreds.hash,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-08-01T00:00:00.000Z'
  },
  {
    id: 'usr_consultant_01',
    name: 'Senior Solution Architect',
    email: 'consultant@sunsolv.in',
    role: 'Solution Consultant',
    salt: consultantCreds.salt,
    hash: consultantCreds.hash,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-08-01T00:00:00.000Z'
  }
];

// Token generation & verification using HMAC SHA256
const JWT_SECRET = process.env.JWT_SECRET || 'sunsolv_enterprise_secret_key_2026_@hyd';

function generateToken(user) {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const payload = Buffer.from(JSON.stringify({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 hours validity
  })).toString('base64url');

  const signature = crypto
    .createHmac('sha256', JWT_SECRET)
    .update(`${header}.${payload}`)
    .digest('base64url');

  return `${header}.${payload}.${signature}`;
}

function verifyToken(token) {
  if (!token || typeof token !== 'string') return null;
  const parts = token.split('.');
  if (parts.length !== 3) return null;

  const [header, payload, signature] = parts;
  const expectedSig = crypto
    .createHmac('sha256', JWT_SECRET)
    .update(`${header}.${payload}`)
    .digest('base64url');

  if (signature !== expectedSig) return null;

  try {
    const decoded = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    if (decoded.exp && decoded.exp < Math.floor(Date.now() / 1000)) {
      return null; // Expired
    }
    return decoded;
  } catch (err) {
    return null;
  }
}

module.exports = {
  USERS,
  verifyPassword,
  generateToken,
  verifyToken
};
