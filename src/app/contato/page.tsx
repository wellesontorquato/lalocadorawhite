import { Suspense } from "react";
import ContatoClient from "./ContatoClient";

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <ContatoClient />
    </Suspense>
  );
}
