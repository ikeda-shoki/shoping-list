import { serverTimestamp, FieldValue } from "firebase/firestore";
import { reactive } from "vue";

export type RegistItem = {
  registItemsId: string;
  registItemName: string;
  updateTime: FieldValue;
  registTime: FieldValue;
};

export function registItemsStore() {
  const registItems: RegistItem = reactive({
    registItemsId: "",
    registItemName: "",
    updateTime: serverTimestamp(),
    registTime: serverTimestamp(),
  });
  return registItems;
}

export function setRegistItem(registItem: RegistItem) {
  //処理記載予定
  console.log(registItem);
}
