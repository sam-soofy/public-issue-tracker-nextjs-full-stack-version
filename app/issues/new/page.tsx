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

const NewIssue = () => {
  return (
    <div className="w-full max-w-lg ml-auto mr-auto">
      <form>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Add a New Issue</FieldLegend>
            <FieldDescription>
              New issues will be created and represented in the main dashboard,
              you can edit and delete them later in the dashboard.
            </FieldDescription>
            <Field>
              <FieldLabel htmlFor="checkout-7j9-card-name-43j">
                The New Issue Title (Max 120 Characters)
              </FieldLabel>
              <Input
                id="checkout-798ertj9-issue-title-43j"
                placeholder={`Bug fix: Can't refresh access token with "Auth" system.`}
                required
                maxLength={120}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="checkout-7j9-card-name-43j">
                The New Issue Description (Optional)
              </FieldLabel>
              <SimpleMDE
                id="checkout-93845yjhnfg-issue-desc-45374j"
                placeholder="Add any additional comments and details that is helpfull.."
                className="resize-none"
              />
            </Field>
          </FieldSet>
          <Field orientation="horizontal">
            <Button type="submit">Submit</Button>
            <Button variant="outline" type="button">
              Cancel
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
};

export default NewIssue;
