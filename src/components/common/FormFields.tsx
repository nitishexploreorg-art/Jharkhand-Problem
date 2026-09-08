import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, Camera } from 'lucide-react';

export interface BaseFieldProps {
  label: string;
  labelHi?: string;
  hint?: string;
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
  error,
  required = false,
  leadingIcon,
  trailingIcon,
  id,
  className = '',
  ...props
}) => {
  const generatedId = id || `field-${label.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className="w-full">
      <label htmlFor={generatedId} className="block text-sm font-semibold text-slate-800 mb-1">
        {labelHi && <span className="text-emerald-800 mr-1.5">{labelHi}</span>}
        <span>{label}</span>
        {required && <span className="text-rose-600 ml-1">*</span>}
      </label>

      <div className="relative rounded-xl shadow-xs">
        {leadingIcon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            {leadingIcon}
          </div>
        )}

        <input
          id={generatedId}
          required={required}
          className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-slate-900 transition-colors placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 ${
            leadingIcon ? 'pl-10' : ''
          } ${trailingIcon ? 'pr-10' : ''} ${
            error ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-200' : 'border-slate-300 hover:border-slate-400'
          } ${className}`}
          {...props}
        />

        {trailingIcon && (
          <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400">
            {trailingIcon}
          </div>
        )}
      </div>

      {hint && !error && <p className="text-xs text-slate-500 mt-1">{hint}</p>}
      {error && <p className="text-xs font-medium text-rose-600 mt-1">{error}</p>}
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
  error,
  required = false,
  rows = 4,
  id,
  className = '',
  ...props
}) => {
  const generatedId = id || `textarea-${label.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className="w-full">
      <label htmlFor={generatedId} className="block text-sm font-semibold text-slate-800 mb-1">
        {labelHi && <span className="text-emerald-800 mr-1.5">{labelHi}</span>}
        <span>{label}</span>
        {required && <span className="text-rose-600 ml-1">*</span>}
      </label>

      <textarea
        id={generatedId}
        rows={rows}
        required={required}
        className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-slate-900 transition-colors placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 ${
          error ? 'border-rose-300 focus:border-rose-500' : 'border-slate-300 hover:border-slate-400'
        } ${className}`}
        {...props}
      />

      {hint && !error && <p className="text-xs text-slate-500 mt-1">{hint}</p>}
      {error && <p className="text-xs font-medium text-rose-600 mt-1">{error}</p>}
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
  error,
  required = false,
  options,
  placeholder = '-- Select an option --',
  id,
  className = '',
  ...props
}) => {
  const generatedId = id || `select-${label.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className="w-full">
      <label htmlFor={generatedId} className="block text-sm font-semibold text-slate-800 mb-1">
        {labelHi && <span className="text-emerald-800 mr-1.5">{labelHi}</span>}
        <span>{label}</span>
        {required && <span className="text-rose-600 ml-1">*</span>}
      </label>

      <select
        id={generatedId}
        required={required}
        className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 ${
          error ? 'border-rose-300' : 'border-slate-300 hover:border-slate-400'
        } ${className}`}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.labelHi ? `${opt.labelHi} (${opt.labelEn})` : opt.labelEn}
          </option>
        ))}
      </select>

      {hint && !error && <p className="text-xs text-slate-500 mt-1">{hint}</p>}
      {error && <p className="text-xs font-medium text-rose-600 mt-1">{error}</p>}
    </div>
  );
};

export interface FileUploadProps {
  label: string;
  labelHi?: string;
  hint?: string;
  onFilesChange?: (files: string[]) => void;
  initialImages?: string[];
  maxFiles?: number;
}

export const FileUploadWithPreview: React.FC<FileUploadProps> = ({
  label,
  labelHi,
  hint = 'Upload clear photos or video clip of the problem / site. (फोटो या वीडियो साक्ष्य संलग्न करें)',
  onFilesChange,
  initialImages = [],
  maxFiles = 4,
}) => {
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
      <label className="block text-sm font-semibold text-slate-800 mb-1">
        {labelHi && <span className="text-emerald-800 mr-1.5">{labelHi}</span>}
        <span>{label}</span>
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
            ? 'border-emerald-500 bg-emerald-50/50'
            : 'border-slate-300 hover:border-emerald-500 bg-slate-50/60 hover:bg-slate-50'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,video/*"
          className="hidden"
          onChange={handleFileSelect}
        />

        <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
          <Upload className="w-6 h-6" />
        </div>

        <p className="text-sm font-semibold text-slate-800">
          फ़ोटो या वीडियो चुनें या यहाँ खींचें (Click to upload or drag & drop)
        </p>
        <p className="text-xs text-slate-500 mt-1">{hint}</p>

        <div className="mt-3 flex items-center justify-center gap-2">
          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 shadow-xs"
            onClick={(e) => {
              e.stopPropagation();
              handleAddSample(sampleEvidencePresets[images.length % sampleEvidencePresets.length]);
            }}
          >
            <Camera className="w-3.5 h-3.5 text-emerald-600" />
            <span>डेमो फ़ोटो जोड़ें (Insert Demo Evidence)</span>
          </button>
        </div>
      </div>

      {/* Uploaded Previews */}
      {images.length > 0 && (
        <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {images.map((imgUrl, idx) => (
            <div
              key={idx}
              className="relative aspect-video rounded-xl overflow-hidden border border-slate-200 group bg-slate-100 shadow-xs"
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
                className="absolute top-1.5 right-1.5 p-1 bg-slate-900/80 text-white rounded-full opacity-80 hover:opacity-100 transition-opacity"
                title="हटाएं (Remove)"
              >
                <X className="w-3.5 h-3.5" />
              </button>
              <div className="absolute bottom-1 left-1.5 text-[10px] bg-black/60 text-white px-1.5 py-0.5 rounded font-mono">
                Evidence #{idx + 1}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
