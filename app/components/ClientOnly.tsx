// this will be a wrapper compoent for anything we want to render on the client side
"use client";

import { useEffect, useState } from "react";

export default function ClientOnly({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  return <>{isClient ? <div>{children}</div> : null}</>;
}
