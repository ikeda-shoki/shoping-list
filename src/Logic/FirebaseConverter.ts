import { User } from "../store/User";
import { Category } from "../store/Category";
import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions, serverTimestamp } from "firebase/firestore";
import { SaveItem } from "../store/SaveItem";

export const userConverter: FirestoreDataConverter<User> = {
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

export const categoryConverter: FirestoreDataConverter<Category> = {
  toFirestore(category: Category): DocumentData {
    return {
      categoryId: category.categoryId,
      categoryName: category.categoryName,
      categoryImage: category.categoryImage,
      categoryColor: category.categoryColor,
      registTime: serverTimestamp(),
      updateTime: serverTimestamp(),
    };
  },

  fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): Category {
    const data = snapshot.data(options);
    return {
      categoryId: snapshot.id,
      categoryName: data.categoryName,
      categoryColor: data.categoryColor,
      categoryImage: data.categoryImage,
      updateTime: data.updateTime,
      registTime: data.registTime,
    };
  },
};

// 下記使用していないので、最終的に削除予定、そもそもConveterterいらない？
export const saveItemConverter: FirestoreDataConverter<SaveItem> = {
  toFirestore(saveItem: SaveItem): DocumentData {
    return {
      saveItemId: saveItem.saveItemId,
      categoryName: saveItem.saveItemName,
      registTime: serverTimestamp(),
      updateTime: serverTimestamp(),
    };
  },

  fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): SaveItem {
    const data = snapshot.data(options);
    return {
      saveItemId: snapshot.id,
      saveItemName: data.saveItemName,
      categoryId: null,
      updateTime: data.updateTime,
      registTime: data.registTime,
    };
  },
};
