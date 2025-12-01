import { MdOutlineVisibility, MdDeleteOutline } from "react-icons/md";

import { formatDate } from "@utils/date";
import {
  ERequestType,
  HumanResourceRequestStatus,
  HumanResourceRequest,
} from "@ptypes/humanResourcesRequest.types";
import { parseDataSafely, getValueFromData } from "@utils/parser";
import { Logger } from "@utils/logger";

import { ICertificationsTable } from "../components/CertificationsTable/types";

export const formatHumanResourceData = (
  requests: HumanResourceRequest[],
): ICertificationsTable[] =>
  requests.map((request) => {
    const parsedData = parseDataSafely(request.humanResourceRequestData);

    return {
      requestId: request.humanResourceRequestId,
      requestNumber: { value: request.humanResourceRequestNumber },
      type: {
        value:
          ERequestType[
            request.humanResourceRequestType as unknown as keyof typeof ERequestType
          ],
      },
      date: { value: formatDate(request.humanResourceRequestDate) },
      status: {
        value:
          HumanResourceRequestStatus[
            request.humanResourceRequestStatus as unknown as keyof typeof HumanResourceRequestStatus
          ],
      },
      details: {
        value: <MdOutlineVisibility />,
        type: "icon" as const,
        onClick: () =>
          Logger.debug("HumanResource | Ver detalles solicitud", {
            requestId: request.humanResourceRequestId,
          }),
      },
      delete: {
        value: <MdDeleteOutline />,
        type: "icon" as const,
        onClick: () =>
          Logger.debug("HumanResource | Eliminar solicitud", {
            requestId: request.humanResourceRequestId,
          }),
      },
      dataDetails: {
        value: {
          ...parsedData,
          description:
            getValueFromData(parsedData, "observations", "") ??
            request.humanResourceRequestDescription,
          contract: getValueFromData(parsedData, "contractDesc", ""),
          observations: getValueFromData(parsedData, "observations", ""),
        },
      },
    };
  });
