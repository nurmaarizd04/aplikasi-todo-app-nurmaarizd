import {
  ChecklistDetail,
  CreateChecklist,
  CreateChecklistItem,
  ListChecklist,
  Login,
  Register,
} from "./pages";

const routes = [
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/list-checklist",
    element: <ListChecklist />,
  },
  {
    path: "/list-checklist/create",
    element: <CreateChecklist />,
  },
  {
    path: "/checklist/:id/detail",
    element: <ChecklistDetail />,
  },
  {
    path: "/checklist/:id/item/create",
    element: <CreateChecklistItem />,
  },
];

export default routes;
