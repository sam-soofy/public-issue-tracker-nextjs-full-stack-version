"use client";

import dynamic from "next/dynamic";
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
import "easymde/dist/easymde.min.css";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

type NewIssueFormProps = {
  onCancel?: () => void;
};

export const NewIssueForm = ({ onCancel }: NewIssueFormProps) => {
  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <form>
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
            <Input
              id="submit-form-new-issue-title"
              placeholder={`Bug fix: Can't refresh access token with "Auth" system.`}
              required
              maxLength={120}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="submit-form-new-issue-description">
              The New Issue Description (Optional)
            </FieldLabel>
            <SimpleMDE
              id="submit-form-new-issue-description"
              placeholder="Add any additional comments and details that is helpful.."
              className="resize-none"
            />
          </Field>
        </FieldSet>
        <Field orientation="horizontal">
          <Button type="submit">Submit</Button>
          <Button type="button" variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
};
