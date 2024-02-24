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
