import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAppContext } from "@context/AppContext";

export function useRedirectIfNoEmployee() {
  const { selectedEmployee } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedEmployee) {
      navigate("/employees/select-employee", { replace: true });
    }
  }, [selectedEmployee, navigate]);

  return selectedEmployee;
}
