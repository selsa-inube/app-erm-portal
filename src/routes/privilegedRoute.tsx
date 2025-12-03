import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { InfoModal } from "@components/modals/InfoModal";
import { useAppContext } from "@context/AppContext";

export function PrivilegedRoute({
  children,
  requiredPrivilege,
}: {
  children: React.ReactNode;
  requiredPrivilege: string;
}) {
  const { staffUseCasesData, selectedEmployee, staffUser } = useAppContext();
  const navigate = useNavigate();

  const hasPrivilege =
    staffUseCasesData?.listOfUseCases?.includes(requiredPrivilege) ?? false;

  const isSelfRequest =
    !!selectedEmployee?.identificationDocumentNumber &&
    !!staffUser?.identificationDocumentNumber &&
    selectedEmployee.identificationDocumentNumber ===
      staffUser.identificationDocumentNumber;

  const denied = !hasPrivilege || isSelfRequest;

  const [infoModalOpen, setInfoModalOpen] = useState(denied);

  useEffect(() => {
    setInfoModalOpen(denied);
  }, [denied]);

  const description = isSelfRequest
    ? "No es posible realizar solicitudes a nombre propio desde el portal de gestor. Para realizar esta acción, ingrese al Portal de Empleados."
    : "Ya que no tiene un contrato activo o no cuenta con los privilegios necesarios.";

  if (denied) {
    return (
      <>
        {infoModalOpen && (
          <InfoModal
            title="Acción inhabilitada"
            titleDescription="¿Por qué está inhabilitado?"
            description={description}
            onCloseModal={() => {
              setInfoModalOpen(false);
              navigate("/", { replace: true });
            }}
          />
        )}
      </>
    );
  }

  return <>{children}</>;
}
