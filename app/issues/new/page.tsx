"use client";

import { NewIssueForm } from "@/components/issues/submit-form";
import { useRouter } from "next/navigation";

const NewIssue = () => {
  const router = useRouter();
  function handleCancel() {
    // On cancel we want to navigate to /issues
    router.push("/issues");
  }
  return (
    <div className="w-full max-w-lg ml-auto mr-auto">
      <NewIssueForm onCancel={handleCancel} />
    </div>
  );
};

export default NewIssue;
