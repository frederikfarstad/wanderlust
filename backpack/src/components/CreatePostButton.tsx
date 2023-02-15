export default function CreatePostButton() {
  return (
    <div
      className="relative flex items-center justify-center
                           h-12 w-12 mt-2 mb-2 mx-auto shadow-lg
                           bg-gray-800 text-green-500
                           hover:bg:green-400 hover:text-white
                           rounded-3xl hover:rounded-xl
                           transition-all duration-300 ease-linear
                           group"
    >
      <IconAdd />
      <span
        className="absolute w-auto p-2 m-2 min-w-max left-14
                         rounded-md shadow-md
                         text-white bg-gray-900
                         text-xs font-bold
                         transition-all duration-100 scale-0 origin-left
                         group-hover:scale-100"
      >
        New Post
      </span>
    </div>
  );
}

function IconAdd() {
    return (
      <svg fill="none" viewBox="0 0 24 24" height="100%" width="100%">
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
