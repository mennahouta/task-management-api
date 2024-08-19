enum TaskStatus {
  PENDING = 1,
  IN_PROGRESS,
  COMPLETED,
}

enum TaskPriority {
  LOW = 1,
  MEDIUM,
  HIGH,
}

export const getTaskStatusValue = (key: string) => {
  if (!Object.values(TaskStatus).includes(key)) {
    throw new Error(`Unknown enum key ${key} for TaskStatus`);
  }
  return TaskStatus[key as keyof typeof TaskStatus];
};

export const getTaskPriorityValue = (key: string) => {
  if (!Object.values(TaskPriority).includes(key)) {
    throw new Error(`Unknown enum key ${key} for TaskPriority`);
  }
  return TaskPriority[key as keyof typeof TaskPriority];
};
