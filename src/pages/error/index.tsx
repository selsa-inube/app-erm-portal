import { useSearchParams } from "react-router-dom";

import { ErrorPage } from "@components/layout/ErrorPage";
import { useFlagParams } from "@hooks/useFlagParams";
import { useErrorFlag } from "@hooks/useErrorFlag";

export function ErrorPageContainer() {
  const [searchParams] = useSearchParams();

  const flagParams = useFlagParams();

  const codeError = searchParams.get("code");
  const errorCode = codeError ? parseInt(codeError, 10) : 404;

  useErrorFlag(
    flagParams.showFlag,
    flagParams.flagMessage,
    flagParams.flagTitle,
    flagParams.flagIsSuccess,
    flagParams.flagDuration,
  );

  return <ErrorPage errorCode={errorCode} />;
}
