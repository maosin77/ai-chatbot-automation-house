'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { ProfileAvatar } from './ProfileAvatar';
import {
  ProfileFormSchema,
  ProfileFormData,
  ProfileData,
} from '@/types/profile';
import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

interface ProfileFormProps {
  profile: ProfileData;
  onSave: (data: ProfileFormData) => Promise<boolean>;
  onCancel: () => void;
}

export const ProfileForm = ({
  profile,
  onSave,
  onCancel,
}: ProfileFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profilePicture, setProfilePicture] = useState(
    profile.profilePicture || ''
  );

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(ProfileFormSchema),
    defaultValues: {
      name: profile.name,
      email: profile.email,
      displayName: profile.displayName || '',
      bio: profile.bio || '',
      profilePicture: profile.profilePicture || '',
    },
  });

  // TODO: it's dirty hack, to be refactored.
  useEffect(() => {
    console.log('ProfileForm: profile data changed', profile);
    form.reset({
      name: profile.name,
      email: profile.email,
      displayName: profile.displayName || '',
      bio: profile.bio || '',
      profilePicture: profile.profilePicture || '',
    });
    setProfilePicture(profile.profilePicture || '');
  }, [profile, form]);

  const userInitials = profile.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);

  const handleImageChange = (imageUrl: string) => {
    setProfilePicture(imageUrl);
    form.setValue('profilePicture', imageUrl);
  };

  const handleImageRemove = () => {
    setProfilePicture('');
    form.setValue('profilePicture', '');
  };

  const onSubmit = async (data: ProfileFormData) => {
    setIsSubmitting(true);
    try {
      const success = await onSave({
        ...data,
        profilePicture: profilePicture,
      });

      if (!success) {
        console.error('Failed to save profile');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center pb-2">
        <CardTitle>Edit Profile</CardTitle>
        <ProfileAvatar
          src={profilePicture}
          alt={profile.name}
          fallback={userInitials}
          editable
          onImageChange={handleImageChange}
          onImageRemove={handleImageRemove}
        />
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email *</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="displayName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Display Name</FormLabel>
                  <FormControl>
                    <Input placeholder="How others see your name" {...field} />
                  </FormControl>
                  <FormDescription>
                    Optional. If empty, your full name will be used.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us about yourself..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    {field.value?.length || 0}/500 characters
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-2 pt-2">
              <Button type="submit" disabled={isSubmitting} className="flex-1">
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Save Changes
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={isSubmitting}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
