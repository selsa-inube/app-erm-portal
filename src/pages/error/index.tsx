import { useSearchParams, useNavigate } from "react-router-dom";

import { ErrorPage } from "@components/layout/ErrorPage";
import { useFlagParams } from "@hooks/useFlagParams";

export function ErrorPageContainer() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const flagParams = useFlagParams();

  const errorCode = parseInt(searchParams.get("code") ?? "0", 10);

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <ErrorPage
      errorCode={errorCode}
      onClick={handleGoBack}
      showFlag={flagParams.showFlag}
      flagMessage={flagParams.flagMessage}
      flagTitle={flagParams.flagTitle}
      flagIsSuccess={flagParams.flagIsSuccess}
      flagDuration={flagParams.flagDuration}
    />
  );
}
