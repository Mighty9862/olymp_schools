import crypto from 'crypto';

export const generateResetCode = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const bytes = crypto.randomBytes(8);
  let code = '';
  
  for (let i = 0; i < 8; i++) {
    code += chars[bytes[i] % chars.length];
  }
  
  return code;
};