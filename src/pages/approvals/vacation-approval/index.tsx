import { Text } from "@inubekit/inubekit";

import { StyledVacationsApproval, StyledFooter } from "./styles";
import { VacationApprovalForm } from "./VacationApprovalForm";
import { VacationType } from "./VacationApprovalForm/types";

interface VacationApprovalProps {
  vacationType?: VacationType;
  requestId?: string;
}

function VacationApproval({
  vacationType = "payment",
  requestId = "898433",
}: VacationApprovalProps) {
  return (
    <>
      <StyledVacationsApproval>
        <VacationApprovalForm
          vacationType={vacationType}
          requestId={requestId}
        />
      </StyledVacationsApproval>
      <StyledFooter>
        <Text textAlign="center" size="large" appearance="gray">
          © *Marca*
        </Text>
      </StyledFooter>
    </>
  );
}

export { VacationApproval };
