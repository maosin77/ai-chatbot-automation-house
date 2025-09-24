import { z } from 'zod';

// Zod validation schema
export const ProfileFormSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name too long"),
  email: z.string().email("Please enter a valid email").max(254, "Email too long"),
  displayName: z.string().max(50, "Display name too long").optional(),
  bio: z.string().max(500, "Bio must be 500 characters or less").optional(),
  profilePicture: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});

export type ProfileFormData = z.infer<typeof ProfileFormSchema>;

// Storage interface
export interface StoredProfile extends ProfileFormData {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

// Display interface (merged session + stored data)
export interface ProfileData {
  // From NextAuth Session
  id: string;
  name: string;
  email: string;

  // From Local Storage (optional overrides)
  displayName?: string;
  bio?: string;
  profilePicture?: string;

  // Metadata
  updatedAt?: Date;
  createdAt?: Date;
}