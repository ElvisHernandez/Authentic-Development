import { useEffect, useState } from "react";

export const Alert = (props: { alertVariant: string; msg: string }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (!show) return;

    const timer = setTimeout(() => {
      setShow(false);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [show]);

  if (!show) return null;

  return (
    <div
      className={`alert ${props.alertVariant} fixed top-[88px] right-[24px] w-[fit-content] z-50`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="stroke-current shrink-0 h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span>{props.msg}</span>
    </div>
  );
};
