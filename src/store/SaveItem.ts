import { serverTimestamp, FieldValue } from "firebase/firestore";
import { reactive } from "vue";
import { stores } from "./global";

export type SaveItem = {
  saveItemId: string;
  saveItemName: string;
  categoryId: string | null;
  updateTime: FieldValue;
  registTime: FieldValue;
};

export function saveItemsStore() {
  const saveItems: SaveItem[] = reactive([
    {
      saveItemId: "",
      saveItemName: "",
      categoryId: "",
      updateTime: serverTimestamp(),
      registTime: serverTimestamp(),
    },
  ]);
  return saveItems;
}

export function setSaveItems(saveItemsData: SaveItem[]) {
  const saveItems: SaveItem[] = [];
  saveItemsData.map((saveItemData) => {
    const saveItem: SaveItem = {
      saveItemId: saveItemData.saveItemId,
      saveItemName: saveItemData.saveItemName,
      categoryId: saveItemData.categoryId,
      updateTime: saveItemData.updateTime,
      registTime: saveItemData.registTime,
    };
    saveItems.push(saveItem);
  });
  stores.saveItems = saveItems;
  return stores;
}
