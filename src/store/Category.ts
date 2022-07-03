import { Item } from "./Item";
import { stores } from "./global";
import { serverTimestamp, FieldValue } from "firebase/firestore";
import { reactive } from "vue";

export type Category = {
  categoryId: string;
  categoryName: string;
  categoryImage: string;
  categoryColor: string;
  updateTime: FieldValue;
  registTime: FieldValue;
  registItems: Item[];
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
      registItems: [],
    },
  ]);
  return categorys;
}

export function categoryStore() {
  const category: Category = reactive({
    categoryId: "",
    categoryName: "",
    categoryImage: "",
    categoryColor: "",
    updateTime: serverTimestamp(),
    registTime: serverTimestamp(),
    registItems: [],
  });
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
      registItems: categoryData.registItems,
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
    registItems: categoryData.registItems,
  };
  stores.registCategory = category;
  return stores;
}

export const defaultCategorys: Category[] = [
  {
    categoryId: "",
    categoryName: "食品",
    categoryImage: "",
    categoryColor: "#EBAF4F",
    registTime: serverTimestamp(),
    updateTime: serverTimestamp(),
    registItems: [],
  },
  {
    categoryId: "",
    categoryName: "日用品",
    categoryImage: "",
    categoryColor: "#FEE356",
    registTime: serverTimestamp(),
    updateTime: serverTimestamp(),
    registItems: [],
  },
  {
    categoryId: "",
    categoryName: "雑貨",
    categoryImage: "",
    categoryColor: "#5AA374",
    registTime: serverTimestamp(),
    updateTime: serverTimestamp(),
    registItems: [],
  },
  {
    categoryId: "",
    categoryName: "その他",
    categoryImage: "",
    categoryColor: "#B4C0B3",
    registTime: serverTimestamp(),
    updateTime: serverTimestamp(),
    registItems: [],
  },
];

export function getCategoryId(categorys: Category[], categoryName: string) {
  let categoryId = "";
  categorys.map((category: Category) => {
    if (category.categoryName === categoryName) {
      categoryId = category.categoryId;
    }
  });
  return categoryId;
}

export async function setCategoryItems(category: Category, items: Item[], type: string) {
  if (type === "registItems") {
    category.registItems = items;
  } else if (type === "saveItems") {
    // saveItem代入予定
    console.log("saveItems登録");
  }
}
