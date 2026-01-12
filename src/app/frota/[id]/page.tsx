export const dynamic = "force-dynamic";

import { Suspense } from "react";
import FrotaDetalheClient from "./FrotaDetalheClient";

export default function Page({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <FrotaDetalheClient params={params} />
    </Suspense>
  );
}
