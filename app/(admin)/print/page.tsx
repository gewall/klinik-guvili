import React, { Suspense } from "react";
import PrintLayout from "./_components/print-layout";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {};

const Print = (props: Props) => {
  return (
    <div>
      <Suspense fallback={<Skeleton />}>
        <PrintLayout />
      </Suspense>
    </div>
  );
};

export default Print;
