import { serverTimestamp, FieldValue } from "firebase/firestore";
import { reactive } from "vue";
import { stores } from "./global";

export type Category = {
  categoryId: string;
  categoryName: string;
  categoryImage: string;
  categoryColor: string;
  updateTime: FieldValue;
  registTime: FieldValue;
};

export function categorysStore() {
  const categorys: Category[] = reactive([
    {
      categoryId: "",
      categoryName: "",
      categoryImage: "",
      categoryColor: "",
      updateTime: serverTimestamp(),
      registTime: serverTimestamp(),
    },
  ]);
  return categorys;
}

export function categoryStore() {
  const category: Category = reactive(
    {
      categoryId: "",
      categoryName: "",
      categoryImage: "",
      categoryColor: "",
      updateTime: serverTimestamp(),
      registTime: serverTimestamp(),
    },
  );
  return category;
}

export function setCategorys(categorysData: Category[]) {
  const categorys: Category[] = [];
  categorysData.map((categoryData) => {
    const category: Category = {
      categoryId: categoryData.categoryId,
      categoryName: categoryData.categoryName,
      categoryColor: categoryData.categoryColor,
      categoryImage: categoryData.categoryImage,
      updateTime: categoryData.updateTime,
      registTime: categoryData.registTime,
    };
    categorys.push(category);
  });
  stores.categorys = categorys;
  return stores;
}

export function setCategory(categoryData: Category) {
  const category: Category = {
    categoryId: categoryData.categoryId,
    categoryName: categoryData.categoryName,
    categoryColor: categoryData.categoryColor,
    categoryImage: categoryData.categoryImage,
    updateTime: categoryData.updateTime,
    registTime: categoryData.registTime,
  };
  stores.registCategory = category;
  return stores;
}

export const defaultCategorys: Category[] = [
  { categoryId: "", categoryName: "食品", categoryImage: "", categoryColor: "#EBAF4F", registTime: serverTimestamp(), updateTime: serverTimestamp() },
  {
    categoryId: "",
    categoryName: "日用品",
    categoryImage: "",
    categoryColor: "#FEE356",
    registTime: serverTimestamp(),
    updateTime: serverTimestamp(),
  },
  { categoryId: "", categoryName: "雑貨", categoryImage: "", categoryColor: "#5AA374", registTime: serverTimestamp(), updateTime: serverTimestamp() },
  {
    categoryId: "",
    categoryName: "その他",
    categoryImage: "",
    categoryColor: "#B4C0B3",
    registTime: serverTimestamp(),
    updateTime: serverTimestamp(),
  },
];
