import { useParams } from "react-router-dom";
import { Text } from "@inubekit/inubekit";

import { useImmediateSupervisorByRequest } from "@hooks/useImmediateSupervisorByRequest";
import { LoadingAppUI } from "@pages/login/outlets/LoadingApp/interface";
import { ErrorPage } from "@components/layout/ErrorPage";

import { StyledVacationsApproval, StyledFooter } from "./styles";
import { VacationApprovalForm } from "./VacationApprovalForm";

function VacationApproval() {
  const { requestId } = useParams();

  const {
    data: supervisorData,
    isLoading: supervisorLoading,
    error,
  } = useImmediateSupervisorByRequest(requestId, {
    showFlag: true,
    flagOptions: {
      flagMessage: "Error al obtener el supervisor inmediato",
      flagTitle: "Error en la solicitud",
      flagIsSuccess: false,
      flagDuration: 8000,
    },
  });

  return (
    <>
      {supervisorLoading ? (
        <LoadingAppUI />
      ) : error ? (
        <ErrorPage errorCode={500} />
      ) : (
        <>
          <StyledVacationsApproval>
            <VacationApprovalForm
              vacationType={supervisorData?.humanResourceRequestType}
              requestId={supervisorData?.humanResourceRequestNumber}
              employeeName={supervisorData?.employeeName}
              employeeSurname={supervisorData?.employeeSurname}
              daysRequested={supervisorData?.daysRequested}
              periodFrom={supervisorData?.periodFrom}
              periodTo={supervisorData?.periodTo}
            />
          </StyledVacationsApproval>
          <StyledFooter>
            <Text textAlign="center" size="large" appearance="gray">
              © *Marca*
            </Text>
          </StyledFooter>
        </>
      )}
    </>
  );
}

export { VacationApproval };
