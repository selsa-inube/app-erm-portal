import styled from "styled-components";
import { inube } from "@inubekit/inubekit";

interface IStyledEmployeeSeniorityWidget {
  theme: typeof inube;
  clickable?: boolean;
}

const StyledEmployeeSeniorityWidget = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "clickable",
})<IStyledEmployeeSeniorityWidget>`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  cursor: ${({ clickable }) => (clickable ? "pointer" : "default")};
`;

export { StyledEmployeeSeniorityWidget };
