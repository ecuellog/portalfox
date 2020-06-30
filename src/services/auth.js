import * as firebase from "firebase/app";
import Axios from "axios";

export default class AuthService {
  static organizationLogin(userId, password, organizationId) {
    Axios.post('http://localhost:5001/portalfox-68431/us-central1/spaceLogIn', {
      userId,
      password,
      organizationId
    })
    .then((res) => {
      return firebase.auth().signInWithCustomToken(res.data.token)
    });
  }
}