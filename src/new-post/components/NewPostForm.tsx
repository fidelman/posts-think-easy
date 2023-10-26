"use client";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import { NewPostSubHeader } from "./NewPostSubHeader";
import { useNewPostPresenter } from "../NewPostPresenter";

export const NewPostForm = () => {
  const presenter = useNewPostPresenter();
  const router = useRouter();
  return (
    <Formik
      initialValues={{ title: "", content: "" }}
      validate={(values) => {
        const errors: Record<string, string> = {};
        if (!values.title) {
          errors.title = "Required";
        } else if (!values.content) {
          errors.content = "Required";
        }
        return errors;
      }}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        const response = await presenter.publish(values);
        setSubmitting(false);
        if (response.status === "published") {
          toast.success(response.message, {
            position: "bottom-left",
          });
        } else {
          toast.error(response.message, {
            position: "bottom-left",
          });
        }

        if (response.status === "session-expired") {
          router.push("/log-in");
          router.refresh();
        }

        resetForm({
          values: {
            title: "",
            content: "",
          },
        });
      }}
    >
      {({
        values,
        handleChange,
        handleSubmit,
        isSubmitting,
        isValid,
        dirty,
      }) => (
        <>
          <form onSubmit={handleSubmit}>
            <NewPostSubHeader
              isSubmitting={isSubmitting}
              isPublishButtonEnabled={isValid && dirty}
            />
            <main className="container mx-auto py-5">
              <div className="mt-4">
                <input
                  className="text-5xl font-serif outline-none w-full mb-2"
                  type="text"
                  placeholder="Title"
                  name="title"
                  value={values.title}
                  onChange={handleChange}
                />
                <textarea
                  rows={15}
                  name="content"
                  className="text-lg font-serif outline-none w-full mt-4 text-gray-800 h-full resize-none"
                  placeholder="Tell your story..."
                  value={values.content}
                  onChange={handleChange}
                />
              </div>
            </main>
          </form>
          <ToastContainer />
        </>
      )}
    </Formik>
  );
};
