import * as firebase from "firebase/app";
import Axios from "axios";

export default class AuthService {
  static organizationLogin(email, password, organizationId) {
    return Axios.post(`${process.env.GCLOUD_FUNCTIONS_URL}/widgets/orgs/login`, {
      email,
      password,
      organizationId
    })
      .then((res) => {
        return firebase.auth().signInWithCustomToken(res.data.token)
      });
  }

  static organizationRegister(email, password, organizationId) {
    return Axios.post(`${process.env.GCLOUD_FUNCTIONS_URL}/widgets/orgs/register`, {
      email,
      password,
      organizationId
    })
      .then((res) => {
        return firebase.auth().signInWithCustomToken(res.data.token)
      });
  }

  static platformGoogleLogin(tokenId) {
    return Axios.post(`${process.env.GCLOUD_FUNCTIONS_URL}/widgets/platform/googlelogin`, {tokenId})
      .then((res) => {
        return firebase.auth().signInWithCustomToken(res.data.token)
      });
  }

  static platformGoogleRegister(tokenId) {
    return Axios.post(`${process.env.GCLOUD_FUNCTIONS_URL}/widgets/platform/googleregister`, {tokenId})
      .then((res) => {
        return firebase.auth().signInWithCustomToken(res.data.token)
      });
  }
}
