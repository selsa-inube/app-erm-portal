import styled from "styled-components";
import { Link } from "react-router-dom";
import { inube } from "@inubekit/inubekit";
import { spacing } from "@design/tokens/spacing";

interface StyledMainProps {
  $isTablet: boolean;
  theme?: typeof inube;
}

interface IStyledCollapseIcon {
  $collapse: boolean;
  $isTablet: boolean;
}

const StyledAppPage = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  box-sizing: border-box;
`;

const StyledContainer = styled.div`
  flex: 1;
`;

interface IStyledFooter {
  theme?: typeof inube;
}

const StyledMain = styled.main<StyledMainProps>`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: ${({ $isTablet }) =>
    $isTablet
      ? `0 ${spacing.s250} ${spacing.s0}`
      : `0 ${spacing.s800} ${spacing.s0}`};
  max-width: 1312px;
  width: auto;
  margin: 0 auto;
`;

const StyledContentImg = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: ${spacing.s100};
`;

const StyledLogo = styled.img`
  max-width: 100px;
  max-height: 32px;
  height: auto;
`;

const StyledQuickAccessContainer = styled.div<StyledMainProps>`
  padding: ${spacing.s200};
  border: 1px solid
    ${({ theme }) => theme?.palette?.neutral?.N30 || inube.palette.neutral.N30};
  display: flex;
  flex-direction: row;
  gap: ${spacing.s200};
  flex-wrap: wrap;
  border-radius: ${spacing.s100};
  justify-content: ${({ $isTablet }) => ($isTablet ? "center" : "flex-start")};
`;

const StyledCollapseIcon = styled.div<IStyledCollapseIcon>`
  display: flex;
  transition: all 500ms ease;
  position: absolute;
  top: ${({ $isTablet }) => ($isTablet ? "15px" : "13px")};
  transform: ${({ $collapse }) =>
    $collapse ? "rotate(-90deg)" : "rotate(90deg)"};
  left: ${({ $isTablet }) => ($isTablet ? "160px" : "130px")};
`;

const StyledCollapse = styled.div`
  position: absolute;
  top: 48px;
  z-index: 1;
`;

const StyledFinalLogo = styled.img`
  width: 43px;
  height: 43px;
  object-fit: contain;
`;

const StyledFooter = styled.footer<IStyledFooter>`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: ${spacing.s200} ${spacing.s400};
  background-color: ${({ theme }) =>
    theme?.palette?.neutral?.N10 || inube.palette.neutral.N10};
  box-sizing: border-box;
  margin-top: auto;
`;

export {
  StyledAppPage,
  StyledContainer,
  StyledContentImg,
  StyledLogo,
  StyledMain,
  StyledQuickAccessContainer,
  StyledCollapseIcon,
  StyledCollapse,
  StyledFinalLogo,
  StyledFooter,
};
