import { useSearchParams } from "react-router-dom";

interface FlagParams {
  showFlag: boolean;
  flagMessage?: string;
  flagTitle?: string;
  flagIsSuccess?: boolean;
  flagDuration?: number;
}

export const useFlagParams = (): FlagParams => {
  const [searchParams] = useSearchParams();

  const showFlag = searchParams.get("showFlag") === "true";

  return {
    showFlag,
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
  };
};
