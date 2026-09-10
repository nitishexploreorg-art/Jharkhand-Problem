import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, Camera } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export interface BaseFieldProps {
  label: string;
  labelHi?: string;
  hint?: string;
  hintHi?: string;
  error?: string;
  required?: boolean;
  id?: string;
}

export interface TextInputProps extends BaseFieldProps, React.InputHTMLAttributes<HTMLInputElement> {
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
}

export const TextInput: React.FC<TextInputProps> = ({
  label,
  labelHi,
  hint,
  hintHi,
  error,
  required = false,
  leadingIcon,
  trailingIcon,
  id,
  className = '',
  ...props
}) => {
  const { language } = useApp();
  const isHi = language === 'hi';
  const displayLabel = labelHi ? (isHi ? labelHi : label) : label;
  const displayHint = hintHi ? (isHi ? hintHi : hint) : hint;
  const generatedId = id || `field-${label.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className="w-full">
      <label htmlFor={generatedId} className="block text-sm font-semibold text-slate-200 mb-1">
        <span>{displayLabel}</span>
        {required && <span className="text-rose-400 ml-1">*</span>}
      </label>

      <div className="relative rounded-xl shadow-xs">
        {leadingIcon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6e8a7c]">
            {leadingIcon}
          </div>
        )}

        <input
          id={generatedId}
          required={required}
          className={`w-full rounded-xl border bg-[#0b1712] px-3.5 py-2.5 text-sm text-slate-100 transition-colors placeholder:text-[#5c776a] focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 ${
            leadingIcon ? 'pl-10' : ''
          } ${trailingIcon ? 'pr-10' : ''} ${
            error ? 'border-rose-500/80 focus:border-rose-400 focus:ring-rose-500/20' : 'border-[#1e3a2c] hover:border-[#2b4f3c]'
          } ${className}`}
          {...props}
        />

        {trailingIcon && (
          <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#6e8a7c]">
            {trailingIcon}
          </div>
        )}
      </div>

      {displayHint && !error && <p className="text-xs text-[#8ea598] mt-1">{displayHint}</p>}
      {error && <p className="text-xs font-medium text-rose-400 mt-1">{error}</p>}
    </div>
  );
};

export interface TextareaProps extends BaseFieldProps, React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  rows?: number;
}

export const TextArea: React.FC<TextareaProps> = ({
  label,
  labelHi,
  hint,
  hintHi,
  error,
  required = false,
  rows = 4,
  id,
  className = '',
  ...props
}) => {
  const { language } = useApp();
  const isHi = language === 'hi';
  const displayLabel = labelHi ? (isHi ? labelHi : label) : label;
  const displayHint = hintHi ? (isHi ? hintHi : hint) : hint;
  const generatedId = id || `textarea-${label.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className="w-full">
      <label htmlFor={generatedId} className="block text-sm font-semibold text-slate-200 mb-1">
        <span>{displayLabel}</span>
        {required && <span className="text-rose-400 ml-1">*</span>}
      </label>

      <textarea
        id={generatedId}
        rows={rows}
        required={required}
        className={`w-full rounded-xl border bg-[#0b1712] px-3.5 py-2.5 text-sm text-slate-100 transition-colors placeholder:text-[#5c776a] focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 ${
          error ? 'border-rose-500/80 focus:border-rose-400' : 'border-[#1e3a2c] hover:border-[#2b4f3c]'
        } ${className}`}
        {...props}
      />

      {displayHint && !error && <p className="text-xs text-[#8ea598] mt-1">{displayHint}</p>}
      {error && <p className="text-xs font-medium text-rose-400 mt-1">{error}</p>}
    </div>
  );
};

export interface SelectOption {
  value: string;
  labelEn: string;
  labelHi?: string;
}

export interface SelectInputProps extends BaseFieldProps, React.SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[];
  placeholder?: string;
}

export const SelectInput: React.FC<SelectInputProps> = ({
  label,
  labelHi,
  hint,
  hintHi,
  error,
  required = false,
  options,
  placeholder,
  id,
  className = '',
  ...props
}) => {
  const { language } = useApp();
  const isHi = language === 'hi';
  const displayLabel = labelHi ? (isHi ? labelHi : label) : label;
  const displayHint = hintHi ? (isHi ? hintHi : hint) : hint;
  const defaultPlaceholder = placeholder || (isHi ? '-- विकल्प चुनें --' : '-- Select an option --');
  const generatedId = id || `select-${label.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className="w-full">
      <label htmlFor={generatedId} className="block text-sm font-semibold text-slate-200 mb-1">
        <span>{displayLabel}</span>
        {required && <span className="text-rose-400 ml-1">*</span>}
      </label>

      <select
        id={generatedId}
        required={required}
        className={`w-full rounded-xl border bg-[#0b1712] px-3.5 py-2.5 text-sm text-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 ${
          error ? 'border-rose-500/80' : 'border-[#1e3a2c] hover:border-[#2b4f3c]'
        } ${className}`}
        {...props}
      >
        <option value="" className="bg-[#0e2018] text-slate-300">{defaultPlaceholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-[#0e2018] text-slate-100">
            {opt.labelHi ? (isHi ? opt.labelHi : opt.labelEn) : opt.labelEn}
          </option>
        ))}
      </select>

      {displayHint && !error && <p className="text-xs text-[#8ea598] mt-1">{displayHint}</p>}
      {error && <p className="text-xs font-medium text-rose-400 mt-1">{error}</p>}
    </div>
  );
};

export interface FileUploadProps {
  label: string;
  labelHi?: string;
  hint?: string;
  hintHi?: string;
  onFilesChange?: (files: string[]) => void;
  initialImages?: string[];
  maxFiles?: number;
}

export const FileUploadWithPreview: React.FC<FileUploadProps> = ({
  label,
  labelHi,
  hint,
  hintHi,
  onFilesChange,
  initialImages = [],
  maxFiles = 4,
}) => {
  const { language } = useApp();
  const isHi = language === 'hi';
  const displayLabel = labelHi ? (isHi ? labelHi : label) : label;
  const defaultHint = isHi
    ? 'समस्या या स्थल की स्पष्ट फ़ोटो या वीडियो क्लिप अपलोड करें।'
    : 'Upload clear photos or video clip of the problem / site.';
  const displayHint = hintHi ? (isHi ? hintHi : (hint || defaultHint)) : (hint || defaultHint);

  const [images, setImages] = useState<string[]>(initialImages);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const sampleEvidencePresets = [
    'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=800&q=80',
  ];

  const handleAddSample = (url: string) => {
    if (images.length >= maxFiles) return;
    const updated = [...images, url];
    setImages(updated);
    onFilesChange?.(updated);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // Simulate reading local file to data URL
    const file = files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result && images.length < maxFiles) {
        const updated = [...images, event.target.result as string];
        setImages(updated);
        onFilesChange?.(updated);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = (index: number) => {
    const updated = images.filter((_, i) => i !== index);
    setImages(updated);
    onFilesChange?.(updated);
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-semibold text-slate-200 mb-1">
        <span>{displayLabel}</span>
      </label>

      {/* Drag & Drop Zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const reader = new FileReader();
            reader.onload = (ev) => {
              if (ev.target?.result && images.length < maxFiles) {
                const updated = [...images, ev.target.result as string];
                setImages(updated);
                onFilesChange?.(updated);
              }
            };
            reader.readAsDataURL(e.dataTransfer.files[0]);
          }
        }}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
          isDragging
            ? 'border-emerald-400 bg-[#0e241b]'
            : 'border-[#1f3b2c] hover:border-emerald-500 bg-[#0b1712] hover:bg-[#0f2018]'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,video/*"
          className="hidden"
          onChange={handleFileSelect}
        />

        <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-700/50 flex items-center justify-center">
          <Upload className="w-6 h-6" />
        </div>

        <p className="text-sm font-semibold text-slate-200">
          {isHi ? 'फ़ोटो या वीडियो चुनें या यहाँ खींचें' : 'Click to upload photo or video, or drag & drop'}
        </p>
        <p className="text-xs text-[#8ea598] mt-1">{displayHint}</p>

        <div className="mt-3 flex items-center justify-center gap-2">
          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#13281f] border border-[#234838] text-slate-200 hover:bg-[#1a3529] shadow-xs"
            onClick={(e) => {
              e.stopPropagation();
              handleAddSample(sampleEvidencePresets[images.length % sampleEvidencePresets.length]);
            }}
          >
            <Camera className="w-3.5 h-3.5 text-emerald-400" />
            <span>{isHi ? 'डेमो फ़ोटो जोड़ें' : 'Insert Demo Evidence'}</span>
          </button>
        </div>
      </div>

      {/* Uploaded Previews */}
      {images.length > 0 && (
        <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {images.map((imgUrl, idx) => (
            <div
              key={idx}
              className="relative aspect-video rounded-xl overflow-hidden border border-[#234838] group bg-[#0c1a14] shadow-xs"
            >
              <img
                src={imgUrl}
                alt={`Evidence proof ${idx + 1}`}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <button
                type="button"
                onClick={() => handleRemove(idx)}
                className="absolute top-1.5 right-1.5 p-1 bg-slate-900/90 text-white rounded-full opacity-80 hover:opacity-100 transition-opacity"
                title={isHi ? 'हटाएं' : 'Remove'}
              >
                <X className="w-3.5 h-3.5" />
              </button>
              <div className="absolute bottom-1 left-1.5 text-[10px] bg-black/80 text-emerald-300 px-1.5 py-0.5 rounded font-mono border border-emerald-900/50">
                {isHi ? `साक्ष्य #${idx + 1}` : `Evidence #${idx + 1}`}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
