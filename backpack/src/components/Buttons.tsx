import { useState } from "react";

type SubmitButtonProps = {
  text: string;
  submitFunction?: () => Promise<boolean>;
};

export const SubmitButton = (props: SubmitButtonProps) => {
  const { text, submitFunction } = props;
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async () => {
    if (isLoading) return;
    if (submitFunction === undefined) return;

    setIsLoading(true);
    submitFunction()
      .then((success) => {
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <button
        onClick={onSubmit}
        className={`text-white font-semibold drop-shadow-md rounded-md p-2 ${
          isLoading ? "bg-blue-400" : "hover:bg-blue-400 bg-blue-500"
        }`}
      >
        {isLoading ? "Loading..." : text}
      </button>
    </>
  );
};
