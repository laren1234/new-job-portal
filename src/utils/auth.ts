import { User, LoginCredentials, SignUpData } from '../types';

const USERS_KEY = 'job_portal_users';
const CURRENT_USER_KEY = 'job_portal_current_user';

// Hardcoded admin credentials
const ADMIN_CREDENTIALS = {
  email: 'admin@talenthub.com',
  password: 'admin123'
};

export const saveUser = (user: User): void => {
  const users = getUsers();
  const updatedUsers = [...users, user];
  localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));
};

export const getUsers = (): User[] => {
  const stored = localStorage.getItem(USERS_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const findUserByEmail = (email: string): User | undefined => {
  const users = getUsers();
  return users.find(user => user.email.toLowerCase() === email.toLowerCase());
};

export const validateEmail = (email: string): boolean => {
  const gmailRegex = /^[^\s@]+@gmail\.com$/i;
  return gmailRegex.test(email);
};

export const validatePassword = (password: string): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (password.length < 6) {
    errors.push('Password must be at least 6 characters long');
  }
  
  return { valid: errors.length === 0, errors };
};

export const signUp = (signUpData: SignUpData): { success: boolean; error?: string; user?: User } => {
  const { firstName, lastName, email, password, confirmPassword } = signUpData;

  // Validation
  if (!firstName.trim() || !lastName.trim()) {
    return { success: false, error: 'First name and last name are required' };
  }

  if (!validateEmail(email)) {
    return { success: false, error: 'Please enter a valid Gmail address (@gmail.com)' };
  }

  const passwordValidation = validatePassword(password);
  if (!passwordValidation.valid) {
    return { success: false, error: passwordValidation.errors[0] };
  }

  if (password !== confirmPassword) {
    return { success: false, error: 'Passwords do not match' };
  }

  // Check if user already exists
  if (findUserByEmail(email)) {
    return { success: false, error: 'An account with this email already exists' };
  }

  // Create new user
  const newUser: User = {
    id: Date.now().toString(),
    email: email.toLowerCase(),
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    role: 'user',
    createdAt: new Date().toISOString()
  };

  saveUser(newUser);
  setCurrentUser(newUser);

  return { success: true, user: newUser };
};

export const login = (credentials: LoginCredentials): { success: boolean; error?: string; user?: User } => {
  const { email, password } = credentials;

  // Check admin credentials first (admin can use non-Gmail)
  if (email.toLowerCase() === ADMIN_CREDENTIALS.email.toLowerCase() && password === ADMIN_CREDENTIALS.password) {
    const adminUser: User = {
      id: 'admin',
      email: ADMIN_CREDENTIALS.email,
      firstName: 'Admin',
      lastName: 'User',
      role: 'admin',
      createdAt: new Date().toISOString()
    };
    setCurrentUser(adminUser);
    return { success: true, user: adminUser };
  }

  // For regular users, validate Gmail format
  if (!validateEmail(email)) {
    return { success: false, error: 'Please enter a valid Gmail address (@gmail.com)' };
  }

  // Check regular user credentials
  const user = findUserByEmail(email);
  if (!user) {
    return { success: false, error: 'Invalid email or password' };
  }

  // For demo purposes, we'll accept any password for regular users
  // In a real app, you'd hash and compare passwords
  setCurrentUser(user);
  return { success: true, user };
};

export const logout = (): void => {
  localStorage.removeItem(CURRENT_USER_KEY);
};

export const getCurrentUser = (): User | null => {
  const stored = localStorage.getItem(CURRENT_USER_KEY);
  return stored ? JSON.parse(stored) : null;
};

export const setCurrentUser = (user: User): void => {
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
};

export const isAuthenticated = (): boolean => {
  return getCurrentUser() !== null;
};

export const isAdmin = (): boolean => {
  const user = getCurrentUser();
  return user?.role === 'admin';
};