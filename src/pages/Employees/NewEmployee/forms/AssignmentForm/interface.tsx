import { useState } from "react";
import {
  Stack,
  Button,
  useMediaQuery,
  IOption,
  Spinner,
  Text,
  Icon,
} from "@inubekit/inubekit";
import { MdOutlineAdd } from "react-icons/md";

import { spacing } from "@design/tokens/spacing";
import { AssignmentCard } from "@components/data/AssignmentCard";
import { currencyFormat } from "@utils/forms/currency";

import { AddAssignmentModal } from "./modals/AddAssignmentModal";
import { FormValues } from "./modals/AddAssignmentModal/types";
import { StyledContainer, StyledAddMobile } from "./styles";
import { IAssignment } from "../../types";

interface AssignmentFormUIProps {
  assignmentOptions: IOption[];
  assignments: IAssignment[];
  withNextButton?: boolean;
  isLoading?: boolean;
  onAssignmentsChange: (assignments: IAssignment[]) => void;
  handleNextStep: () => void;
  handlePreviousStep: () => void;
}

function AssignmentFormUI(props: AssignmentFormUIProps) {
  const {
    withNextButton,
    assignments,
    assignmentOptions = [],
    isLoading = false,
    onAssignmentsChange,
    handleNextStep,
    handlePreviousStep,
  } = props;

  const isMobile = useMediaQuery("(max-width: 600px)");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleSubmitAssignment = (values: FormValues) => {
    const selectedOption = assignmentOptions.find(
      (option) => option.id === values.assignment,
    );

    const newAssignment: IAssignment = {
      title: `Asignación ${assignments.length + 1}`,
      assignment: selectedOption?.label ?? values.assignment,
      value: currencyFormat(values.value),
    };

    onAssignmentsChange([...assignments, newAssignment]);
    handleCloseModal();
  };

  const renderEmptyState = () => (
    <StyledContainer $isMobile={isMobile}>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        gap={spacing.s350}
      >
        <Text
          type="title"
          size={isMobile ? "small" : "large"}
          appearance="gray"
        >
          Aún <b>NO</b> hay asignaciones. Define asignaciones con el botón.
        </Text>
        <Button
          cursorHover
          iconBefore={<MdOutlineAdd />}
          onClick={handleOpenModal}
        >
          Agregar asignación
        </Button>
      </Stack>
    </StyledContainer>
  );

  const renderAssignments = () => (
    <Stack
      direction="column"
      width="100%"
      gap={spacing.s250}
      alignItems="flex-end"
    >
      {!isMobile && (
        <Button
          cursorHover
          iconBefore={<MdOutlineAdd />}
          onClick={handleOpenModal}
        >
          Agregar asignación
        </Button>
      )}

      <Stack
        width="100%"
        gap={spacing.s250}
        wrap="wrap"
        justifyContent={isMobile ? "center" : "flex-start"}
      >
        {assignments.map((item, index) => (
          <AssignmentCard
            key={index}
            title={item.title}
            assignment={item.assignment}
            value={item.value}
            isMobile={isMobile}
          />
        ))}
      </Stack>
    </Stack>
  );

  const renderNavigationButtons = () => (
    <Stack justifyContent="flex-end" gap={spacing.s250}>
      <Button onClick={handlePreviousStep} appearance="gray" variant="outlined">
        Anterior
      </Button>
      <Button onClick={handleNextStep}>Siguiente</Button>
    </Stack>
  );

  if (assignments.length === 0) {
    return (
      <>
        {renderEmptyState()}
        {isModalOpen && (
          <AddAssignmentModal
            onCloseModal={handleCloseModal}
            onSubmit={handleSubmitAssignment}
            assignmentOptions={assignmentOptions}
          />
        )}
      </>
    );
  }

  return (
    <>
      <form>
        <Stack
          direction="column"
          gap={isMobile ? spacing.s300 : spacing.s400}
          height={isMobile ? "70vh" : "60vh"}
          justifyContent="space-between"
        >
          <StyledContainer $isMobile={isMobile}>
            {isLoading ? (
              <Stack
                justifyContent="center"
                alignItems="center"
                width="100%"
                padding={spacing.s400}
              >
                <Spinner size="medium" />
              </Stack>
            ) : (
              renderAssignments()
            )}
          </StyledContainer>

          {withNextButton && renderNavigationButtons()}
        </Stack>

        {isModalOpen && (
          <AddAssignmentModal
            onCloseModal={handleCloseModal}
            onSubmit={handleSubmitAssignment}
            assignmentOptions={assignmentOptions}
          />
        )}
      </form>
      {isMobile && (
        <div onClick={handleOpenModal}>
          <StyledAddMobile>
            <Icon
              appearance="primary"
              variant="filled"
              spacing="wide"
              shape="circle"
              icon={<MdOutlineAdd />}
              size="50px"
            />
          </StyledAddMobile>
        </div>
      )}
    </>
  );
}

export { AssignmentFormUI };
