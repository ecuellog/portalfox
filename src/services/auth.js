import * as firebase from "firebase/app";
import Axios from "axios";

export default class AuthService {
  static organizationLogin(email, password, organizationId) {
    return Axios.post('http://localhost:5001/portalfox-68431/us-central1/widgets/org/login', {
      email,
      password,
      organizationId
    })
      .then((res) => {
        return firebase.auth().signInWithCustomToken(res.data.token)
      });
  }

  static organizationGoogleLogin(tokenId, organizationId) {
    return Axios.post('http://localhost:5001/portalfox-68431/us-central1/widgets/org/googlelogin', {
      tokenId,
      organizationId
    })
      .then((res) => {
        return firebase.auth().signInWithCustomToken(res.data.token)
      });
  }

  static organizationGoogleRegister(tokenId, organizationId, inviteCode) {
    return Axios.post('http://localhost:5001/portalfox-68431/us-central1/widgets/org/googlelogin', {
      tokenId,
      organizationId,
      inviteCode
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