import styled from "styled-components";
import { inube } from "@inubekit/inubekit";

import { spacing } from "@design/tokens/spacing";

export interface IStyledAlertContainer {
  $smallScreen?: boolean;
  width?: string;
  theme?: typeof inube;
}

export interface IStyledContentScrollable {
  $smallScreen?: boolean;
  theme?: typeof inube;
  maxHeight?: string;
}

export interface IStyledDividerContainer {
  $smallScreen?: boolean;
  theme?: typeof inube;
}

export const StyledAlertContainer = styled.div<IStyledAlertContainer>`
  background-color: ${({ theme }) =>
    theme?.palette?.neutral?.N0 || inube.palette.neutral.N0};
  border-radius: 8px;
  width: ${({ $smallScreen }) => ($smallScreen ? "335px" : "500px")};
  height: ${({ $smallScreen }) => ($smallScreen ? "460px" : "532px")};
  max-height: ${({ $smallScreen }) => ($smallScreen ? "90vh" : "532px")};
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: ${spacing.s300};
`;

export const StyledContentScrollable = styled.div<IStyledContentScrollable>`
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

export const StyledCloseButton = styled.div`
  cursor: pointer;
`;
