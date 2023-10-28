import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { withZod } from "@remix-validated-form/with-zod";
import { ValidatedForm, validationError } from "remix-validated-form";
import { z } from "zod";
import { zfd } from "zod-form-data";

import { InputField } from "~/components/InputField";
import { SubmitButton } from "~/components/SubmitButton";
import { createAlbum } from "~/models/album.server";
import { requireUserId } from "~/session.server";

export const validator = withZod(
  z.object({
    name: z.string().min(1, { message: "Album name is required" }),
    price: zfd.numeric(z.number().min(0)),
  }),
);

export const action = async ({ request }: ActionFunctionArgs) => {
  const userId = await requireUserId(request);
  console.log("Received Request to create album")
  const data = await validator.validate(await request.formData());
  if (data.error) return validationError(data.error);
  const note = await createAlbum({ ...data.data, userId });

  return redirect(`/albums/${note.id}`);
};

export default function NewAlbumpPage() {


  return (
    <ValidatedForm
      validator={validator}
      method="post"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        width: "100%",
      }}
    >
      <div>
          <InputField
            name="name"
            label="Name"
          />
      </div>
      <div>
      <InputField
            name="price"
            label="Price"
            type="number"
          />
      </div>
     

      <div className="text-right">
       <SubmitButton/>
         
      </div>
    </ValidatedForm>
  );
}
