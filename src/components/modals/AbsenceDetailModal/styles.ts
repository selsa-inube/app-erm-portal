import styled from "styled-components";
import { inube } from "@inubekit/inubekit";

import { spacing } from "@design/tokens/spacing";

interface IStyledModal {
  $smallScreen: boolean;
  theme: typeof inube;
}

interface IStyledBoxAttribute extends IStyledModal {
  $isLongContent?: boolean;
}

interface IStyledTableContainer {
  $smallScreen: boolean;
  theme: typeof inube;
}

export const StyledModal = styled.div<IStyledModal>`
  display: flex;
  flex-direction: column;
  width: ${({ $smallScreen }) => ($smallScreen ? "303px" : "550px")};
  max-height: ${({ $smallScreen }) => ($smallScreen ? "476px" : "362px")};
  background-color: ${inube.palette.neutral.N0};
  padding: ${({ $smallScreen }) =>
    $smallScreen ? spacing.s200 : spacing.s300};
  gap: ${({ $smallScreen }) => ($smallScreen ? spacing.s200 : spacing.s300)};
  border-radius: ${spacing.s100};
  overflow-x: hidden;

  ::-webkit-scrollbar {
    width: 8px;
    border-radius: 8px;
  }
  ::-webkit-scrollbar-track {
    background: ${({ theme }) =>
      theme?.palette?.neutral?.N30 || inube.palette.neutral.N30};
    border-radius: 8px;
  }
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) =>
      theme?.palette?.neutral?.N50 || inube.palette.neutral.N50};
    border-radius: 8px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) =>
      theme?.palette?.neutral?.N70 || inube.palette.neutral.N70};
  }
`;

export const StyledContainerContent = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  padding: ${spacing.s075};
`;

export const StyledContainerClose = styled.div`
  cursor: pointer;
  align-content: center;
`;

export const StyledContainerTitle = styled.div`
  display: flex;
  margin: ${spacing.s0};
  padding: ${spacing.s0};
  justify-content: space-between;
`;

export const StyledGridContainer = styled.div<IStyledModal>`
  display: grid;
  grid-template-columns: ${({ $smallScreen }) =>
    $smallScreen ? "1fr" : "1fr 1fr"};
  gap: ${spacing.s150};
`;

export const StyledBoxAttribute = styled.div<IStyledBoxAttribute>`
  align-items: center;
  border-radius: 8px;
  padding: ${({ $smallScreen }) =>
    $smallScreen ? spacing.s100 : `${spacing.s075} ${spacing.s150}`};
  background-color: ${({ theme }) =>
    theme?.palette?.neutral?.N10 || inube.palette.neutral.N10};
  width: auto;
  overflow-wrap: break-word;
  ${({ $isLongContent }) => $isLongContent && `grid-column: 1 / -1;`}
`;

export const StyledTableContainer = styled.div<IStyledTableContainer>`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border: 2px solid
    ${({ theme }) => theme?.palette?.neutral?.N30 || inube.palette.neutral.N30};
  padding: ${({ $smallScreen }) =>
    $smallScreen ? `${spacing.s050} ${spacing.s0}` : `${spacing.s050}`};
  border-radius: 8px;
`;
