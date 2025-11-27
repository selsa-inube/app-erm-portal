import styled from "styled-components";
import { inube } from "@inubekit/inubekit";

interface IStyledAbsenceWidgetBanner {
  theme: typeof inube;
  clickable?: boolean;
}

const StyledAbsenceWidgetBanner = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "clickable",
})<IStyledAbsenceWidgetBanner>`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: ${({ clickable }) => (clickable ? "pointer" : "default")};
`;

export { StyledAbsenceWidgetBanner };
