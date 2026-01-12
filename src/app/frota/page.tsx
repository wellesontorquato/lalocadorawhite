import { Suspense } from "react";
import FrotaClient from "./FrotaClient";

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <FrotaClient />
    </Suspense>
  );
}
