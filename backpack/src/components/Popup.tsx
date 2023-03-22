import { useEffect, useState } from "react";

type ErrorPopupProps = {
  message: string;
  visible: boolean;
};

export const ErrorPopup = (props: ErrorPopupProps) => {
  const { message, visible } = props;
  const [doRender, setDoRender] = useState(visible);
  let currentDebounceId = 0;

  useEffect(() => {
    if (!visible) return;
    setDoRender(true);

    const debounceId = Date.now();
    currentDebounceId = debounceId;

    setTimeout(() => {
      if (currentDebounceId === debounceId) setDoRender(false);
    }, Math.max(Math.floor((message.length / 32) * 1500), 2000));
  }, [message, visible]);

  return doRender ? (
    <div className="z-50 fixed bg-red-500 rounded-md drop-shadow-md text-white w-96 p-5 -translate-x-1/2 left-1/2 bottom-4">
      <p className="text-2xl">Error message</p>
      <p className="text-lg">{message}</p>
    </div>
  ) : (
    <></>
  );
};
