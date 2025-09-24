'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Mail, User } from 'lucide-react';
import { ProfileAvatar } from './ProfileAvatar';
import { ProfileData } from '@/types/profile';

interface ProfileCardProps {
  profile: ProfileData;
  onEdit: () => void;
}

export const ProfileCard = ({ profile, onEdit }: ProfileCardProps) => {
  const displayName = profile.displayName || profile.name;
  const userInitials = displayName
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center pb-2">
        <ProfileAvatar
          src={profile.profilePicture}
          alt={displayName}
          fallback={userInitials}
        />
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="text-center">
          <h2 className="text-xl font-semibold">{displayName}</h2>
          {profile.displayName && profile.displayName !== profile.name && (
            <p className="text-sm text-muted-foreground">({profile.name})</p>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span>{profile.email}</span>
          </div>

          {profile.bio && (
            <div className="flex items-start gap-2 text-sm">
              <User className="h-4 w-4 text-muted-foreground mt-0.5" />
              <p className="text-muted-foreground">{profile.bio}</p>
            </div>
          )}
        </div>

        <div className="pt-2">
          <Button
            onClick={onEdit}
            className="w-full"
            variant="outline"
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
        </div>

        {profile.updatedAt && (
          <div className="text-xs text-muted-foreground text-center pt-2 border-t">
            Last updated: {profile.updatedAt.toLocaleDateString()}
          </div>
        )}
      </CardContent>
    </Card>
  );
};