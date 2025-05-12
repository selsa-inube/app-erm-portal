import React from "react";
import { useState, useRef, useEffect } from "react";
import { Text, Icon, Stack, useMediaQuery } from "@inubekit/inubekit";
import { useNavigate } from "react-router-dom";
import {
  MdCached,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
} from "react-icons/md";

import bannerImage from "@assets/images/banner.png";
import { WidgetBanner } from "@components/cards/WidgetBanner";
import { spacing } from "@design/tokens/spacing";

import { getStatusConfig } from "./config";
import {
  StyledRadioClient,
  StyledBannerImage,
  VerticalDivider,
  MobileToggle,
  MobileDropdown,
} from "./styles";

export interface VinculationBannerProps {
  name: string;
  status: string;
  imageUrl: string;
  redirectUrl?: string;
  pendingDays?: number;
  infoItems: InfoItemProps[];
}

interface InfoItemProps {
  icon: JSX.Element;
  value: number | string;
  label: string;
  onClick?: () => void;
}

function VinculationBanner(props: VinculationBannerProps) {
  const { name, status, redirectUrl, infoItems } = props;
  const navigate = useNavigate();
  const { color, icon, label } = getStatusConfig(status);
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleRef = useRef<HTMLDivElement>(null);

  const isMobile = useMediaQuery("(max-width: 550px)");

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        toggleRef.current &&
        !toggleRef.current.contains(event.target as Node)
      ) {
        setIsExpanded(false);
      }
    };

    if (isMobile && isExpanded) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isExpanded, isMobile]);

  return (
    <StyledRadioClient>
      <Stack
        gap={spacing.s150}
        alignItems="center"
        justifyContent="space-between"
        width="100%"
      >
        <Stack gap={spacing.s150} alignItems="center">
          <StyledBannerImage src={bannerImage} alt={name} />
          <Stack direction="column">
            <Text type="label" weight="bold" size="medium">
              {name}
            </Text>
            <Stack gap={spacing.s075} alignItems="center">
              <Text size="small" appearance="gray">
                Empleado
              </Text>
              <Icon
                appearance={color}
                icon={icon}
                spacing="narrow"
                shape="rectangle"
                size="12px"
              />
              <Text type="label" size="small" appearance={color}>
                {label}
              </Text>
            </Stack>
          </Stack>
          <Stack alignItems="center" gap={spacing.s100}>
            {redirectUrl && (
              <Icon
                appearance="primary"
                icon={<MdCached />}
                cursorHover
                spacing="narrow"
                variant="outlined"
                shape="rectangle"
                size="20px"
                onClick={() => navigate(redirectUrl)}
              />
            )}
          </Stack>
        </Stack>

        {isMobile ? (
          <div ref={toggleRef}>
            <MobileToggle onClick={() => setIsExpanded((prev) => !prev)}>
              <Icon
                icon={
                  isExpanded ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />
                }
                appearance="primary"
                size="24px"
                cursorHover
              />
            </MobileToggle>

            {isExpanded && (
              <MobileDropdown>
                <Stack
                  direction="column"
                  gap={spacing.s100}
                  alignItems="flex-start"
                >
                  {infoItems.map((item, index) => (
                    <WidgetBanner
                      key={index}
                      icon={item.icon}
                      value={item.value}
                      label={item.label}
                      onClick={() => {
                        if (item.onClick) item.onClick();
                        setIsExpanded(false);
                      }}
                    />
                  ))}
                </Stack>
              </MobileDropdown>
            )}
          </div>
        ) : (
          <Stack direction="row" gap={spacing.s100} alignItems="center">
            {infoItems
              .slice()
              .reverse()
              .map((item, index) => (
                <React.Fragment key={index}>
                  <VerticalDivider />
                  <WidgetBanner
                    icon={item.icon}
                    value={item.value}
                    label={item.label}
                    onClick={item.onClick}
                  />
                </React.Fragment>
              ))}
          </Stack>
        )}
      </Stack>
    </StyledRadioClient>
  );
}

export { VinculationBanner };
