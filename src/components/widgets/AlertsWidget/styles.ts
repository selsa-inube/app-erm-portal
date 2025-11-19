import styled from "styled-components";
import { inube } from "@inubekit/inubekit";

interface IStyledAlertWidgetBanner {
  theme: typeof inube;
  clickable?: boolean;
}

const StyledAlertWidgetBanner = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "clickable",
})<IStyledAlertWidgetBanner>`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: ${({ clickable }) => (clickable ? "pointer" : "default")};
`;

export { StyledAlertWidgetBanner };
