import { Activity } from "react";
import { useFieldContext } from "@/components/form/form-hooks";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldContent, FieldError, FieldLabel } from "@/components/ui/field";

export const FormCheckbox = ({ label, horizontal }: { label: string; horizontal?: boolean }) => {
  const field = useFieldContext<boolean>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
  return (
    <Field orientation={horizontal ? "horizontal" : undefined} data-invalid={isInvalid}>
      <Checkbox
        id={field.name}
        name={field.name}
        onBlur={field.handleBlur}
        checked={field.state.value}
        onCheckedChange={(checked) => field.handleChange(checked === true)}
        aria-invalid={isInvalid}
      />
      <FieldContent>
        <FieldLabel htmlFor={field.name} className="text-sm">
          {label}
        </FieldLabel>
        <Activity mode={isInvalid ? "visible" : "hidden"}>
          <FieldError errors={field.state.meta.errors} />
        </Activity>
      </FieldContent>
    </Field>
  );
};
