import firebase from "./FirebaseConfig";
import { getAuth, signInWithPopup, signOut } from "firebase/auth";
import { User, setUser } from "../store/User";
import router from "../router";
import { addUser, isRegistCheckUser, getUser, getCategorys, getSaveItems, getColors } from "./FirebaseAction";
import { setCategorys } from "../store/Category";
import { setColor } from "../store/Color";

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
      if ((await isRegistCheckUser(user.userId)) == false) {
        console.log("userを追加します");
        addUser(user);
      }
      console.log("userをセットします");
      setUser(user);
      const categorys = await getCategorys(user.userId);
      setCategorys(categorys);
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
    await setStores(uid);
    return true;
  }
  return false;
}

export async function setStores(uid: string) {
  const loginUser = await getUser(uid);
  const categorys = await getCategorys(uid);
  const colors = await getColors();
  categorys.map(async (category) => {
    await getSaveItems(uid, category.categoryId);
  });
  if (loginUser !== null) {
    await setUser(loginUser);
    await setCategorys(categorys);
    await setColor(colors);
  }
}
