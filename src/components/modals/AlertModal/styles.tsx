import styled from "styled-components";
import { inube } from "@inubekit/inubekit";

interface IStyledContainer {
  $smallScreen?: boolean;
  theme?: typeof inube;
  width?: string;
}

export const StyledAlertContainer = styled.div<IStyledContainer>`
  background-color: ${({ theme }) =>
    theme?.palette?.neutral?.N0 || inube.palette.neutral.N0};
  border-radius: 8px;

  width: ${({ $smallScreen }) => ($smallScreen ? "335px" : "500px")};
  height: ${({ $smallScreen }) => ($smallScreen ? "460px" : "532px")};

  max-height: ${({ $smallScreen }) => ($smallScreen ? "90vh" : "532px")};

  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const StyledContentScrollable = styled.div<IStyledContainer>`
  flex: 1;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
    border-radius: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) =>
      theme?.palette?.neutral?.N50 || inube.palette.neutral.N50};
    border-radius: 8px;
  }
`;

export const StyledFooter = styled.div`
  padding: 16px;
  display: flex;
  justify-content: flex-end;
  background-color: ${inube.palette.neutral.N0};
`;

export const StyledCloseButton = styled.div`
  cursor: pointer;
`;
