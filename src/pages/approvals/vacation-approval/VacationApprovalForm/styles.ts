import styled from "styled-components";
import { inube } from "@inubekit/inubekit";

import { spacing } from "@design/tokens/spacing";

interface IStyledFormContainer {
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
  width: ${({ $isMobile }) => ($isMobile ? "296px" : "786px")};
  height: ${({ $isMobile }) => ($isMobile ? "518px" : "482px")};
  border-radius: 8px;
  background-color: ${({ theme }) =>
    theme?.palette?.neutral?.N0 || inube.palette.neutral.N0};
  box-shadow: 0px 2px 6px 2px
    ${({ theme }) => theme?.palette?.neutral?.N50 || inube.palette.neutral.N50};
  gap: ${({ $isMobile }) => ($isMobile ? spacing.s200 : spacing.s300)};
  padding: ${({ $isMobile }) => ($isMobile ? spacing.s200 : spacing.s400)};
`;

const StyledInputsContainer = styled.div<IStyledInputsContainer>`
  display: flex;
  flex-direction: column;
  gap: ${spacing.s250};
  width: calc(100% - 45px);
  padding: ${spacing.s300};

  border: 1px solid
    ${({ theme }) => theme?.palette?.neutral?.N40 || inube.palette.neutral.N40};
  border-radius: 8px;

  textarea {
    resize: none;
    height: 92px;
  }
`;

export { StyledFormContainer, StyledInputsContainer };
