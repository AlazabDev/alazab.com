const API_URL = import.meta.env.VITE_API_URL;

export const handleAuthCallback = async (code) => {
  try {
    const response = await fetch(`${API_URL}/api/auth/callback`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'فشل تسجيل الدخول');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error handling auth callback:', error);
    throw error;
  }
};

export const initiateGoogleLogin = () => {
  // إنشاء state عشوائي للحماية
  const state = Math.random().toString(36).substring(7);
  localStorage.setItem('oauth_state', state);

  const googleAuthUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
  const params = new URLSearchParams({
    client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    redirect_uri: import.meta.env.VITE_REDIRECT_URI,
    response_type: 'code',
    scope: 'openid email profile',
    state: state,
    prompt: 'consent'
  });

  window.location.href = `${googleAuthUrl}?${params.toString()}`;
};

export const logout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  localStorage.removeItem('oauth_state');
  window.location.href = '/login';
};
