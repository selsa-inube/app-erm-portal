import styled from "styled-components";
import { inube } from "@inubekit/inubekit";

import textureBackground from "@assets/images/texturebackground.png";
import { spacing } from "@design/tokens/spacing";

interface IStyledVacationsApproval {
  theme: typeof inube;
}

interface IStyledFooter {
  theme: typeof inube;
}

interface IStyledStaffInfoContainer {
  theme: typeof inube;
}
const StyledVacationsApproval = styled.div<IStyledVacationsApproval>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${spacing.s200};
  width: 100%;
  height: 89vh;
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url(${textureBackground});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const StyledFooter = styled.footer<IStyledFooter>`
  width: 100%;
  justify-content: center;
  align-items: center;
  height: 6vh;
  & p {
    line-height: 5vh;
  }
`;

const StyledStaffInfoContainer = styled.div<IStyledStaffInfoContainer>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  border-radius: 8px;
  height: 20px;
  padding: ${spacing.s100};
  background-color: ${({ theme }) =>
    theme?.palette?.neutral?.N0 || inube.palette.neutral.N0};
  outline: 1px solid
    ${({ theme }) => theme?.palette?.neutral?.N40 || inube.palette.neutral.N40};
`;

export { StyledVacationsApproval, StyledFooter, StyledStaffInfoContainer };
