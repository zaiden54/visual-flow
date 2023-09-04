import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

type PrivatePropsType = {
  children?: React.ReactElement;
  isAllowed: boolean;
  redirectTo: string;
};

export default function PrivateRouter({
  children,
  isAllowed,
  redirectTo,
}: PrivatePropsType): JSX.Element {
  if (!isAllowed) {
    return <Navigate to={redirectTo} />;
  }
  return children || <Outlet />;
}
