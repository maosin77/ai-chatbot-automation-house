'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { ProfileStorage } from '@/lib/profile-storage';
import { ProfileData, ProfileFormData } from '@/types/profile';

interface UseProfileReturn {
  profile: ProfileData | null;
  loading: boolean;
  error: string | null;
  saveProfile: (data: ProfileFormData) => Promise<boolean>;
  refreshProfile: () => void;
}

export const useProfile = (): UseProfileReturn => {
  const { data: session, status } = useSession();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProfile = () => {
    if (status === 'loading') return;

    if (!session) {
      setError('No session found');
      setLoading(false);
      return;
    }

    try {
      const profileData = ProfileStorage.loadProfile(session);
      setProfile(profileData);
      setError(null);
    } catch (err) {
      setError('Failed to load profile');
      console.error('Profile load error:', err);
    } finally {
      setLoading(false);
    }
  };

  const saveProfile = async (formData: ProfileFormData): Promise<boolean> => {
    if (!session) {
      setError('No session found');
      return false;
    }

    try {
      const success = ProfileStorage.saveProfile(session, formData);
      if (success) {
        loadProfile(); // Refresh data
        setError(null);
        return true;
      } else {
        setError('Failed to save profile');
        return false;
      }
    } catch (err) {
      setError('Failed to save profile');
      console.error('Profile save error:', err);
      return false;
    }
  };

  const refreshProfile = () => {
    setLoading(true);
    loadProfile();
  };

  useEffect(() => {
    loadProfile();
  }, [session, status]); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    profile,
    loading,
    error,
    saveProfile,
    refreshProfile,
  };
};