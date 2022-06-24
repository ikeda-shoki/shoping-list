import { firesStore } from "./FirebaseConfig";
import { User } from "../store/User";
import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  serverTimestamp,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";

const userConverter: FirestoreDataConverter<User> = {
  toFirestore(user: User): DocumentData {
    return {
      id: user.userId,
      userName: user.userName,
      registTime: serverTimestamp(),
      updateTime: serverTimestamp(),
    };
  },

  fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): User {
    const data = snapshot.data(options);
    return {
      userId: snapshot.id,
      userName: data.userName,
      loginState: false,
    };
  },
};

export async function addUser(user: User) {
  const docRef = doc(firesStore, "users", user.userId).withConverter(userConverter);
  await setDoc(docRef, user);
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
