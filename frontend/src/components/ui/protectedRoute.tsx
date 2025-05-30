import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({
  isAllowed,
  redirectPath,
  children,
}: {
  isAllowed: boolean;
  redirectPath: string;
  children: ReactNode;
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAllowed) {
      navigate(redirectPath);
    }
  }, [navigate, redirectPath, isAllowed]);

  if (!isAllowed) return <></>;

  return <>{children}</>;
};

export default ProtectedRoute;
