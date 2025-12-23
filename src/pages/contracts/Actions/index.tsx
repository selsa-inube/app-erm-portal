import { Stack, Text, Icon } from "@inubekit/inubekit";
import { MdOutlineInfo, MdClose } from "react-icons/md";

import { labels } from "@i18n/labels";

import {
  StyledContainer,
  StyledLi,
  StyledUl,
  StyledActions,
  StyledCloseIcon,
} from "./styles";
import { Actions } from "./config";

interface ActionModalProps {
  disableDeleteAction?: boolean;
  disableModifyAction?: boolean;
  disableRenewAction?: boolean;
  disableAddAction?: boolean;
  actionDescriptions?: Record<string, string>;
  onClickEdit?: () => void;
  onClickEliminate?: () => void;
  onClickAdd?: () => void;
  onClickRenew?: () => void;
  onClose?: () => void;
  onInfoIconClick?: (description: string) => void;
}

export function ActionModal(props: ActionModalProps) {
  const {
    disableDeleteAction,
    disableModifyAction,
    disableRenewAction,
    disableAddAction,
    actionDescriptions,
    onClickEdit,
    onClickEliminate,
    onClickAdd,
    onClickRenew,
    onClose,
    onInfoIconClick,
  } = props;

  const actionsLi = Actions(
    onClickAdd,
    onClickEdit,
    onClickRenew,
    onClickEliminate,
  );

  const modifyActions = [
    {
      label: labels.contracts.actions.add,
      onClick: onClickAdd,
      disable: disableAddAction,
    },
    {
      label: labels.contracts.actions.modify,
      onClick: onClickEdit,
      disable: disableModifyAction,
    },
    {
      label: labels.contracts.actions.renew,
      onClick: onClickRenew,
      disable: disableRenewAction,
    },
    {
      label: labels.contracts.actions.terminate,
      onClick: onClickEliminate,
      disable: disableDeleteAction,
      danger: true,
    },
  ];

  modifyActions.forEach(({ label, onClick, disable, danger }) => {
    const actionIndex = actionsLi.findIndex((item) => item.label === label);
    if (actionIndex !== -1) {
      actionsLi[actionIndex].onClick = onClick;
      actionsLi[actionIndex].isDisabled = disable ?? !onClick;
      actionsLi[actionIndex].appearance = actionsLi[actionIndex].isDisabled
        ? "gray"
        : danger
          ? "danger"
          : actionsLi[actionIndex].appearance;
    }
  });

  return (
    <StyledContainer>
      <StyledActions>
        <Stack>
          <StyledUl>
            {actionsLi.map((item, index) => (
              <StyledLi
                key={index}
                onClick={(event) => {
                  if (item.isDisabled) {
                    event.preventDefault();
                    event.stopPropagation();
                    return;
                  }
                  item.onClick?.();
                }}
                $isDisabled={item.isDisabled}
              >
                <Icon
                  icon={item.icon}
                  appearance={item.appearance}
                  disabled={item.isDisabled}
                  size="18px"
                />
                <Text
                  size="medium"
                  appearance={item.isDisabled ? "gray" : "dark"}
                >
                  {item.label}
                </Text>
                {item.isDisabled && onInfoIconClick && (
                  <Icon
                    icon={<MdOutlineInfo />}
                    appearance="primary"
                    size="16px"
                    cursorHover
                    onClick={(event) => {
                      event.stopPropagation();
                      onInfoIconClick(
                        actionDescriptions?.[item.label] ??
                          labels.contracts.modals.addVinculationBlocked,
                      );
                    }}
                  />
                )}
              </StyledLi>
            ))}
          </StyledUl>
          <StyledCloseIcon>
            <Icon
              icon={<MdClose />}
              appearance="dark"
              size="18px"
              onClick={onClose}
              cursorHover
            />
          </StyledCloseIcon>
        </Stack>
      </StyledActions>
    </StyledContainer>
  );
}
