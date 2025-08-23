import { useSearchParams, useNavigate } from "react-router-dom";

import { ErrorPage } from "@components/layout/ErrorPage";

export function ErrorPageContainer() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const errorCode = parseInt(searchParams.get("code") ?? "0", 10);

  const showFlagParam = searchParams.get("showFlag");
  const showFlag = showFlagParam === "true";

  const flagProps = showFlag
    ? {
        flagMessage: searchParams.get("flagMessage")
          ? decodeURIComponent(searchParams.get("flagMessage")!)
          : undefined,
        flagTitle: searchParams.get("flagTitle")
          ? decodeURIComponent(searchParams.get("flagTitle")!)
          : undefined,
        flagIsSuccess: searchParams.get("flagIsSuccess") === "true",
        flagDuration: searchParams.get("flagDuration")
          ? parseInt(searchParams.get("flagDuration")!, 10)
          : undefined,
      }
    : {};

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <ErrorPage
      errorCode={errorCode}
      onClick={handleGoBack}
      showFlag={showFlag}
      {...flagProps}
    />
  );
}
