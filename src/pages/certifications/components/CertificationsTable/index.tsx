import { MdOutlineVisibility, MdOutlineHighlightOff } from "react-icons/md";
import { useState } from "react";
import {
  Text,
  Icon,
  IIcon,
  SkeletonLine,
  useMediaQueries,
  Col,
  Colgroup,
  Pagination,
  Table,
  Tbody,
  Td,
  Tfoot,
  Thead,
  Tr,
} from "@inubekit/inubekit";

import { TextAreaModal } from "@components/modals/TextAreaModal";
import { RequestComponentDetail } from "@components/modals/ComponentDetailModal";

import { CertificationsTableDataDetails, ICertificationsTable } from "./types";
import { StyledTd, StyledTh } from "./styles";
import { columns, headers } from "./tableConfig";
import { usePagination } from "./usePagination";
import { Detail } from "./Detail";

interface CertificationsTableProps {
  data: ICertificationsTable[];
  loading?: boolean;
  disableDeleteAction?: boolean;
  handleDeleteRequest: (requestId: string) => void;
}

function CertificationsTable(props: CertificationsTableProps) {
  const {
    data,
    loading = false,
    disableDeleteAction = false,
    handleDeleteRequest,
  } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<
    { label: string; value: string }[] | null
  >(null);
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(
    null,
  );

  const mediaQueries = useMediaQueries([
    "(max-width: 1024px)",
    "(max-width: 542px)",
  ]);

  const {
    totalRecords,
    handleStartPage,
    handlePrevPage,
    handleNextPage,
    handleEndPage,
    firstEntryInPage,
    lastEntryInPage,
    currentData,
  } = usePagination(data);

  const determineVisibleHeaders = () => {
    if (mediaQueries["(max-width: 542px)"]) {
      return [
        ...headers.filter((header) => ["date", "status"].includes(header.key)),
        {
          label: "Acciones",
          key: "mobileActions",
          action: true,
          style: { width: "50px" },
        },
      ];
    }
    if (mediaQueries["(max-width: 1024px)"]) {
      return headers.filter((header) =>
        ["requestNumber", "date", "status", "details", "delete"].includes(
          header.key,
        ),
      );
    }
    return headers.filter((header) =>
      ["requestNumber", "status", "date", "type", "details", "delete"].includes(
        header.key,
      ),
    );
  };

  const visibleHeaders = determineVisibleHeaders();
  const visibleColumns = mediaQueries["(max-width: 542px)"]
    ? columns.slice(1, 3)
    : mediaQueries["(max-width: 1024px)"]
      ? columns.slice(0, 3)
      : columns;

  const handleOpenModal = (requestId: string) => {
    setSelectedRequestId(requestId);
    setIsSecondModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsSecondModalOpen(false);
    setSelectedRequestId(null);
  };

  const handleClose = () => {
    setIsSecondModalOpen(false);
    setSelectedRecord(null);
    setSelectedRequestId(null);
  };

  const handleOpenDetailsModal = (rowIndex: number) => {
    const dataDe = data[rowIndex].dataDetails
      ?.value as unknown as CertificationsTableDataDetails;
    const dataDeta = [
      { label: "Destinatario", value: dataDe.addressee },
      { label: "Contrato", value: dataDe.contract },
      { label: "Observaciones", value: dataDe.description },
    ];
    setSelectedRecord(dataDeta);
    setIsModalOpen(true);
  };

  const renderCellContent = (
    headerKey: string,
    cellData?: {
      value?: string | number | JSX.Element | CertificationsTableDataDetails;
      type?: string;
      onClick?: () => void;
      hasDeletePrivilege?: boolean;
    },
    rowIndex?: number,
  ) => {
    if (loading) {
      return <SkeletonLine width="100%" animated={true} />;
    }

    if (
      cellData?.type === "icon" &&
      (headerKey === "details" || headerKey === "delete")
    ) {
      if (headerKey === "details") {
        const iconProps: IIcon = {
          appearance: "dark",
          size: "16px",
          cursorHover: true,
          onClick: () =>
            rowIndex !== undefined && handleOpenDetailsModal(rowIndex),
          icon: <MdOutlineVisibility />,
        };
        return <Icon {...iconProps} />;
      }

      if (headerKey === "delete") {
        const hasPrivilege = !disableDeleteAction;
        const requestId = currentData[rowIndex!]?.requestId;

        const iconProps: IIcon = {
          appearance: hasPrivilege ? "danger" : "gray",
          size: "16px",
          onClick: hasPrivilege
            ? () => requestId && handleOpenModal(requestId)
            : undefined,
          cursorHover: hasPrivilege,
          icon: <MdOutlineHighlightOff />,
        };
        return <Icon {...iconProps} />;
      }
    }

    return typeof cellData?.value === "object"
      ? JSON.stringify(cellData.value)
      : cellData?.value;
  };

  const renderTableCell = (
    headerKey: string,
    cellData: {
      type?: string;
      value?: string | number | JSX.Element | CertificationsTableDataDetails;
      onClick?: () => void;
    },
    rowIndex: number,
  ) => {
    const isMobileAction =
      headerKey === "mobileActions" && mediaQueries["(max-width: 542px)"];

    if (isMobileAction) {
      return (
        <Td
          key={headerKey}
          appearance={rowIndex % 2 === 1 ? "dark" : "light"}
          align="center"
          type="custom"
        >
          {loading ? (
            <SkeletonLine width="100%" animated={true} />
          ) : (
            <Detail
              onClickDetails={() => handleOpenDetailsModal(rowIndex)}
              onClickEdit={cellData?.onClick}
              onClickEliminate={
                !disableDeleteAction
                  ? () => handleOpenModal(currentData[rowIndex].requestId!)
                  : undefined
              }
              disableDeleteAction={disableDeleteAction}
            />
          )}
        </Td>
      );
    }
    const cellType =
      headerKey === "details" || headerKey === "delete" || loading
        ? "custom"
        : "text";

    return (
      <StyledTd
        key={headerKey}
        appearance={rowIndex % 2 === 1 ? "dark" : "light"}
        type={cellType}
        align="center"
        style={{ padding: "16px 2px" }}
      >
        {renderCellContent(headerKey, cellData, rowIndex)}
      </StyledTd>
    );
  };

  const renderHeaderRow = () => {
    if (!mediaQueries["(max-width: 542px)"]) {
      const headerSlice = mediaQueries["(max-width: 1024px)"]
        ? headers.slice(1, 4)
        : headers.slice(0, 4);

      return (
        <Tr border="bottom">
          {headerSlice.map((header, index) => (
            <StyledTh key={index} align="center" style={header.style}>
              <b>{header.label}</b>
            </StyledTh>
          ))}
          <StyledTh
            key="acciones"
            colSpan={2}
            align="center"
            style={{ width: "120px" }}
            action
          >
            <b>Acciones</b>
          </StyledTh>
        </Tr>
      );
    }

    return (
      <Tr border="bottom">
        {visibleHeaders.map((header, index) => (
          <StyledTh
            key={index}
            align="center"
            style={header.style}
            action={header.key === "mobileActions"}
          >
            <b>{header.label}</b>
          </StyledTh>
        ))}
      </Tr>
    );
  };

  const renderLoadingRows = () =>
    Array.from({ length: 3 }).map((_, idx) => (
      <Tr key={idx} border="bottom">
        {visibleHeaders.map((_, index) => (
          <Td key={index} colSpan={1} align="center" type="custom">
            <SkeletonLine width="100%" animated />
          </Td>
        ))}
      </Tr>
    ));

  const renderEmptyState = () => (
    <Tr border="bottom">
      <Td colSpan={visibleHeaders.length} align="center" type="custom">
        <Text size="medium">No tiene solicitudes en trámite.</Text>
      </Td>
    </Tr>
  );

  const renderDataRows = () =>
    currentData.map((row: ICertificationsTable, rowIndex: number) => (
      <Tr key={rowIndex} border="bottom">
        {visibleHeaders.map((header) => {
          const cellData = row[header.key as keyof ICertificationsTable] as {
            type?: string;
            value?:
              | string
              | number
              | JSX.Element
              | CertificationsTableDataDetails;
            onClick?: () => void;
          };
          return renderTableCell(
            header.key,
            cellData ?? { value: "" },
            rowIndex,
          );
        })}
      </Tr>
    ));

  return (
    <>
      <Table>
        <Colgroup>
          {visibleColumns.map((col, index) => (
            <Col key={index} span={col.span} style={col.style} />
          ))}
        </Colgroup>
        <Thead>{renderHeaderRow()}</Thead>
        <Tbody>
          {loading
            ? renderLoadingRows()
            : data.length === 0
              ? renderEmptyState()
              : renderDataRows()}
        </Tbody>
        {data.length > 0 && (
          <Tfoot>
            <Tr border="bottom">
              <Td colSpan={visibleHeaders.length} type="custom" align="center">
                <Pagination
                  firstEntryInPage={firstEntryInPage}
                  lastEntryInPage={lastEntryInPage}
                  totalRecords={totalRecords}
                  handleStartPage={handleStartPage}
                  handlePrevPage={handlePrevPage}
                  handleNextPage={handleNextPage}
                  handleEndPage={handleEndPage}
                />
              </Td>
            </Tr>
          </Tfoot>
        )}
      </Table>

      {isModalOpen && selectedRecord && (
        <RequestComponentDetail
          handleClose={handleClose}
          modalContent={selectedRecord}
          title="Detalles de la certificación"
          buttonLabel="Cerrar"
        />
      )}
      {isSecondModalOpen && (
        <TextAreaModal
          title="Cancelación"
          buttonText="Cancelar"
          inputLabel="Justificación"
          inputPlaceholder="¿Por qué eliminarás el registro?"
          onSubmit={() => {
            if (selectedRequestId) {
              handleDeleteRequest(selectedRequestId);
              handleCloseModal();
            }
          }}
          onCloseModal={handleClose}
        />
      )}
    </>
  );
}

export { CertificationsTable };
