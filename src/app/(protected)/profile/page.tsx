'use client';

import { useState } from 'react';
import { useProfile } from '@/hooks/useProfile';
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { ProfileCard } from '@/components/profile/ProfileCard';
import { ProfileForm } from '@/components/profile/ProfileForm';
import { ProfileFormData } from '@/types/profile';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const { profile, loading, error, saveProfile } = useProfile();

  const handleSave = async (data: ProfileFormData): Promise<boolean> => {
    const success = await saveProfile(data);
    if (success) {
      setIsEditing(false);
    }
    return success;
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  if (loading) {
    return (
      <div className="flex flex-col h-screen">
        <ProfileHeader />
        <div className="flex-1 p-6">
          <div className="max-w-md mx-auto">
            <div className="flex flex-col items-center space-y-4">
              <Skeleton className="h-20 w-20 rounded-full" />
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="flex flex-col h-screen">
        <ProfileHeader />
        <div className="flex-1 p-6">
          <div className="max-w-md mx-auto">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {error || 'Failed to load profile. Please try again.'}
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <ProfileHeader />
      <div className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          {isEditing ? (
            <ProfileForm
              profile={profile}
              onSave={handleSave}
              onCancel={handleCancel}
            />
          ) : (
            <ProfileCard profile={profile} onEdit={handleEdit} />
          )}
        </div>
      </div>
    </div>
  );
}
