import { ReactNode, useState, useEffect } from "react";
import { InfoModal } from "@components/modals/InfoModal";
import { baseNavLinks } from "@config/nav.config";

interface ProtectedRouteProps {
  element: ReactNode;
  optionCode?: string;
  enforcePrivilegeCheck?: boolean;
  isFetching?: boolean;
}

export function ProtectedRoute({
  element,
  optionCode,
  enforcePrivilegeCheck,
  isFetching,
}: ProtectedRouteProps) {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (isFetching) return;

    let hasPrivilege = true;

    if (optionCode) {
      hasPrivilege = baseNavLinks.some(
        (link) => link.path.toLowerCase() === `/${optionCode.toLowerCase()}`,
      );
    }

    if (!hasPrivilege || enforcePrivilegeCheck) {
      setShowModal(true);
    }
  }, [optionCode, enforcePrivilegeCheck, isFetching]);

  if (showModal) {
    return (
      <InfoModal
        title="Acceso denegado"
        titleDescription="No tienes privilegios para acceder a esta ruta o es una ruta incorrecta."
        description="Por favor, contacta con el administrador si crees que es un error."
        buttonText="Entendido"
        onCloseModal={() => (window.location.href = "/")}
      />
    );
  }

  return <>{element}</>;
}
