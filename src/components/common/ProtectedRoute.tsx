import React from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { AccessRestricted } from './AccessRestricted';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
  pageTitle?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
  pageTitle,
}) => {
  const { currentRole } = useApp();

  const isAllowed = allowedRoles.includes(currentRole);

  if (!isAllowed) {
    return <AccessRestricted requiredRole={allowedRoles} pageTitle={pageTitle} />;
  }

  return <>{children}</>;
};
