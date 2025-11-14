import Image from 'next/image';
import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  type?: 'text' | 'email' | 'password' | 'search';
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string | number;
  error?: string;
}

const Input: React.FC<InputProps> = ({ label, type = 'text', className, onChange, value, error, ...props }) => {
  const inputBasedWrapStyle = 'w-full py-4 text-[16px] md:text-[22px] focus:outline-none rounded-4xl h-[58px] box-border relative'
  const inputWrapStyle = type !== 'search' ? "border border-(--secondary-cool) px-6" : "bg-(--secondary-cool) pl-16 pr-8"
  const inputTextAndEmailStyle = (type === 'text' || type === 'email') && 'text-[#7A7A7A]'
  return (
    <div className={`relative mb-4 ${className}`}>
      {label && (
        <label htmlFor={props.id} className="inline-block text-[16px] md:text-[22px] mb-2 font-medium">
          {label}
        </label>
      )}
      {type === 'search' && (
        <span className="absolute z-10 left-[26px] -translate-y-1/2 top-1/2">
          <Image src='/search.svg' width={24} height={24} alt='search icon' />
        </span>
      )}
      <input
        onChange={onChange}
        value={value}
        type={type}
        className={`${inputBasedWrapStyle} ${inputWrapStyle} ${inputTextAndEmailStyle}`}
        {...props}
      />
      {error && <p className="text-red-500! backdrop-blur text-right max-w-40 md:max-w-90 absolute right-0 top-0 text-xs! md:text-sm! mt-1">{error}</p>}
    </div>
  );
};

export default Input;
