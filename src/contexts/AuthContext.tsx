import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session, AuthError } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface AuthUser {
  id: string;
  email: string;
  displayName: string;
  avatarUrl?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, displayName: string) => Promise<{ error: AuthError | null }>;
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: AuthError | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        
        if (session?.user) {
          // Set basic user immediately - no delay
          const basicUser = {
            id: session.user.id,
            email: session.user.email || '',
            displayName: session.user.email?.split('@')[0] || 'משתמש'
          };
          setUser(basicUser);
          setLoading(false); // Clear loading now that user is set
          
          // Enhance with profile data in background
          setTimeout(async () => {
            try {
              const { data: profile, error } = await supabase
                .from('profiles')
                .select('display_name, avatar_url')
                .eq('user_id', session.user.id)
                .maybeSingle();

              if (error) {
                console.error('Profile fetch error:', error);
              }

              // Update user with profile data if available
              if (profile) {
                setUser({
                  ...basicUser,
                  displayName: profile.display_name || basicUser.displayName,
                  avatarUrl: profile.avatar_url
                });
              }
            } catch (err) {
              console.error('Profile fetch failed:', err);
            }
          }, 0);
        } else {
          setUser(null);
          setLoading(false);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (!session) {
        setUser(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, displayName: string) => {
    const redirectUrl = `${window.location.origin}/`;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          display_name: displayName
        }
      }
    });

    if (!error) {
      toast({
        title: "הרשמה הושלמה",
        description: "נשלח אליך אימייל עם קישור לאימות החשבון"
      });
    }

    return { error };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (!error) {
      toast({
        title: "התחברת בהצלחה",
        description: "ברוך השב!"
      });
    }

    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    toast({
      title: "התנתקת בהצלחה",
      description: "להתראות!"
    });
  };

  const resetPassword = async (email: string) => {
    const redirectUrl = `${window.location.origin}/auth/reset`;
    
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: redirectUrl
    });

    if (!error) {
      toast({
        title: "נשלח קישור לאיפוס סיסמה",
        description: "בדוק את תיבת המייל שלך"
      });
    }

    return { error };
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
      loading,
      signUp,
      signIn,
      signOut,
      resetPassword
    }}>
      {children}
    </AuthContext.Provider>
  );
};