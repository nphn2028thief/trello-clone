import { ACTION, ENTITY_TYPE } from "@/constants/entity";

// Sort array depends on startIndex and endIndex
export const reorder = <T>(list: T[], startIndex: number, endIndex: number) => {
  // Create copy of list array
  const results = Array.from(list);

  // Remove one element from result array at startIndex with splice method
  const [removed] = results.splice(startIndex, 1);

  // Insert removed element at endIndex in result array
  results.splice(endIndex, 0, removed);
  return results;
};

export const generateLogMessage = (
  action: ACTION,
  entityType: ENTITY_TYPE,
  entityTitle: string
) => {
  switch (action) {
    case ACTION.CREATE:
      return `Created ${entityType} "${entityTitle}".`;
    case ACTION.UPDATE:
      return `Updated ${entityType} "${entityTitle}".`;
    case ACTION.DELETE:
      return `Deleted ${entityType} "${entityTitle}".`;
    default:
      return `Unknown action ${entityType} "${entityTitle}".`;
  }
};
