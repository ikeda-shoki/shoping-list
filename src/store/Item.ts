import { serverTimestamp, FieldValue } from "firebase/firestore";
import { reactive } from "vue";
import { stores } from "./global";

export type Item = {
  itemId: string;
  itemName: string;
  categoryId: string | null;
  updateTime: FieldValue;
  registTime: FieldValue;
};

export function itemsStore() {
  const items: Item[] = reactive([
    {
      itemId: "",
      itemName: "",
      categoryId: "",
      updateTime: serverTimestamp(),
      registTime: serverTimestamp(),
    },
  ]);
  return items;
}

export function setitems(itemsData: Item[]) {
  const items: Item[] = [];
  itemsData.map((itemData) => {
    const item: Item = {
      itemId: itemData.itemId,
      itemName: itemData.itemName,
      categoryId: itemData.categoryId,
      updateTime: itemData.updateTime,
      registTime: itemData.registTime,
    };
    items.push(item);
  });
  stores.items = items;
  return stores;
}
