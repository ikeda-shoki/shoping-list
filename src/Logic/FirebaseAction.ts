import { firesStore, db } from "./FirebaseConfig";
import { User } from "../store/User";
import { Category, defaultCategorys } from "../store/Category";
import { SaveItem } from "../store/SaveItem";
import { Color } from "../store/Color";
import { categoryConverter, colorConverter, userConverter } from "./FirebaseConverter";
import { doc, setDoc, getDoc, addDoc, collection, getDocs } from "firebase/firestore";

export async function addUser(user: User) {
  const docRef = doc(firesStore, "users", user.userId).withConverter(userConverter);
  await setDoc(docRef, user);
  await addDefaultCategorys(user.userId);
}

export async function getUser(uid: string) {
  const docRef = doc(firesStore, "users", uid).withConverter(userConverter);
  const docShot = await getDoc(docRef);
  if (docShot.exists()) {
    const user = {
      userId: docShot.data().userId,
      userName: docShot.data().userName,
      loginState: true,
    };
    return user;
  }
  return null;
}

export async function isRegistCheckUser(uid: string) {
  const user = await getUser(uid);
  if (user !== null) {
    return true;
  }
  return false;
}

export async function addDefaultCategorys(uid: string) {
  await defaultCategorys.map((defaultCategory) => {
    addCategory(defaultCategory, uid);
  });
}

async function addCategory(category: Category, uid: string) {
  const categoryUrl = "users/" + uid + "/categorys";
  await addDoc(collection(db, categoryUrl), {
    categoryName: category.categoryName,
    categoryImage: category.categoryImage,
    categoryColor: category.categoryColor,
    updateTime: category.updateTime,
    registTime: category.registTime,
  });
}

export async function getCategorys(uid: string) {
  const categoryUrl = "users/" + uid + "/categorys";
  const collRef = collection(firesStore, categoryUrl).withConverter(categoryConverter);
  const snapshot = await getDocs(collRef);
  const categorys: Category[] = [];
  snapshot.docs.map((doc) => {
    const category: Category = {
      categoryId: doc.data().categoryId,
      categoryName: doc.data().categoryName,
      categoryColor: doc.data().categoryColor,
      categoryImage: doc.data().categoryImage,
      updateTime: doc.data().updateTime,
      registTime: doc.data().registTime,
    };
    categorys.push(category);
  });
  return categorys;
}

export async function getSaveItems(uid: string, categoryId: string) {
  const collRef = db.collection("users").doc(uid).collection("categoryId").doc(categoryId).collection("saveItems");
  const snapshot = await getDocs(collRef);
  const saveItems: SaveItem[] = [];
  snapshot.docs.map((doc) => {
    const saveItem: SaveItem = {
      saveItemId: doc.data().saveItemId,
      saveItemName: doc.data().saveItemName,
      categoryId: categoryId,
      updateTime: doc.data().updateTime,
      registTime: doc.data().registTime,
    };
    saveItems.push(saveItem);
  });
  return saveItems;
}

export async function getColors() {
  const collRef = collection(firesStore, "colors/").withConverter(colorConverter);
  const snapshot = await getDocs(collRef);
  const colors: Color[] = [];
  snapshot.docs.map((doc) => {
    const color: Color = {
      colorId: doc.data().colorId,
      color: doc.data().color,
    };
    colors.push(color);
  });
  return colors;
}
