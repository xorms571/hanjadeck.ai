'use client';

import { useState, useRef } from 'react';
import type { ChangeEvent } from 'react';
import UserProfilePicture from '../components/UserProfilePicture';
import { useRouter } from 'next/navigation';

interface ProfileImageUpdaterProps {
  initialImageUrl: string | null;
}

export default function ProfileImageUpdater({ initialImageUrl }: ProfileImageUpdaterProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState(initialImageUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePictureClick = () => {
    // Trigger the hidden file input
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/users/me/image', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to upload image.');
      }

      setImageUrl(result.imageUrl);
      
      // Refresh the page to show the new image across the app
      router.refresh();

    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col items-center h-[180px]">
      <div 
        className="relative group cursor-pointer h-full"
        onClick={handlePictureClick}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handlePictureClick(); }}
        role="button"
        tabIndex={0}
        aria-label="Change profile picture"
      >
        <UserProfilePicture imageUrl={imageUrl} />
        <div className="absolute inset-0 bg-(--primary)/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
          <span className="text-white">Change</span>
        </div>
        {isLoading && (
            <div className="absolute inset-0 bg-(--primary)/50 flex items-center justify-center rounded-full">
                <p className="text-white!">Uploading...</p>
            </div>
        )}
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/png, image/jpeg, image/gif"
      />
      {error && <p className="text-red-500! text-sm">{error}</p>}
    </div>
  );
}
