interface Props {
    label: string,
    type: string,
    isValid: boolean,
    value:string,
    handleChange: Function,
    placeholder?: string,
    explanation?: string
}
  
  const InputWithValidation = ({ label, type, value, isValid, handleChange, explanation }: Props) => {

    const inputClassname = `mt-1 block w-full px-3 py-2 bg-primary-50 border rounded-md text-sm shadow-sm placeholder-slate-400
    focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500
    ${isValid ? '' : 'border-pink-500 text-pink-600 focus:border-pink-500 focus:ring-pink-500'}`


    const explanationClassname = explanation !== undefined && !isValid ? "w-auto p-2 m-2 min-w-max rounded-md shadow-md text-white bg-gray-900 text-xs font-bold" : "hidden col-span-1"


    return <label className="block">
        <span className="block text-sm font-medium text-slate-700">{label}</span>
        <div className="">
            <input type={type} value={value} className={inputClassname} onChange={e => handleChange(e.target.value)} />
            <span className={explanationClassname}>{explanation}</span>
        </div>
    </label>
  };
  
  export default InputWithValidation;

