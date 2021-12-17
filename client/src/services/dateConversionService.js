export const getDateStringFromKeyMonth = (keyMonth) =>
  new Date(keyMonth).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    timeZone: "UTC",
  });

export const getCurrentDateString = () =>
  new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    timeZone: "UTC",
  });

export const getCurrentKeyMonth = () => new Date().toISOString().slice(0, 7);

export const getKeyMonthFromDateString = (dateString) =>
  new Date(dateString).toISOString().slice(0, 7);
