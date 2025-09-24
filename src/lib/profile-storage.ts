import { Session } from 'next-auth';
import { StoredProfile, ProfileFormData, ProfileData } from '@/types/profile';

export class ProfileStorage {
  private static getProfileKey(session: Session): string {
    const sessionId = session.user?.email || 'anonymous';
    return `chatbot-session-${sessionId}-profile`;
  }

  private static isSessionExpired(session: Session): boolean {
    if (!session.expires) return false;
    return new Date() > new Date(session.expires);
  }

  private static validateSession(session: Session | null): session is Session {
    if (!session) return false;
    if (this.isSessionExpired(session)) return false;
    return true;
  }

  // Load profile data merged with session data
  static loadProfile(session: Session | null): ProfileData | null {
    if (!this.validateSession(session)) return null;

    const profileKey = this.getProfileKey(session);
    const stored = localStorage.getItem(profileKey);

    // Base data from session
    const baseProfile: ProfileData = {
      id: '1', // NextAuth user ID not accessible, using static id
      name: session.user?.name || '',
      email: session.user?.email || '',
    };

    if (!stored) return baseProfile;

    try {
      const parsedProfile: StoredProfile = JSON.parse(stored);
      return {
        ...baseProfile,
        // Use stored values if they exist, otherwise fall back to session data
        name: parsedProfile.name || baseProfile.name,
        email: parsedProfile.email || baseProfile.email,
        displayName: parsedProfile.displayName,
        bio: parsedProfile.bio,
        profilePicture: parsedProfile.profilePicture,
        createdAt: new Date(parsedProfile.createdAt),
        updatedAt: new Date(parsedProfile.updatedAt),
      };
    } catch (error) {
      console.error('Error parsing stored profile:', error);
      return baseProfile;
    }
  }

  // Save profile data to localStorage
  static saveProfile(session: Session | null, formData: ProfileFormData): boolean {
    if (!this.validateSession(session)) return false;

    const profileKey = this.getProfileKey(session);
    const existing = this.loadProfile(session);

    const profileToSave: StoredProfile = {
      id: '1', // NextAuth user ID not accessible, using static id
      name: formData.name,
      email: formData.email,
      displayName: formData.displayName,
      bio: formData.bio,
      profilePicture: formData.profilePicture,
      createdAt: existing?.createdAt || new Date(),
      updatedAt: new Date(),
    };

    try {
      localStorage.setItem(profileKey, JSON.stringify(profileToSave));
      return true;
    } catch (error) {
      console.error('Error saving profile:', error);
      return false;
    }
  }

  // Clear profile data
  static clearProfile(session: Session | null): void {
    if (!session) return;
    const profileKey = this.getProfileKey(session);
    localStorage.removeItem(profileKey);
  }
}