import { Text } from "@inubekit/inubekit";

import {
  StyledVacationsApproval,
  StyledFooter,
  StyledStaffInfoContainer,
} from "./styles";
import { VacationApprovalForm } from "./VacationApprovalForm";

function VacationApproval() {
  return (
    <>
      <StyledVacationsApproval>
        <StyledStaffInfoContainer>
          <Text type="label">
            Hola, <b>Pedro Pablo Iregui Guerrero</b> - CC 1111111
          </Text>
        </StyledStaffInfoContainer>
        <VacationApprovalForm />
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
