interface Props {
  label: string;
  type: string;
  isValid: boolean;
  value: string;
  handleChange: Function;
  placeholder?: string;
  explanation?: string;
  isAffectedByDarkMode?: boolean;
}

const InputWithValidation = ({
  label,
  type,
  value,
  isValid,
  handleChange,
  explanation,
  placeholder,
  isAffectedByDarkMode,
}: Props) => {
  const inputClassname = `mt-1 block w-full px-3 py-2 bg-primary-50 border rounded-md text-sm shadow-sm placeholder-slate-400
    focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 text-slate-700
    ${isValid ? "" : "border-pink-500 text-pink-600 focus:border-pink-500 focus:ring-pink-500"}`;

  const explanationClassname =
    explanation !== undefined && !isValid
      ? `min-w-max rounded-md text-gray-500 ${isAffectedByDarkMode && "dark:text-white"} text-xs`
      : "hidden";

  return (
    <label className="block">
      <span className={`block text-sm font-medium text-slate-700 ${isAffectedByDarkMode && "dark:text-white"}`}>
        {label}
        <span className="text-red-300"> *</span>
      </span>
      <div className="">
        <input type={type} value={value} className={inputClassname} onChange={(e) => handleChange(e.target.value)} />
        <span className={explanationClassname}>{explanation}</span>
      </div>
    </label>
  );
};

export default InputWithValidation;
