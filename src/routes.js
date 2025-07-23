import RequireAuth from "./components/RequireAuth";
import {
  ChecklistDetail,
  ChecklistItemEdit,
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
    element: (
      <RequireAuth>
        <ListChecklist />
      </RequireAuth>
    ),
  },
  {
    path: "/list-checklist/create",
    element: (
      <RequireAuth>
        <CreateChecklist />,
      </RequireAuth>
    ),
  },
  {
    path: "/checklist/:id/detail",
    element: (
      <RequireAuth>
        <ChecklistDetail />,
      </RequireAuth>
    ),
  },
  {
    path: "/checklist/:id/item/create",
    element: (
      <RequireAuth>
        <CreateChecklistItem />,
      </RequireAuth>
    ),
  },
  {
    path: "/checklist/:checklistId/item/edit/:itemId",
    element: (
      <RequireAuth>
        <ChecklistItemEdit />,
      </RequireAuth>
    ),
  },
];

export default routes;
