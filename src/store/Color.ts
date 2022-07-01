import { reactive } from "vue";
import { stores } from "./global";

export type Color = {
  colorId: string;
  color: string;
};

export function colorStore() {
  const colors: Color[] = reactive([
    {
      colorId: "",
      color: "",
    },
  ]);
  return colors;
}

export function setColor(colorsData: Color[]) {
  const colors: Color[] = [];
  colorsData.map((colorData) => {
    const color: Color = {
      colorId: colorData.colorId,
      color: colorData.color,
    };
    colors.push(color);
  });
  stores.colors = colors;
  return stores;
}
