import { Text } from "@inubekit/inubekit";

import { StyledVacationsApproval, StyledFooter } from "./styles";

function VacationApproval() {
  return (
    <>
      <StyledVacationsApproval></StyledVacationsApproval>
      <StyledFooter>
        <Text textAlign="center" size="large" appearance="gray">
          © *Marca*
        </Text>
      </StyledFooter>
    </>
  );
}

export { VacationApproval };
