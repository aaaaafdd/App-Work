interface FormFieldProps {
    label: string;
    type: string;
    name: string;
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  }
  
  export default function FormField({ label, type, name, value, onChange }: FormFieldProps) {
    return (
      <div className="mb-4">
        <label 
          htmlFor={name} 
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
        <input
          type={type}
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          className={`
            w-full px-3 py-2 border rounded-lg focus:outline-none
            transition-all duration-200 ease-in-out
            border-gray-300 focus:border-amber-400 focus:ring-2 focus:ring-amber-200
            placeholder-gray-400 text-gray-700
          `}
        />
      </div>
    );
  }