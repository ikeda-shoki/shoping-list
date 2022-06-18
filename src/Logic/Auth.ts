import firebase from "./FirebaseConfig";
import { getAuth, signInWithPopup, signOut } from "firebase/auth";
import router from "../router";
import { currentUser } from "../class/CurrentUser";

const auth = getAuth();

export const checkLogInState = () => {
  return auth.currentUser;
};

export const signInGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();

  signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result);
      if (!currentUser.value.logInState) {
        currentUser.value.userId = result.user.uid;
        currentUser.value.userName = result.user.displayName;
        currentUser.value.logInState = true;
      }
      console.log("ログインに成功しました");
      router.push({ path: "/itemsList" });
    })
    .catch((error) => {
      console.error(error);
      console.log("ログインに失敗しました");
    });
};

export const signOutGoogle = () => {
  signOut(auth)
    .then(() => {
      console.log("サインアウトしました。");
      currentUser.value.logInState = false;
      router.push({ path: "/" });
    })
    .catch((error) => {
      console.log(error);
      console.log("ログアウトに失敗しました");
      router.push({ path: "/errors" });
    });
};

// const authStore = () => {
//   console.log('init authStore');
//   const state = reactive({ isLogin: false, displayName: '', photoURL: ''})
//   const setUser = (user: DummyUser | null) => {
//     // userが存在しているかを確認
//     state.isLogin = !!user

//     // もしuserがいる場合、stateに代入(変動変数に代入)
//     // 下記の??の意味: 左辺が null または undefined の場合は右辺、それ以外の場合は左辺を戻り値として返す。
//     // → nullじゃなくて空文字を入れる
//     if (user) {
//       state.displayName = user.displayName ?? ''
//       state.photoURL = user.photoURL ?? ''
//     }
//   }

//   const signIn = () => {
//     const provider = new firebase.auth.GoogleAuthProvider();
//     const auth = getAuth();
//     signInWithPopup(auth, provider)
//       .then((result) => {
//         // This gives you a Google Access Token. You can use it to access the Google API.
//         const credential = GoogleAuthProvider.credentialFromResult(result);
//         if (credential != null) {
//           const token = credential.accessToken;
//           // The signed-in user info.
//           const dummyUser = result.user;
//           return dummyUser
//         }
//       }).catch((error) => {
//         // Handle Errors here.
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         // The email of the user's account used.
//         const email = error.customData.email;
//         // The AuthCredential type that was used.
//         const credential = GoogleAuthProvider.credentialFromError(error);
//       })
//   }

//   return {
//     state,
//     setUser,
//     signIn,
//   };
// }

// export default authStore

// export type AuthStore = ReturnType<typeof authStore>;

// // InjectionKeyを使用することでどのコンポーネントでもこの情報を使用可能になる
// // ただし、main.tsでprovideする必要あり
// export const authStoreKey: InjectionKey<AuthStore> = Symbol('autoStore');

// export const useAuthStore = () => {
//   // injectを使用することでInjectionKeyで定義し、provideで設定した値を取ってくることが可能になる
//   const store = inject(authStoreKey);
//   if (!store) {
//     throw new Error(`${authStoreKey} is not provided`);
//   }
//   return store;
// }
