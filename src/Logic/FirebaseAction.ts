import { firesStore, db } from "./FirebaseConfig";
import { User } from "../store/User";
import { Category, defaultCategorys } from "../store/Category";
import { Color } from "../store/Color";
import { Item } from "../store/Item";
import { categoryConverter, colorConverter, userConverter } from "./FirebaseConverter";
import { doc, setDoc, getDoc, addDoc, collection, getDocs, CollectionReference, deleteDoc } from "firebase/firestore";

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

export async function addCategory(category: Category, uid: string) {
  const categoryUrl = "users/" + uid + "/categorys";
  await addDoc(collection(db, categoryUrl), {
    categoryName: category.categoryName,
    categoryImage: category.categoryImage,
    categoryColor: category.categoryColor,
    updateTime: category.updateTime,
    registTime: category.registTime,
  });
}

export async function addRegistItems(registItems: Item[], uid: string, categoryId: string) {
  const registItemsCollectionRef = collection(db, "users/" + uid + "/categorys/" + categoryId + "/registItems");
  await registItems.map((registItem: Item) => {
    addRegistItem(registItem, registItemsCollectionRef);
  });
}

export async function addRegistItem(item: Item, registItemsCollectionRef: CollectionReference) {
  await addDoc(registItemsCollectionRef, {
    itemName: item.itemName,
    updateTime: item.updateTime,
    registTime: item.registTime,
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
      registItems: [],
    };
    categorys.push(category);
  });
  return categorys;
}

// 下記メソッド使用していないため、削除予定
export async function getCategory(uid: string, categoryId: string) {
  const categoryDocRef = doc(firesStore, "users", uid, "categorys", categoryId).withConverter(categoryConverter);
  const categoryDocShot = await getDoc(categoryDocRef);
  if (categoryDocShot.exists()) {
    const category: Category = {
      categoryId: categoryDocShot.data().categoryId,
      categoryName: categoryDocShot.data().categoryName,
      categoryColor: categoryDocShot.data().categoryColor,
      categoryImage: categoryDocShot.data().categoryImage,
      registItems: [],
      updateTime: categoryDocShot.data().updateTime,
      registTime: categoryDocShot.data().registTime,
    };
    return category;
  }
  return null;
}

export async function getItems(uid: string, categoryId: string, type: string) {
  const collRef = db.collection("users").doc(uid).collection("categorys").doc(categoryId).collection(type);
  const snapshot = await getDocs(collRef);
  const items: Item[] = [];
  snapshot.docs.map((doc) => {
    const item: Item = {
      itemId: doc.id,
      itemName: doc.data().itemName,
      categoryId: categoryId,
      updateTime: doc.data().updateTime,
      registTime: doc.data().registTime,
    };
    items.push(item);
  });
  return items;
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

export async function deleteItemData(item: Item, categoryId: string, uid: string) {
  const itemDocRef = doc(firesStore, "users", uid, "categorys", categoryId, "registItems", item.itemId);
  await deleteDoc(itemDocRef);
}
