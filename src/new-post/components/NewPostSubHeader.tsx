interface SubHeaderProps {
  isPublishButtonEnabled: boolean;
  isSubmitting: boolean;
}

export const NewPostSubHeader = (props: SubHeaderProps) => {
  return (
    <header className="py-3 border-b">
      <div className="container mx-auto flex">
        <ul className="flex items-center justify-center gap-2">
          <li>
            <p className="text-sm">Draft</p>
          </li>
        </ul>
        <ul className="flex ml-auto items-center justify-center">
          <li>
            <button
              disabled={!props.isPublishButtonEnabled || props.isSubmitting}
              className="btn btn-primary"
              type="submit"
            >
              Publish
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
};
