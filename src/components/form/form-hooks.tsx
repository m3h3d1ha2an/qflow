import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { FormCheckbox } from "@/components/form/form-checkbox";
import { FormInput } from "@/components/form/form-input";
import { FormSelect } from "@/components/form/form-select";
import { FormTextarea } from "@/components/form/form-textarea";

const { formContext, useFormContext } = createFormHookContexts();
const { fieldContext, useFieldContext } = createFormHookContexts();

const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    Input: FormInput,
    Select: FormSelect,
    Textarea: FormTextarea,
    Checkbox: FormCheckbox,
  },
  formComponents: {},
});

export { useAppForm, useFieldContext, useFormContext };
