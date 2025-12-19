"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { NewIssueForm } from "@/components/issues/submit-form";
import { useState } from "react";

const Issues = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>Add a New Issue</Button>
        </DialogTrigger>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Add a New Issue</DialogTitle>
            <DialogDescription>
              Create a new issue. You can edit or delete it later from the
              dashboard.
            </DialogDescription>
          </DialogHeader>
          <NewIssueForm onCancel={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Issues;
