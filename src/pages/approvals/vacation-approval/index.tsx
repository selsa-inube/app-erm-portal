import { useParams } from "react-router-dom";
import { Text } from "@inubekit/inubekit";

import { useImmediateSupervisorByRequest } from "@hooks/useImmediateSupervisorByRequest";
import { LoadingAppUI } from "@pages/login/outlets/LoadingApp/interface";

import { StyledVacationsApproval, StyledFooter } from "./styles";
import { VacationApprovalForm } from "./VacationApprovalForm";

function VacationApproval() {
  const { requestId } = useParams();

  const { data: supervisorData, isLoading: supervisorLoading } =
    useImmediateSupervisorByRequest(requestId);

  return (
    <>
      {supervisorLoading ? (
        <LoadingAppUI />
      ) : (
        <>
          <StyledVacationsApproval>
            <VacationApprovalForm
              vacationType={supervisorData?.humanResourceRequestType}
              requestId={supervisorData?.humanResourceRequestNumber}
              employeeName={supervisorData?.employeeName}
              employeeSurname={supervisorData?.employeeSurname}
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
