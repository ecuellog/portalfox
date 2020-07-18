import * as firebase from "firebase/app";
import Axios from "axios";

export default class AuthService {
  static organizationLogin(email, password, organizationId) {
    return Axios.post('http://localhost:5001/portalfox-68431/us-central1/widgets/orgs/login', {
      email,
      password,
      organizationId
    })
      .then((res) => {
        return firebase.auth().signInWithCustomToken(res.data.token)
      });
  }

  static organizationRegister(email, password, organizationId) {
    return Axios.post('http://localhost:5001/portalfox-68431/us-central1/widgets/orgs/register', {
      email,
      password,
      organizationId
    })
      .then((res) => {
        return firebase.auth().signInWithCustomToken(res.data.token)
      });
  }

  static platformGoogleLogin(tokenId) {
    return Axios.post('http://localhost:5001/portalfox-68431/us-central1/widgets/platform/googlelogin', {tokenId})
      .then((res) => {
        return firebase.auth().signInWithCustomToken(res.data.token)
      });
  }

  static platformGoogleRegister(tokenId) {
    return Axios.post('http://localhost:5001/portalfox-68431/us-central1/widgets/platform/googleregister', {tokenId})
      .then((res) => {
        return firebase.auth().signInWithCustomToken(res.data.token)
      });
  }
}
