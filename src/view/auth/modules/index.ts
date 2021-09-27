import { auth } from "../../../service/Firebase";
import firebase from 'firebase/compat/app';

export const SignInWithSocialMedia = (provider: firebase.auth.AuthProvider) =>
    new Promise<firebase.auth.UserCredential>((resolve, reject) => {
        auth.signInWithPopup(provider)
            .then((result: any) => resolve(result))
            .catch((error: any) => reject(error));
    });

