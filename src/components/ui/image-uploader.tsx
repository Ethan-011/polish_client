
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Image, Upload, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageUploaderProps {
  defaultImage?: string;
  onImageSelected: (imageUrl: string) => void;
  className?: string;
}

const ImageUploader = ({ defaultImage, onImageSelected, className }: ImageUploaderProps) => {
  const [preview, setPreview] = useState<string | null>(defaultImage || null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleFile = (file: File) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPreview(result);
        onImageSelected(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleRemoveImage = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onImageSelected('');
  };

  const handleClickUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={cn("w-full", className)}>
      <Input 
        type="file" 
        ref={fileInputRef}
        accept="image/*" 
        onChange={handleFileChange} 
        className="hidden" 
      />
      
      {!preview ? (
        <div
          onClick={handleClickUpload}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center cursor-pointer transition-colors",
            isDragging ? "border-accent bg-accent/5" : "border-gray-300 hover:border-accent/50"
          )}
        >
          <Image className="w-12 h-12 text-gray-400 mb-2" />
          <p className="text-sm text-gray-500 mb-1">برای آپلود تصویر کلیک کنید یا فایل را بکشید و رها کنید</p>
          <p className="text-xs text-gray-400">JPG, PNG یا GIF (حداکثر 5MB)</p>
        </div>
      ) : (
        <div className="relative rounded-md overflow-hidden border border-gray-200">
          <img src={preview} alt="تصویر انتخاب شده" className="w-full aspect-video object-cover" />
          <div className="absolute top-2 right-2 flex space-x-2 rtl:space-x-reverse">
            <Button 
              type="button" 
              variant="destructive" 
              size="icon" 
              className="h-8 w-8 rounded-full bg-red-500/80 hover:bg-red-500"
              onClick={handleRemoveImage}
            >
              <X className="h-4 w-4" />
            </Button>
            <Button 
              type="button" 
              variant="secondary" 
              size="icon" 
              className="h-8 w-8 rounded-full bg-white/80 hover:bg-white"
              onClick={handleClickUpload}
            >
              <Upload className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
