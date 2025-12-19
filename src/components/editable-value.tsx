
'use client';

import { useState, type ReactNode } from 'react';
import { Input } from './ui/input';

interface EditableValueProps {
  initialValue: string | number;
  onSave: (newValue: string) => void;
  className?: string;
  inputClassName?: string;
  wrapperClassName?: string;
  children?: ReactNode;
}

export function EditableValue({ initialValue, onSave, className, inputClassName, wrapperClassName, children }: EditableValueProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue.toString());

  const handleBlur = () => {
    setIsEditing(false);
    onSave(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleBlur();
    }
  };

  if (isEditing) {
    return (
        <div className={wrapperClassName}>
            <Input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                autoFocus
                className={inputClassName || "w-full h-auto p-0 bg-transparent border-0 focus-visible:ring-0"}
            />
        </div>
    );
  }

  return (
    <div onClick={() => setIsEditing(true)} className={className}>
      {children || value}
    </div>
  );
}

    