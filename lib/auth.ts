export type Role = 'ADMIN' | 'EDITOR' | 'CLIENT' | 'GUEST';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

/**
 * Check if a user has access based on their role
 * @param userRole - Current user's role
 * @param requiredRoles - Array of roles that have access
 * @returns True if user has access, false otherwise
 */
export function hasAccess(userRole: Role, requiredRoles: Role[]): boolean {
  // ADMIN has access to everything
  if (userRole === 'ADMIN') return true;
  
  // Check if user's role is in the required roles list
  return requiredRoles.includes(userRole);
}

/**
 * Role hierarchy for comparison
 * Higher number = more permissions
 */
export const ROLE_HIERARCHY: Record<Role, number> = {
  GUEST: 0,
  CLIENT: 1,
  EDITOR: 2,
  ADMIN: 3,
};

/**
 * Check if user has at least the minimum required role level
 * @param userRole - Current user's role
 * @param minimumRole - Minimum required role
 * @returns True if user has sufficient role level
 */
export function hasMinimumRole(userRole: Role, minimumRole: Role): boolean {
  return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[minimumRole];
}
