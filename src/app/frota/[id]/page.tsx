import { Suspense } from "react";
import FrotaDetalheClient from "./FrotaDetalheClient";

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <FrotaDetalheClient />
    </Suspense>
  );
}
