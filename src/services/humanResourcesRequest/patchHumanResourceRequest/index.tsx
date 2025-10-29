import { environment } from "@config/environment";

import { IPatchHumanResourceResponse, IPatchRequestBody } from "./types";

export async function patchHumanResourceRequest(
  requestBody: IPatchRequestBody,
  headers: Record<string, string>,
): Promise<IPatchHumanResourceResponse> {
  const response = await fetch(
    `${environment.IVITE_IHUREM_PERSISTENCE_PROCESS_SERVICE}/human-resources-requests`,
    {
      method: "PATCH",
      headers: {
        ...headers,
        "X-Action": "UpdateHumanResourcesRequest",
        Accept: "application/json",
      },
      body: JSON.stringify(requestBody),
    },
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMessage =
      errorData?.message ?? `HTTP ${response.status}: ${response.statusText}`;

    console.error("Error response:", {
      status: response.status,
      statusText: response.statusText,
      message: errorMessage,
      body: errorData,
      headers: Object.fromEntries(response.headers.entries()),
    });

    throw new Error(errorMessage);
  }

  const result = await response.json();

  return result;
}
