import { useAuth0 } from "@auth0/auth0-react";

import { useAppContext } from "@context/AppContext";

export const useHeaders = () => {
  const { selectedClient, staffUser } = useAppContext();
  const { getAccessTokenSilently } = useAuth0();

  const getHeaders = async () => {
    const accessToken = await getAccessTokenSilently();
    return {
      "Content-type": "application/json; charset=UTF-8",
      "X-Business-unit": selectedClient?.name ?? "",
      "X-User-Name": staffUser?.userAccount ?? "",
      Authorization: `Bearer ${accessToken}`,
    };
  };

  return { getHeaders };
};
