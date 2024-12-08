import { User } from '../types';

export const saveUser = (user: Omit<User, 'id' | 'createdAt' | 'role'>) => {
  const users = getUsers();
  const newUser = {
    ...user,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    role: 'user', // Default role for new users
  };
  
  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));
  return newUser;
};

export const getUsers = (): User[] => {
  const users = localStorage.getItem('users');
  return users ? JSON.parse(users) : [];
};

export const findUserByEmail = (email: string): User | undefined => {
  const users = getUsers();
  return users.find(user => user.email === email);
};

export const validateLogin = (email: string, password: string): User | null => {
  const user = findUserByEmail(email);
  if (user && user.password === password) {
    return user;
  }
  return null;
};

export const isAdmin = (user: User): boolean => {
  return user.role === 'admin';
};

export const getCurrentUser = (): User | null => {
  const userStr = localStorage.getItem('currentUser');
  return userStr ? JSON.parse(userStr) : null;
};

export const checkIsAdmin = (): boolean => {
  const user = getCurrentUser();
  return user ? isAdmin(user) : false;
};

// Initialize admin user if not exists
export const initializeAdmin = () => {
  const adminEmail = 'divainers@gmail.com';
  const admin = findUserByEmail(adminEmail);
  
  if (!admin) {
    const adminUser = {
      email: adminEmail,
      password: '32049221',
      nickname: '바라던합격',
      role: 'admin',
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    
    const users = getUsers();
    users.push(adminUser);
    localStorage.setItem('users', JSON.stringify(users));
  }
};