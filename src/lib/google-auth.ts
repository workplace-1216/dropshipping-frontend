/**
 * @fileoverview Google OAuth authentication service
 * Handles Google Sign-In integration with proper error handling and token management
 */

export interface GoogleUser {
  id: string;
  email: string;
  name: string;
  picture?: string;
  given_name?: string;
  family_name?: string;
}

export interface GoogleAuthResponse {
  user: GoogleUser;
  access_token: string;
}

class GoogleAuthService {
  private clientId: string;
  private isLoaded: boolean = false;

  constructor() {
    // Google OAuth Client ID - you'll need to set this in your environment
    this.clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '';
    
    if (!this.clientId) {
      console.warn('Google Client ID not found. Please set NEXT_PUBLIC_GOOGLE_CLIENT_ID in your environment variables.');
    }
  }

  /**
   * Load Google OAuth script dynamically
   */
  private async loadGoogleScript(): Promise<void> {
    if (this.isLoaded) return;

    return new Promise((resolve, reject) => {
      // Check if script is already loaded
      if (window.google && window.google.accounts) {
        this.isLoaded = true;
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      
      script.onload = () => {
        this.isLoaded = true;
        resolve();
      };
      
      script.onerror = () => {
        reject(new Error('Failed to load Google OAuth script'));
      };

      document.head.appendChild(script);
    });
  }

  /**
   * Initialize Google OAuth
   */
  async initialize(): Promise<void> {
    try {
      await this.loadGoogleScript();
      
      if (!this.clientId) {
        throw new Error('Google Client ID is not configured');
      }

      // Wait a bit for the Google script to fully load
      await new Promise(resolve => setTimeout(resolve, 100));
    } catch (error) {
      console.error('Failed to initialize Google OAuth:', error);
      throw error;
    }
  }

  /**
   * Handle Google OAuth credential response
   */
  private handleCredentialResponse(response: any): void {
    // This will be handled by the component that calls signIn
    console.log('Google credential response received:', response);
  }

  /**
   * Initialize Google OAuth and set up global callback
   */
  async initializeAndSetupCallback(callback: (response: GoogleAuthResponse) => void, errorCallback: (error: Error) => void): Promise<void> {
    try {
      await this.initialize();

      // Set up global callback
      window.google.accounts.id.initialize({
        client_id: this.clientId,
        callback: (response: any) => {
          if (response.credential) {
            // Decode the JWT token to get user info
            const payload = this.decodeJWT(response.credential);
            
            const googleUser: GoogleUser = {
              id: payload.sub,
              email: payload.email,
              name: payload.name,
              picture: payload.picture,
              given_name: payload.given_name,
              family_name: payload.family_name,
            };

            const authResponse: GoogleAuthResponse = {
              user: googleUser,
              access_token: response.credential,
            };

            callback(authResponse);
          } else {
            errorCallback(new Error('No credential received from Google'));
          }
        },
        auto_select: false,
        cancel_on_tap_outside: true,
      });
    } catch (error) {
      errorCallback(error as Error);
    }
  }

  /**
   * Trigger Google Sign-In popup
   */
  async signIn(): Promise<GoogleAuthResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        await this.initializeAndSetupCallback(resolve, reject);
        
        // Create a temporary button and trigger click
        const tempButton = document.createElement('div');
        tempButton.style.display = 'none';
        document.body.appendChild(tempButton);

        // Render Google button
        window.google.accounts.id.renderButton(tempButton, {
          theme: 'outline',
          size: 'large',
          type: 'standard',
          text: 'signin_with',
        });

        // Wait a moment for button to render, then click it
        setTimeout(() => {
          const googleButton = tempButton.querySelector('div[role="button"]') as HTMLElement;
          if (googleButton) {
            googleButton.click();
          } else {
            reject(new Error('Failed to render Google Sign-In button'));
          }
          
          // Clean up
          setTimeout(() => {
            if (tempButton.parentNode) {
              tempButton.parentNode.removeChild(tempButton);
            }
          }, 1000);
        }, 100);

        // Set timeout
        setTimeout(() => {
          reject(new Error('Google Sign-In timeout'));
        }, 60000);

      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Decode JWT token (client-side only, for basic user info)
   */
  private decodeJWT(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Failed to decode JWT:', error);
      throw new Error('Invalid token format');
    }
  }

  /**
   * Sign out from Google
   */
  async signOut(): Promise<void> {
    try {
      if (this.isLoaded && window.google) {
        window.google.accounts.id.disableAutoSelect();
      }
    } catch (error) {
      console.error('Failed to sign out from Google:', error);
    }
  }
}

// Export singleton instance
export const googleAuth = new GoogleAuthService();

// Add Google types to window
declare global {
  interface Window {
    google: any;
  }
}
