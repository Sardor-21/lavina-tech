import { Button } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import fields from "components/fields";
import CModal from "components/modal";
import { ErrorMessage, Field } from "formik";
import Container from "modules/container";

type CreateProps = { isOpen: boolean; handleCancel: () => void };

const Create = ({ isOpen, handleCancel }: CreateProps) => {
  const queryClient = useQueryClient();
  return (
    <CModal isOpen={isOpen} width={600}>
      <div className=" p-3">
        <Container.Form
          method="post"
          url="/books"
          fields={[{ name: "isbn", required: true }]}
          onSuccess={(_, resetForm) => {
            resetForm();
            handleCancel();
            queryClient.invalidateQueries();
          }}
        >
          {() => {
            return (
              <div className="flex flex-col gap-4">
                <div className="font-medium"> Create book</div>
                <div>
                  <Field label="ISBN" name={"isbn"} component={fields.Input} />
                  <ErrorMessage
                    name="isbn"
                    className="mt-2 text-red-500"
                    component={"div"}
                  />
                </div>
                <div className="flex gap-4 mt-5">
                  {" "}
                  <Button
                    className="w-1/2 !py-4"
                    variant="contained"
                    color="error"
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="w-1/2 !py-4"
                    type="submit"
                    variant="contained"
                  >
                    Create
                  </Button>
                </div>
              </div>
            );
          }}
        </Container.Form>
      </div>
    </CModal>
  );
};

export default Create;
