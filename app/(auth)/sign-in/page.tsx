import { Suspense } from "react";
import SignIn from "@/app/components/SignIn";

export default function SignInPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <SignIn />
    </Suspense>
  );
}