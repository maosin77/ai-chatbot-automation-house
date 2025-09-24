'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Camera, X } from 'lucide-react';
import { useState } from 'react';
import { Input } from '@/components/ui/input';

interface ProfileAvatarProps {
  src?: string;
  alt: string;
  fallback: string;
  editable?: boolean;
  onImageChange?: (imageUrl: string) => void;
  onImageRemove?: () => void;
}

export const ProfileAvatar = ({
  src,
  alt,
  fallback,
  editable = false,
  onImageChange,
  onImageRemove
}: ProfileAvatarProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [imageUrl, setImageUrl] = useState(src || '');
  const [imageError, setImageError] = useState('');

  const handleImageSubmit = () => {
    if (!imageUrl.trim()) {
      onImageRemove?.();
      setIsEditing(false);
      return;
    }

    // Basic URL validation
    try {
      new URL(imageUrl);
      onImageChange?.(imageUrl);
      setImageError('');
      setIsEditing(false);
    } catch {
      setImageError('Please enter a valid URL');
    }
  };

  const handleCancel = () => {
    setImageUrl(src || '');
    setImageError('');
    setIsEditing(false);
  };

  if (isEditing && editable) {
    return (
      <div className="flex flex-col items-center gap-2">
        <Avatar className="h-20 w-20">
          <AvatarImage src={src} alt={alt} />
          <AvatarFallback className="text-lg">{fallback}</AvatarFallback>
        </Avatar>

        <div className="flex flex-col gap-2 w-64">
          <Input
            type="url"
            placeholder="Enter image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className={imageError ? 'border-red-500' : ''}
          />
          {imageError && (
            <p className="text-sm text-red-500">{imageError}</p>
          )}
          <div className="flex gap-2 justify-center">
            <Button size="sm" onClick={handleImageSubmit}>
              Save
            </Button>
            <Button size="sm" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative">
        <Avatar className="h-20 w-20">
          <AvatarImage src={src} alt={alt} />
          <AvatarFallback className="text-lg">{fallback}</AvatarFallback>
        </Avatar>

        {editable && (
          <div className="absolute -bottom-1 -right-1 flex gap-1">
            <Button
              size="icon"
              variant="secondary"
              className="h-8 w-8 rounded-full"
              onClick={() => setIsEditing(true)}
            >
              <Camera className="h-3 w-3" />
            </Button>
            {src && (
              <Button
                size="icon"
                variant="destructive"
                className="h-8 w-8 rounded-full"
                onClick={onImageRemove}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};