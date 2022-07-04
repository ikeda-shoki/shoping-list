<script setup lang="ts">
import InputTitle, { InputData } from "../../components/parts/InputTitle.vue";
import InputText, { InputFieldData } from "../../components/parts/InputText.vue";
import InputColorRadioButton from "../../components/parts/InputColorRadioButton.vue";
import BasicButton from "../../components/parts/BasicButton.vue";
import { Category, setCategory, categoryStore } from "../../store/Category";
import { moveTop } from "../../logic/MoveTop";
import { serverTimestamp } from "firebase/firestore";
import { isRequireError, isMaxlengthError } from "../../logic/FormError";
import { useGlogalStore, States } from "../../store/global";
import router, { getCategoryUrlId } from "../../router";
import { reactive, ref } from "vue";

const state = ref<States>(useGlogalStore());

const categoryUrlId = ref<string>(getCategoryUrlId());

const newCategory: Category = reactive({
  categoryId: "",
  categoryName: "",
  categoryColor: "",
  categoryImage: "",
  registItems: [],
  updateTime: serverTimestamp(),
  registTime: serverTimestamp(),
});

const categoryNameInputData: InputData = {
  titleName: "カテゴリーネーム",
  required: true,
};

const colorInputData: InputData = {
  titleName: "カラー",
  required: true,
};

const categoryNameInputFieldData: InputFieldData = {
  id: "カテゴリーネーム",
  example: "食品",
  maxlength: 30,
};

const categoryNameErrorMessages = ref<string[]>([]);
const categoryColorErrorMessages = ref<string[]>([]);

function checkCategoryName(categoryName: string, maxlength: number) {
  categoryNameErrorMessages.value = [];
  if (isRequireError(categoryName)) {
    categoryNameErrorMessages.value.push("カテゴリーネームを入力して下さい");
  }
  if (isMaxlengthError(categoryName, maxlength)) {
    categoryNameErrorMessages.value.push("カテゴリーネームは" + maxlength + "文字以内で入力して下さい");
  }
}

function checkCategoryColor(categoryColor: string) {
  categoryColorErrorMessages.value = [];
  if (isRequireError(categoryColor)) {
    categoryColorErrorMessages.value.push("カテゴリーカラーを選択して下さい");
  }
}

function checkFormError() {
  checkCategoryColor(newCategory.categoryColor);
  checkCategoryName(newCategory.categoryName, categoryNameInputFieldData.maxlength);
}

const toRegistItemPage = () => {
  checkFormError();
  if (categoryColorErrorMessages.value.length !== 0 || categoryNameErrorMessages.value.length !== 0) {
    moveTop();
    return;
  }

  let params = "new";
  if (newCategory.categoryId !== "") {
    params = newCategory.categoryId;
  }
  newCategory.categoryId = params;
  setCategory(newCategory);
  router.push({ name: "registItem", params: { categoryId: params } });
};

function checkCategoryData() {
  if (categoryUrlId.value === state.value.registCategory.categoryId) {
    state.value.categorys.map((category: Category) => {
      if (category.categoryId === categoryUrlId.value) {
        newCategory.categoryId = category.categoryId;
        newCategory.categoryName = category.categoryName;
        newCategory.categoryColor = category.categoryColor;
        newCategory.categoryImage = category.categoryImage;
      }
    });
  } else if (categoryUrlId.value === "new") {
    state.value.registCategory = categoryStore();
  }
}

checkCategoryData();
</script>

<template>
  <div>
    <div class="regist-category">
      <form class="category-inputs" @submit.prevent="toRegistItemPage()">
        <div class="category-input-name">
          <InputTitle :input-data="categoryNameInputData"></InputTitle>
          <InputText
            v-model="newCategory.categoryName"
            :input-field-data="categoryNameInputFieldData"
            :error-messages="categoryNameErrorMessages"
          ></InputText>
        </div>
        <div class="category-color-input">
          <InputTitle :input-data="colorInputData"></InputTitle>
          <div class="category-colors">
            <InputColorRadioButton v-model="newCategory.categoryColor" :error-messages="categoryColorErrorMessages"></InputColorRadioButton>
          </div>
        </div>
        <div class="category-input-button">
          <BasicButton type="submit" title="アイテムを追加する" font-color="{ text-color: white }" color="#e47863"></BasicButton>
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.regist-category {
  padding: 20px 10px;

  .category-inputs {
    margin-bottom: 80px;

    .category-input-name {
      margin-bottom: 35px;
    }

    .input-icon {
      color: #f1a598;
      font-size: 18px;
    }

    .category-input-button {
      text-align: center;

      button {
        width: 80%;
        height: 60px;
        font-size: 18px;
      }
    }
  }
}
</style>
