import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Issues = () => {
  return (
    <div>
      <Button>
        <Link href="/issues/new">Add a New Issue</Link>
      </Button>
    </div>
  );
};

export default Issues;
