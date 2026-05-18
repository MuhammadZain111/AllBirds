import { Suspense } from "react";

// import AdminDashboardClient from "./components/AdminDashboardClient";

import AdminDashboardClient from "./components/AdminDashboardclient";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AdminDashboardClient />
    </Suspense>
  );
}
