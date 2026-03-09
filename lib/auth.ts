export type Role = 'ADMIN' | 'EDITOR' | 'CLIENT' | 'GUEST';

export interface User {
  id: string;
  name: string;
  role: Role;
}

// Mocked user for demonstration purposes.
// In a real application, this would come from a session cookie or JWT.
export const MOCK_USER: User = {
  id: '1',
  name: 'Ahmed Client',
  role: 'ADMIN' // Change to ADMIN or EDITOR to test other views
};

export function getUserRole(): Role {
  // Mock function to simulate fetching the user role from a server session
  return MOCK_USER.role;
}

export function hasAccess(userRole: Role, requiredRoles: Role[]) {
  if (userRole === 'ADMIN') return true; // Admins overrides
  return requiredRoles.includes(userRole);
}
