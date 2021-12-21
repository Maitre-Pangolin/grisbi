const ROUTES = {
  home: () => "/",
  signin: () => `/signin`,
  signup: () => `/signup`,
  expense: () => `/expense`,
  monthlyRoute: (yearMonth) => `/months/${yearMonth}`,
  currentMonthlyRoute: () => `/months/${new Date().toISOString().slice(0, 7)}`,
  monthsRoute: () => `/months`,
};

export default ROUTES;
