import {
  useMediaQuery,
  Stack,
  Text,
  Button,
  Icon,
  Tag,
} from "@inubekit/inubekit";
import { MdOutlineAdd, MdOutlineInfo } from "react-icons/md";

import {
  ContractCard,
  ContractCardProps,
} from "@components/cards/ContractCard";
import { labels } from "@i18n/labels";
import { spacing } from "@design/tokens/spacing";
import { AppMenu } from "@components/layout/AppMenu";
import { IRoute } from "@components/layout/AppMenu/types";
import { RequestComponentDetail } from "@components/modals/ComponentDetailModal";
import { SelectModal } from "@components/modals/SelectModal";
import { InfoModal } from "@components/modals/InfoModal";

import {
  StyledContractsContainer,
  StyledSeparatorLine,
  StyledAddVinculation,
  StyledAddVinculationMobile,
} from "./styles";
import { Detail } from "./Detail";
import { ModalType } from "./types";

interface ContractsUIProps {
  appName: string;
  appRoute: IRoute[];
  navigatePage: string;
  hasValidContract: boolean;
  hasFixedEndDate: boolean;
  sortedContracts: ContractCardProps[];
  modals: Record<ModalType, boolean>;
  selectedContract?: ContractCardProps;
  infoModal: {
    open: boolean;
    title: string;
    description: string;
  };
  terminationOptions: { id: string; label: string; value: string }[];
  renewOptions: { id: string; label: string; value: string }[];
  modifyOptions: { id: string; label: string; value: string }[];
  actionDescriptions: Record<string, string>;
  hasPendingRequest?: boolean;
  canCreateRequest?: boolean;
  canTerminate?: boolean;
  canRenew?: boolean;
  canModify?: boolean;
  onTerminate: () => void;
  onRenew: () => void;
  onModify: () => void;
  onAddVinculation: () => void;
  onDetailsClick: (contract: ContractCardProps) => void;
  onOpenModal: (modal: ModalType) => void;
  onCloseModal: (modal: ModalType) => void;
  onSubmit: (action: ModalType) => (values: { selection: string }) => void;
  onOpenInfoModal: (description: string) => void;
  onSetInfoModal: React.Dispatch<
    React.SetStateAction<{
      open: boolean;
      title: string;
      description: string;
    }>
  >;
}

function ContractsUI(props: ContractsUIProps) {
  const {
    appName,
    appRoute,
    navigatePage,
    hasValidContract,
    hasFixedEndDate,
    sortedContracts,
    modals,
    selectedContract,
    infoModal,
    terminationOptions,
    renewOptions,
    modifyOptions,
    actionDescriptions,
    hasPendingRequest,
    canCreateRequest,
    canTerminate,
    canRenew,
    canModify,
    onTerminate,
    onRenew,
    onModify,
    onAddVinculation,
    onDetailsClick,
    onCloseModal,
    onSubmit,
    onOpenInfoModal,
    onSetInfoModal,
  } = props;

  const isTablet = useMediaQuery("(max-width: 1235px)");
  const isMobile = useMediaQuery("(max-width: 550px)");

  return (
    <>
      <AppMenu
        appName={appName}
        appRoute={appRoute}
        navigatePage={navigatePage}
      >
        <StyledContractsContainer $isMobile={isMobile}>
          <Stack justifyContent="space-between">
            <Text type="title" size="medium">
              {labels.contracts.title}
            </Text>
            {isTablet ? (
              <Detail
                onClickEdit={hasValidContract ? onModify : undefined}
                onClickEliminate={hasValidContract ? onTerminate : undefined}
                onClickAdd={canCreateRequest ? onAddVinculation : undefined}
                onClickRenew={
                  hasFixedEndDate && hasValidContract ? onRenew : undefined
                }
                disableModifyAction={!hasValidContract || !canModify}
                disableRenewAction={
                  !hasFixedEndDate || !hasValidContract || !canRenew
                }
                disableDeleteAction={!hasValidContract || !canTerminate}
                disableAddAction={!canCreateRequest}
                actionDescriptions={actionDescriptions}
                onInfoIconClick={onOpenInfoModal}
              />
            ) : (
              <Stack gap={spacing.s150}>
                <Stack gap={spacing.s025} alignItems="center">
                  <Button
                    appearance="danger"
                    spacing="compact"
                    variant="outlined"
                    disabled={!hasValidContract || !canTerminate}
                    cursorHover
                    onClick={
                      hasValidContract && canTerminate ? onTerminate : undefined
                    }
                  >
                    {labels.contracts.actions.terminate}
                  </Button>
                  {(!hasValidContract || !canTerminate) && (
                    <Icon
                      icon={<MdOutlineInfo />}
                      appearance="primary"
                      size="16px"
                      cursorHover
                      onClick={() =>
                        onOpenInfoModal(
                          labels.contracts.infoModal.addVinculationDisabled,
                        )
                      }
                    />
                  )}
                </Stack>
                <Stack gap={spacing.s025} alignItems="center">
                  <Button
                    disabled={
                      !hasFixedEndDate || !hasValidContract || !canRenew
                    }
                    variant="outlined"
                    cursorHover
                    spacing="compact"
                    onClick={
                      hasFixedEndDate && hasValidContract && canRenew
                        ? onRenew
                        : undefined
                    }
                  >
                    {labels.contracts.actions.renew}
                  </Button>
                  {(!hasFixedEndDate || !hasValidContract || !canRenew) && (
                    <Icon
                      icon={<MdOutlineInfo />}
                      appearance="primary"
                      size="16px"
                      cursorHover
                      onClick={() =>
                        onOpenInfoModal(actionDescriptions.Renovar)
                      }
                    />
                  )}
                </Stack>
                <StyledSeparatorLine />
                <Stack gap={spacing.s025} alignItems="center">
                  <Button
                    cursorHover
                    spacing="compact"
                    disabled={!hasValidContract || !canModify}
                    onClick={
                      hasValidContract && canModify ? onModify : undefined
                    }
                  >
                    {labels.contracts.actions.modify}
                  </Button>
                  {(!hasValidContract || !canModify) && (
                    <Icon
                      icon={<MdOutlineInfo />}
                      appearance="primary"
                      size="16px"
                      cursorHover
                      onClick={() =>
                        onOpenInfoModal(actionDescriptions.Modificar)
                      }
                    />
                  )}
                </Stack>
                <Stack gap={spacing.s025} alignItems="center">
                  <Button
                    disabled={!canCreateRequest}
                    iconBefore={<MdOutlineAdd />}
                    cursorHover
                    spacing="compact"
                    onClick={canCreateRequest ? onAddVinculation : undefined}
                  >
                    {labels.contracts.actions.addVinculation}
                  </Button>
                  {!canCreateRequest && (
                    <Icon
                      icon={<MdOutlineInfo />}
                      appearance="primary"
                      size="16px"
                      cursorHover
                      onClick={() =>
                        onOpenInfoModal(
                          "No se puede agregar vinculación, ya que no tiene privilegios para ejecutar esta acción.",
                        )
                      }
                    />
                  )}
                </Stack>
              </Stack>
            )}
          </Stack>

          {!hasValidContract && (
            <Stack>
              <Tag
                appearance={hasPendingRequest ? "primary" : "danger"}
                label={
                  hasPendingRequest
                    ? labels.contracts.tags.pendingRequest
                    : labels.contracts.tags.noContract
                }
              />
            </Stack>
          )}

          <Stack
            wrap="wrap"
            gap={isMobile ? spacing.s200 : spacing.s300}
            alignItems="flex-end"
            justifyContent={isMobile ? "center" : "flex-start"}
          >
            {sortedContracts.map((contract, index) => (
              <ContractCard
                key={index}
                {...contract}
                onDetailsClick={() => onDetailsClick(contract)}
              />
            ))}
            {canCreateRequest && !isTablet && (
              <div onClick={canCreateRequest ? onAddVinculation : undefined}>
                <StyledAddVinculation>
                  <Icon
                    appearance="gray"
                    icon={<MdOutlineAdd />}
                    size="45px"
                    cursorHover={canCreateRequest}
                  />
                  <Text appearance="gray">Agregar vinculación</Text>
                </StyledAddVinculation>
              </div>
            )}
          </Stack>
        </StyledContractsContainer>
      </AppMenu>

      {isTablet && canCreateRequest && (
        <div onClick={canCreateRequest ? onAddVinculation : undefined}>
          <StyledAddVinculationMobile>
            <Icon
              appearance="primary"
              variant="filled"
              spacing="wide"
              shape="circle"
              icon={<MdOutlineAdd />}
              size="50px"
              cursorHover={canCreateRequest}
            />
          </StyledAddVinculationMobile>
        </div>
      )}

      {modals.detail && selectedContract && (
        <RequestComponentDetail
          title={labels.contracts.modals.detailTitle}
          buttonLabel={labels.contracts.modals.detailCloseButton}
          modalContent={[
            {
              label: labels.contracts.modals.detailFields.workplace,
              value: selectedContract.workplace,
            },
            {
              label: labels.contracts.modals.detailFields.formalizationDate,
              value: selectedContract.formalizationDate,
            },
            {
              label: labels.contracts.modals.detailFields.workSchedule,
              value: selectedContract.workSchedule,
            },
            {
              label: labels.contracts.modals.detailFields.lastSalary,
              value: selectedContract.lastSalary,
            },
            ...(!selectedContract.isContractValid
              ? [
                  {
                    label: labels.contracts.modals.detailFields.retirementDate,
                    value: selectedContract.retirementDate ?? "",
                  },
                  {
                    label:
                      labels.contracts.modals.detailFields.retirementReason,
                    value: selectedContract.retirementReason ?? "",
                  },
                ]
              : []),
          ]}
          handleClose={() => onCloseModal("detail")}
          stackDirection="column"
        />
      )}

      {modals.terminate && (
        <SelectModal
          title={labels.contracts.modals.selectTitle}
          description={labels.contracts.modals.selectDescription}
          portalId="portal"
          loading={false}
          selectionOptions={terminationOptions}
          onCloseModal={() => onCloseModal("terminate")}
          onSubmit={onSubmit("terminate")}
        />
      )}

      {modals.renew && (
        <SelectModal
          title={labels.contracts.modals.selectTitle}
          description={labels.contracts.modals.selectDescription}
          portalId="portal"
          loading={false}
          selectionOptions={renewOptions}
          onCloseModal={() => onCloseModal("renew")}
          onSubmit={onSubmit("renew")}
        />
      )}

      {modals.modify && (
        <SelectModal
          title={labels.contracts.modals.selectTitle}
          description={labels.contracts.modals.selectDescription}
          portalId="portal"
          loading={false}
          selectionOptions={modifyOptions}
          onCloseModal={() => onCloseModal("modify")}
          onSubmit={onSubmit("modify")}
        />
      )}

      {infoModal.open && (
        <InfoModal
          title={infoModal.title}
          titleDescription={labels.contracts.modals.infoTitleDescription}
          description={infoModal.description}
          onCloseModal={() =>
            onSetInfoModal({ open: false, title: "", description: "" })
          }
        />
      )}
    </>
  );
}

export { ContractsUI };
