import { useMediaQuery, Text, Stack } from "@inubekit/inubekit";

import { spacing } from "@design/tokens/spacing";
import { labels } from "@i18n/labels";

import { TaskCard, TaskCardProps } from "../TaskCard";
import {
  StyledTaskBoardContainer,
  StyledTaskSection,
  StyledTaskHeader,
  StyledTaskContent,
  StyledMobileBoard,
} from "./styles";

export interface TaskBoardProps {
  pendingTasks?: TaskCardProps[];
  completedTasks?: TaskCardProps[];
  isResponsible?: boolean;
}

function TaskBoard(props: TaskBoardProps) {
  const {
    pendingTasks = [],
    completedTasks = [],
    isResponsible = true,
  } = props;

  const isMobile = useMediaQuery("(max-width: 710px)");

  const renderTaskSection = (
    title: string,
    tasks: TaskCardProps[],
    emptyMessage: string,
    isRightSection = false,
    isMobileView = false,
  ) => {
    return (
      <StyledTaskSection>
        <StyledTaskHeader>
          <Text type="title" weight="bold" size="medium" textAlign="center">
            {title}
          </Text>
        </StyledTaskHeader>

        <StyledTaskContent $isRightSection={!isMobileView && isRightSection}>
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <TaskCard
                key={task.id}
                {...task}
                isNotResponsible={!isResponsible}
              />
            ))
          ) : (
            <Stack width={isMobile ? "auto" : "100%"}>
              <Text size="small" appearance="gray">
                {emptyMessage}
              </Text>
            </Stack>
          )}
        </StyledTaskContent>
      </StyledTaskSection>
    );
  };

  if (isMobile) {
    return (
      <Stack direction="column" gap={spacing.s300}>
        <StyledMobileBoard>
          {renderTaskSection(
            labels.requests.taskBoard.pendingTitle,
            pendingTasks,
            labels.requests.taskBoard.emptyState.pending,
            false,
            true,
          )}
        </StyledMobileBoard>

        <StyledMobileBoard>
          {renderTaskSection(
            labels.requests.taskBoard.completedTitle,
            completedTasks,
            labels.requests.taskBoard.emptyState.completed,
            false,
            true,
          )}
        </StyledMobileBoard>
      </Stack>
    );
  }

  return (
    <StyledTaskBoardContainer>
      {renderTaskSection(
        labels.requests.taskBoard.pendingTitle,
        pendingTasks,
        labels.requests.taskBoard.emptyState.pending,
      )}

      {renderTaskSection(
        labels.requests.taskBoard.completedTitle,
        completedTasks,
        labels.requests.taskBoard.emptyState.completed,
        true,
      )}
    </StyledTaskBoardContainer>
  );
}

export { TaskBoard };
