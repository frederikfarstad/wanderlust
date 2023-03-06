export function IconDelete() {
    return (
      <svg
        baseProfile="tiny"
        viewBox="0 0 24 24"
        fill="currentColor"
        height="1em"
        width="1em"
        className="text-red-500 hover:bg-black rounded-full"
      >
        <path d="M12 4c-4.419 0-8 3.582-8 8s3.581 8 8 8 8-3.582 8-8-3.581-8-8-8zm3.707 10.293a.999.999 0 11-1.414 1.414L12 13.414l-2.293 2.293a.997.997 0 01-1.414 0 .999.999 0 010-1.414L10.586 12 8.293 9.707a.999.999 0 111.414-1.414L12 10.586l2.293-2.293a.999.999 0 111.414 1.414L13.414 12l2.293 2.293z" />
      </svg>
    );
  }
  export function IconEdit() {
    return (
      <svg
        viewBox="0 0 1024 1024"
        fill="currentColor"
        height="1em"
        width="1em"
        className="text-green-700 hover:bg-black rounded-full"
      >
        <path d="M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 000-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 009.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z" />
      </svg>
    );
  }
  
  export function IconAdd({ className }: { className?: string }) {
    return (
      <svg
        fill="none"
        viewBox="0 0 24 24"
        height="1em"
        width="1em"
        className={className}
      >
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12zm10-8a8 8 0 100 16 8 8 0 000-16z"
          clipRule="evenodd"
        />
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M13 7a1 1 0 10-2 0v4H7a1 1 0 100 2h4v4a1 1 0 102 0v-4h4a1 1 0 100-2h-4V7z"
          clipRule="evenodd"
        />
      </svg>
    );
  }