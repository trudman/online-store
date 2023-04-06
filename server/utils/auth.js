import decode from 'jwt-decode';

class AuthService {
  // Retrieves the user token from localStorage
  getToken() {
    return localStorage.getItem('id_token')
  }
  // Retrieves the user data from localStorage
  getProfile() {
    return decode(this.getToken());
  }

  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  // Checks if token has expired
  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else
        return false;
    } catch (err) {
      return false;
    }
  }

  // Logs the user out
  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token');
  }

  login(idToken) {
    // Saves user token to localStorage
    localStorage.setItem('id_token', idToken)
  }
}

export default new AuthService();