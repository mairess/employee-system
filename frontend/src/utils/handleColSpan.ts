const getColSpan = (windowWidth: number, isAdmin: boolean) => {
  if (windowWidth >= 1024) return isAdmin ? 6 : 5;
  if (windowWidth >= 768) return 5;
  if (windowWidth >= 640) return 4;
  return 3;
};

export default getColSpan;
