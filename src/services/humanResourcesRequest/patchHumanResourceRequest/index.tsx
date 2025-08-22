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
    const errorText = await response.text();
    console.error("Error response:", {
      status: response.status,
      statusText: response.statusText,
      body: errorText,
      headers: Object.fromEntries(response.headers.entries()),
    });
    throw new Error(`HTTP ${response.status}: ${errorText}`);
  }

  const result = await response.json();

  return result;
}
