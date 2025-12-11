export const normalizeDate = (dateStr: string) =>
  new Date(dateStr).toISOString().split("T")[0];

export const getWeekRange = (offsetWeeks = 0) => {
  const today = new Date();
  const day = today.getUTCDay();

  const start = new Date(
    Date.UTC(
      today.getUTCFullYear(),
      today.getUTCMonth(),
      today.getUTCDate() - day - offsetWeeks * 7
    )
  );

  const end = new Date(
    Date.UTC(
      today.getUTCFullYear(),
      today.getUTCMonth(),
      today.getUTCDate() - day - offsetWeeks * 7 + 6,
      23,
      59,
      59
    )
  );

  return { start, end };
};

export const getMonthStr = (offsetMonths = 0) => {
  const d = new Date();
  d.setUTCMonth(d.getUTCMonth() - offsetMonths);
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(
    2,
    "0"
  )}`;
};
