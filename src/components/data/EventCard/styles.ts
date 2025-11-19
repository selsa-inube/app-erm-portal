import styled from "styled-components";
import { inube } from "@inubekit/inubekit";

import { spacing } from "@design/tokens/spacing";

interface IStyledEventCard {
  theme: typeof inube;
}

const StyledEventCard = styled.div<IStyledEventCard>`
  border-radius: 8px;
  padding: ${spacing.s200};
  background-color: ${({ theme }) =>
    theme?.palette?.neutral?.N0 || inube.palette.neutral.N0};
  display: flex;
  align-items: center;

  box-shadow: 0px 2px 6px 1px
    ${({ theme }) => theme?.palette?.neutral?.N50 ?? inube.palette.neutral.N50};
`;

export { StyledEventCard };
