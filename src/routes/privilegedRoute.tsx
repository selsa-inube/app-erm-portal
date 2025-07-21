import { useState } from "react";
import { useAppContext } from "@context/AppContext";
import { InfoModal } from "@components/modals/InfoModal";

export function PrivilegedRoute({
  children,
  requiredPrivilege,
}: {
  children: React.ReactNode;
  requiredPrivilege: string;
}) {
  const { staffUseCasesData } = useAppContext();

  const hasPrivilege =
    staffUseCasesData?.listOfUseCases?.includes(requiredPrivilege) ?? false;

  const [infoModal, setInfoModal] = useState(true);

  if (!hasPrivilege) {
    return (
      <>
        {infoModal && (
          <InfoModal
            title="Acción inhabilitada"
            titleDescription="¿Por qué está inhabilitado?"
            description="Ya que no tiene un contrato activo o no cuenta con los privilegios necesarios."
            onCloseModal={() => setInfoModal(false)}
          />
        )}
      </>
    );
  }

  return <>{children}</>;
}
