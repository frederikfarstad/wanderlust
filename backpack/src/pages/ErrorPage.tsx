import { useNavigate } from "react-router-dom";
import { SubmitButton } from "../components/Buttons";

export default function ErrorPage() {
  const navigate = useNavigate();

  const onReturnClicked = async () => {
    navigate(-1);
    return true;
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div>
        <IconEmotionLaughLine />
      </div>
      <div className="p-10 bg-primary-200 basis-16">
        This page does not exist or is not accessible.
      </div>
      <br />
      <SubmitButton text="Take me back" submitFunction={onReturnClicked} />
    </div>
  );
}

function IconEmotionLaughLine() {
  return (
    <svg
      className="animate-bounce hover:animate-spin"
      viewBox="0 0 24 24"
      fill="currentColor"
      height="3em"
      width="3em"
    >
      <path fill="none" d="M0 0h24v24H0z" />
      <path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm0 2a8 8 0 100 16 8 8 0 000-16zm0 7c2 0 3.667.333 5 1a5 5 0 01-10 0c1.333-.667 3-1 5-1zM8.5 7a2.5 2.5 0 012.45 2h-4.9A2.5 2.5 0 018.5 7zm7 0a2.5 2.5 0 012.45 2h-4.9a2.5 2.5 0 012.45-2z" />
    </svg>
  );
}
