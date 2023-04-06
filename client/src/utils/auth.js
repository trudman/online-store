import decode from 'jwt-decode';

// web token (JWT) retrieved 
class AuthService {
  getProfile() {
    return decode(this.getToken());
  }

  loggedIn() {
 //if there's a token and stills valid 
    const token = this.getToken();
    return !!token && !this.tokenValidation(token);
  }
// checks if token is valid or not
  tokenValidation(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }
 
}

export default new AuthService();
