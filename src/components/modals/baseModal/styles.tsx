import styled from "styled-components";
import { inube } from "@inubekit/inubekit";

interface IStyledContainer {
  $smallScreen: boolean;
  theme?: typeof inube;
}

export const StyledContainerClose = styled.div`
  cursor: pointer;
`;

export const StyledContainer = styled.div<IStyledContainer>`
  background-color: ${({ theme }) =>
    theme?.palette?.neutral?.N0 || inube.palette.neutral.N0};
  border-radius: 8px;
  width: ${({ $smallScreen }) => ($smallScreen ? "335px" : "450px")};
  height: ${({ $smallScreen }) => ($smallScreen ? "auto" : "636px")};
  max-width: ${({ $smallScreen }) => ($smallScreen ? "90%" : "450px")};
`;
