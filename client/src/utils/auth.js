import decode from 'jwt-decode';

class AuthService {
  getProfile() {
    return decode(this.getToken());
  }

  loggedIn() {
 //if there's a token and stills valid 
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

 
}

export default new AuthService();
