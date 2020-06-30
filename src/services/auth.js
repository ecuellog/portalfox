import * as firebase from "firebase/app";
import Axios from "axios";

export default class AuthService {
  static organizationLogin(email, password, organizationId) {
    return Axios.post('http://localhost:5001/portalfox-68431/us-central1/widgets/spaceLogIn', {
      email,
      password,
      organizationId
    })
    .then((res) => {
      return firebase.auth().signInWithCustomToken(res.data.token)
    });
  }
}