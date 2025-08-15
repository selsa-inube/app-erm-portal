import { Routes, Route } from "react-router-dom";

import { ErrorPage } from "@components/layout/ErrorPage";
import { VacationApproval } from "@pages/approvals/vacation-approval";

function ApprovalsRoutes() {
  return (
    <Routes>
      <Route
        path="vacation-approval/:requestId"
        element={<VacationApproval />}
      />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export { ApprovalsRoutes };
