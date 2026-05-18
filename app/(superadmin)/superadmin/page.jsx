import { Suspense } from "react";
import SuperAdmin from "./components/SuperAdmin";

export default function Page() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <SuperAdmin />
    </Suspense>
  );
}
