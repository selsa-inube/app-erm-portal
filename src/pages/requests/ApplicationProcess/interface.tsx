import { useState } from "react";
import { useParams } from "react-router-dom";
import { Stack } from "@inubekit/inubekit";

import { AppMenu } from "@components/layout/AppMenu";
import { IRoute } from "@components/layout/AppMenu/types";
import { mockPendingTasks, mockCompletedTasks } from "@config/TaskBoard.config";
import { FormValues } from "@components/modals/SelectModal/types";
import { mockStaffMembers } from "@mocks/staff/staff.mock";
import { useAppContext } from "@context/AppContext";
import { useErrorFlag } from "@hooks/useErrorFlag";
import { mockRequirements } from "@mocks/requirements/requirementsTable.mock";
import { RequirementsModal } from "@components/modals/RequirementsModal";

import { RequestSummary } from "./Components/RequestSummary";
import { TaskBoard } from "./Components/TaskBoard";
import { SelectStaffModal } from "./modal/SelectStaffModal";
import { IStaffInfo } from "./types";

interface ApplicationProcessUIProps {
  appName: string;
  appRoute: IRoute[];
  navigatePage: string;
}

function ApplicationProcessUI(props: ApplicationProcessUIProps) {
  const { appName, appRoute, navigatePage } = props;

  const { id } = useParams<{ id: string }>();
  const { user } = useAppContext();

  const [staffInfo, setStaffInfo] = useState<IStaffInfo>({ id: "", name: "" });
  const [showStaffModal, setShowStaffModal] = useState(false);
  const [isRequirementsModalOpen, setIsRequirementsModalOpen] = useState(false);
  const [showSuccessFlag, setShowSuccessFlag] = useState(false);

  useErrorFlag(
    showSuccessFlag,
    "El nuevo responsable se asignó con éxito.",
    "Responsable asignado.",
    true,
    5000,
  );

  const handleEditStaff = () => setShowStaffModal(true);
  const handleCloseModal = () => setShowStaffModal(false);

  const handleStaffSubmit = (values: FormValues) => {
    const selectedStaffId = values.selection;
    const selectedStaff = mockStaffMembers.find(
      (staff) =>
        staff.value === selectedStaffId || staff.label === selectedStaffId,
    );

    if (selectedStaff) {
      setStaffInfo({
        id: selectedStaff.value,
        name: selectedStaff.label,
      });
    } else {
      setStaffInfo({
        id: selectedStaffId,
        name: user?.username ?? "",
      });
    }

    setShowStaffModal(false);

    setShowSuccessFlag(true);

    setTimeout(() => {
      setShowSuccessFlag(false);
    }, 300);
  };

  const onSubmit = (modalType: string) => (values: FormValues) => {
    if (modalType === "staffSelect") {
      handleStaffSubmit(values);
    }
  };

  const handleDiscard = () => {
    console.log("Discard request");
  };

  const handleSeeRequirements = () => {
    setIsRequirementsModalOpen(true);
  };

  return (
    <AppMenu appName={appName} appRoute={appRoute} navigatePage={navigatePage}>
      <Stack direction="column">
        <RequestSummary
          requestNumber={id}
          staffName={staffInfo.name}
          onDiscard={handleDiscard}
          onSeeRequirements={handleSeeRequirements}
          onEditStaff={handleEditStaff}
        />
        <TaskBoard
          pendingTasks={mockPendingTasks}
          completedTasks={mockCompletedTasks}
          isResponsible={true}
        />

        {showStaffModal && (
          <SelectStaffModal
            title="Cambiar responsable"
            portalId="portal"
            loading={false}
            selectionOptions={mockStaffMembers}
            selectedEmployee={user ?? undefined}
            initialSelection={staffInfo.id}
            onCloseModal={handleCloseModal}
            onSubmit={onSubmit("staffSelect")}
          />
        )}

        {isRequirementsModalOpen && (
          <RequirementsModal
            title="Requisitos"
            buttonLabel="Cerrar"
            requirements={mockRequirements}
            handleClose={() => setIsRequirementsModalOpen(false)}
          />
        )}
      </Stack>
    </AppMenu>
  );
}

export { ApplicationProcessUI };
