import styled from "styled-components";
import { inube } from "@inubekit/inubekit";

import { spacing } from "@design/tokens/spacing";

interface IStyledQuickAccessContainer {
  theme: typeof inube;
}

interface IStyledFooter {
  theme?: typeof inube;
}

const StyledAppPage = styled.div`
  display: flex;
  justify-content: center;
  padding: ${spacing.s1000};

  @media (max-width: 700px) {
    padding: ${spacing.s400};
  }
`;

const StyledQuickAccessContainer = styled.div<IStyledQuickAccessContainer>`
  position: relative;
  align-items: center;
  justify-content: center;

  @media (min-width: 769px) {
    padding: ${spacing.s250};
    gap: ${spacing.s250};
    border-radius: ${spacing.s100};
    border: 1px solid
      ${({ theme }) =>
        theme?.palette?.neutral?.N30 || inube.palette.neutral.N30};
  }
`;

const StyledFinalLogo = styled.img`
  width: 34px;
  height: 34px;
  object-fit: contain;
`;

const StyledFooter = styled.footer<IStyledFooter>`
  position: fixed;
  bottom: 0;
  right: 0;
  padding: ${spacing.s100} ${spacing.s200};
  background-color: ${({ theme }) =>
    theme?.palette?.neutral?.N10 || inube.palette.neutral.N10};
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: ${spacing.s050};
  border-top-left-radius: ${spacing.s100};
  z-index: 10;
`;

export {
  StyledAppPage,
  StyledQuickAccessContainer,
  StyledFinalLogo,
  StyledFooter,
};
