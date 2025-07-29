import styled from "styled-components";
import { inube } from "@inubekit/inubekit";

import textureBackground from "@assets/images/texturebackground.png";

interface IStyledVacationsApproval {
  theme: typeof inube;
}

interface IStyledFooter {
  theme: typeof inube;
}

const StyledVacationsApproval = styled.div<IStyledVacationsApproval>`
  width: 100%;
  height: 89vh;
  background-image: url(${textureBackground});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 50%;
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

export { StyledVacationsApproval, StyledFooter };
