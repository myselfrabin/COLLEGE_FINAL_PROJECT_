import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AdminUser } from '../models/AdminUser.js';

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body || {};
    const user = await AdminUser.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    const ok = await bcrypt.compare(password || '', user.passwordHash);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ sub: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET || 'dev_secret', { expiresIn: '2d' });
    return res.status(200).json({ token });
  } catch (e) {
    return res.status(500).json({ message: 'Login failed' });
  }
};

// Utility seed endpoint (optional for development)
export const seedAdmin = async (req, res) => {
  try {
    const { email = 'admin@koshi.local', password = 'admin123' } = req.body || {};
    const exists = await AdminUser.findOne({ email });
    if (exists) return res.status(200).json({ message: 'Admin exists' });
    const passwordHash = await bcrypt.hash(password, 10);
    await AdminUser.create({ email, passwordHash, role: 'admin' });
    return res.status(201).json({ message: 'Admin created', email });
  } catch (e) {
    return res.status(500).json({ message: 'Seed failed' });
  }
};


