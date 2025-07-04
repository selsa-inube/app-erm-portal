import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { useErrorFlag } from "@hooks/useErrorFlag";
import { useHeaders } from "@hooks/useHeaders";
import { deleteHumanResourceRequest } from "@services/humanResourcesRequest/deleteHumanResourceRequest";

export function useDeleteRequest<T extends { requestId?: string }>(
  updateStateFunction: (filterFn: (item: T) => boolean) => void,
) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDeleting, setIsDeleting] = useState(false);
  const [showFlag, setShowFlag] = useState(false);
  const { getHeaders } = useHeaders();

  useErrorFlag(
    showFlag,
    "La solicitud se canceló correctamente",
    "Solicitud Descartada",
    true,
  );

  const handleDelete = async (
    id: string,
    justification: string,
    number: string,
    idField: keyof T = "requestId",
  ) => {
    setIsDeleting(true);
    try {
      const headers = await getHeaders();
      await deleteHumanResourceRequest(id, justification, number, headers);
      updateStateFunction((item: T) => item[idField] !== id);
      setShowFlag(false);
      return true;
    } catch {
      navigate(location.pathname, {
        state: {
          showFlag: true,
          flagTitle: "Error",
          flagMessage: "No se pudo eliminar la solicitud",
          isSuccess: false,
        },
        replace: true,
      });
      return false;
    } finally {
      setIsDeleting(false);
      setShowFlag(true);
    }
  };

  return {
    isDeleting,
    handleDelete,
  };
}
