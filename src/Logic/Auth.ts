import firebase from "./FirebaseConfig";
import { getAuth, signInWithPopup, signOut } from "firebase/auth";
import { User, setUser } from "../store/User";
import router from "../router";
import { addUser, isRegistCheckUser, getUser } from "./FirebaseAction";

const auth = getAuth();

export const signInGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();

  signInWithPopup(auth, provider)
    .then(async (result) => {
      const user: User = {
        userId: result.user.uid,
        userName: result.user.displayName,
        loginState: true,
      };
      // 下記のログイン確認は別のメソッドを使用する
      if ((await isRegistCheckUser(user.userId)) == false) {
        console.log("userを追加します");
        addUser(user);
      }
      console.log("userをセットします");
      setUser(user);
      localStorage.setItem("uid", user.userId);
      console.log("ログインに成功しました");
      router.push({ path: "/itemsList" });
    })
    .catch((error) => {
      console.error(error);
      console.log("ログインに失敗しました");
      router.push({ path: "/errors" });
    });
};

export const signOutGoogle = () => {
  signOut(auth)
    .then(() => {
      console.log("サインアウトしました。");
      localStorage.removeItem("uid");
      router.push({ path: "/" });
    })
    .catch((error) => {
      console.log(error);
      console.log("ログアウトに失敗しました");
      router.push({ path: "/errors" });
    });
};

export async function checkLogInState() {
  const uid = localStorage.getItem("uid");
  if (uid !== null) {
    const loginUser = await getUser(uid);
    if (loginUser !== null) {
      setUser(loginUser);
      return true;
    }
  }
  return false;
}
