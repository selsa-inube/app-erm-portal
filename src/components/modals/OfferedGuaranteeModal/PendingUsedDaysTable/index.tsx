import {
  Text,
  SkeletonLine,
  Col,
  Colgroup,
  Table,
  Tbody,
  Td,
  Thead,
  Tr,
} from "@inubekit/inubekit";

import {
  contractTableHeaders,
  paymentTableHeaders,
  contractTableColumns,
  paymentTableColumns,
} from "./tableConfig";
import { IPendingUsedDaysTable, IPendingUsedDaysTableHeader } from "./types";
import { StyledTd, StyledTh } from "./styles";

export interface PendingUsedDaysTableProps {
  data: IPendingUsedDaysTable[];
  loading: boolean;
  variant?: "contract" | "payment";
  headers: IPendingUsedDaysTableHeader[];
}

function PendingUsedDaysTable(props: PendingUsedDaysTableProps) {
  const { data, loading = false, variant } = props;

  const headers =
    variant === "contract" ? contractTableHeaders : paymentTableHeaders;

  const columns =
    variant === "contract" ? contractTableColumns : paymentTableColumns;

  const renderTableCell = (
    headerKey: string,
    cellData: {
      type?: string;
      value?: string | number | JSX.Element;
      onClick?: () => void;
    },
    rowIndex: number,
  ) => {
    const cellType = loading ? "custom" : "text";

    return (
      <StyledTd
        key={headerKey}
        appearance={rowIndex % 2 === 1 ? "dark" : "light"}
        type={cellType}
        align={
          headerKey === "contract"
            ? "left"
            : headerKey === "pendingDays"
              ? "right"
              : headerKey === "startDate" || headerKey === "usageMode"
                ? "left"
                : "right"
        }
        style={{ padding: "0 20px" }}
      >
        {renderCellContent(headerKey, cellData)}
      </StyledTd>
    );
  };

  const renderCellContent = (
    _headerKey: string,
    cellData?: {
      value?: string | number | JSX.Element;
      type?: string;
      onClick?: () => void;
      hasDeletePrivilege?: boolean;
    },
  ) => {
    if (loading) {
      return <SkeletonLine width="100%" animated={true} />;
    }

    return cellData?.value;
  };

  return (
    <Table>
      <Colgroup>
        {columns.map((column, index) => (
          <Col key={index} span={column.span} style={column.style} />
        ))}
      </Colgroup>
      <Thead>
        <Tr border="bottom">
          {headers.map((header, index) => (
            <StyledTh key={index} action={false} align="center">
              <b>{header.label}</b>
            </StyledTh>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {loading ? (
          [...Array(3)].map((_, index) => (
            <Tr key={index} border="bottom">
              {headers.map((_, cellIndex) => (
                <Td
                  key={cellIndex}
                  align="center"
                  type="custom"
                  appearance={index % 2 === 1 ? "dark" : "light"}
                >
                  <SkeletonLine width="100%" animated={true} />
                </Td>
              ))}
            </Tr>
          ))
        ) : data.length === 0 ? (
          <Tr border="bottom">
            <Td colSpan={headers.length} align="center" type="custom">
              <Text size="medium">No tiene solicitudes en trámite.</Text>
            </Td>
          </Tr>
        ) : (
          data.map((row: IPendingUsedDaysTable, rowIndex: number) => (
            <Tr key={rowIndex} border="bottom">
              {headers.map((header) => {
                const cellData = row[header.key];
                return renderTableCell(
                  header.key,
                  cellData ?? { value: "" },
                  rowIndex,
                );
              })}
            </Tr>
          ))
        )}
      </Tbody>
    </Table>
  );
}

export { PendingUsedDaysTable };
