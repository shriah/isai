import { useIsSubmitting } from "remix-validated-form";

import { Button } from "@/components/ui/button";

export const SubmitButton = () => {
  const isSubmitting = useIsSubmitting();
  return (
    <Button type="submit" disabled={isSubmitting}>
      {isSubmitting ? "Submitting..." : "Submit"}
    </Button>
  );
};
