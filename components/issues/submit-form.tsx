"use client";

import dynamic from "next/dynamic";
import { AlertCircleIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import "easymde/dist/easymde.min.css";
import { useState } from "react";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

type NewIssueFormProps = {
  onCancel?: () => void;
  isDialog?: boolean;
};

interface NewIssue {
  title: string;
  description: string;
}

export const NewIssueForm = ({
  onCancel,
  isDialog = true,
}: NewIssueFormProps) => {
  const router = useRouter();
  const { control, handleSubmit } = useForm<NewIssue>();

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  const [error, setError] = useState("");

  return (
    <form
      className={isDialog ? "flex flex-col min-h-0 gap-4" : ""}
      onSubmit={handleSubmit(async (data) => {
        try {
          const res = await axios.post("/api/issues", data);
          console.log(res.data);
          router.push("/issues");
        } catch (error: unknown) {
          console.log(error);

          if (axios.isAxiosError(error)) {
            const message =
              (error?.response?.data as { message?: string } | undefined)
                ?.message ?? "Something went wrong";
            setError(message);
          } else {
            setError("Something went wrong");
          }
        }
      })}
    >
      <div className={isDialog ? "flex-1 min-h-0 space-y-4" : ""}>
        {error && (
          <Alert variant="destructive" className={isDialog ? "" : "mb-4"}>
            <AlertCircleIcon />
            <AlertTitle>Failed to create issue!</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <FieldGroup>
          <FieldSet>
            <FieldLegend>Add a New Issue</FieldLegend>
            <FieldDescription>
              New issues will be created and represented in the main dashboard,
              you can edit and delete them later in the dashboard.
            </FieldDescription>
            <Field>
              <FieldLabel htmlFor="submit-form-new-issue-title">
                The New Issue Title (Max 120 Characters)
              </FieldLabel>
              <Controller
                name="title"
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      id="submit-form-new-issue-title"
                      placeholder={`Bug fix: Can't refresh access token with "Auth" system.`}
                      required
                      maxLength={120}
                      {...field}
                    />
                  );
                }}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="submit-form-new-issue-description">
                The New Issue Description (Optional)
              </FieldLabel>
              <Controller
                name="description"
                control={control}
                render={({ field }) => {
                  return (
                    <div className="[&_.CodeMirror]:h-48 [&_.CodeMirror-scroll]:max-h-48 [&_.CodeMirror]:overflow-auto">
                      <SimpleMDE
                        id="submit-form-new-issue-description"
                        placeholder="Add any additional comments and details that is helpful.."
                        className="resize-none"
                        {...field}
                      />
                    </div>
                  );
                }}
              />
            </Field>
          </FieldSet>
        </FieldGroup>
      </div>

      <div
        className={
          isDialog
            ? "shrink-0 flex items-center gap-3 border-t pt-4 bg-background sticky bottom-0"
            : ""
        }
      >
        <Button type="submit">Submit</Button>
        <Button type="button" variant="outline" onClick={handleCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};
