import path from "path";

export default [
  {
    path: "/login",
    file: "routes/login.tsx",
  },
  {
    path: "/",
    file: "routes/dashboard.tsx",
    children: [
      {
        index: true,
        file: "routes/dashboard/home.tsx",
      },
      {
        path: "profile",
        file: "routes/dashboard/profile.tsx",
      },
      {
        path: "projects",
        file: "routes/dashboard/projects.tsx",
      },
      {
        path: "recent",
        file: "routes/dashboard/recent.tsx",
      }
    ],
  }
];
