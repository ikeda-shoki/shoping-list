import { Category, setCategoryItems } from "./Category";
import { getItems } from "../logic/FirebaseAction";
import { serverTimestamp, FieldValue } from "firebase/firestore";
import { reactive } from "vue";

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

export async function setItems(categorysData: Category[], uid: string) {
  await Promise.all(
    categorysData.map(async (category: Category) => {
      const registItems: Item[] = await getItems(uid, category.categoryId, "registItems");
      await setCategoryItems(category, registItems, "registItems");
    })
  );
}
