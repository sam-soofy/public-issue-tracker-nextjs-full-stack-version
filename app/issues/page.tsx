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

const Issues = () => {
  return (
    <div>
      <Dialog>
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
          <NewIssueForm />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Issues;
