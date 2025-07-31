import styled from "styled-components";
import { inube } from "@inubekit/inubekit";

import { spacing } from "@design/tokens/spacing";

interface IStyledFormContainer {
  $isMobile: boolean;
  theme?: typeof inube;
}

interface IStyledRequestInfo {
  $isMobile: boolean;
  theme?: typeof inube;
}

interface IStyledInputsContainer {
  $isMobile: boolean;
  theme?: typeof inube;
}

const StyledFormContainer = styled.div<IStyledFormContainer>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: ${({ $isMobile }) => ($isMobile ? "296px" : "836px")};
  height: ${({ $isMobile }) => ($isMobile ? "572px" : "508px")};
  border-radius: 8px;
  background-color: ${({ theme }) =>
    theme?.palette?.neutral?.N0 || inube.palette.neutral.N0};
  box-shadow: 0px 2px 6px 2px
    ${({ theme }) => theme?.palette?.neutral?.N50 || inube.palette.neutral.N50};
  gap: ${({ $isMobile }) => ($isMobile ? spacing.s200 : spacing.s300)};
  padding: ${({ $isMobile }) => ($isMobile ? spacing.s200 : spacing.s400)};
`;

const StyledRequestInfo = styled.div<IStyledRequestInfo>`
  display: flex;
  flex-direction: column;
  width: calc(100% - 26px);
  height: ${({ $isMobile }) => ($isMobile ? "94px" : "50px")};
  gap: ${spacing.s150};
  padding: ${spacing.s150};
  background-color: ${({ theme }) =>
    theme?.palette?.neutral?.N10 || inube.palette.neutral.N10};
  border: 1px solid
    ${({ theme }) => theme?.palette?.neutral?.N70 || inube.palette.neutral.N70};
  border-radius: 8px;
  justify-content: space-between;
`;

const StyledInputsContainer = styled.div<IStyledInputsContainer>`
  display: flex;
  flex-direction: column;
  gap: ${spacing.s250};
  width: calc(100% - 50px);
  padding: ${spacing.s300};
  height: ${({ $isMobile }) => ($isMobile ? "244px" : "220px")};
  border: 1px solid
    ${({ theme }) => theme?.palette?.neutral?.N40 || inube.palette.neutral.N40};
  border-radius: 8px;

  textarea {
    resize: none;
    height: 92px;
  }
`;

export { StyledFormContainer, StyledRequestInfo, StyledInputsContainer };
