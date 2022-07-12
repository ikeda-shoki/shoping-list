<script setup lang="ts">
import InputTitle, { InputData } from "../../components/parts/InputTitle.vue";
import InputText, { InputFieldData } from "../../components/parts/InputText.vue";
import BasicButton from "../../components/parts/BasicButton.vue";
import ErrorMessage from "../../components/parts/ErrorMessage.vue";
import ItemList from "../../components/commons/ItemList.vue";
import { Item } from "../../store/Item";
import { moveTop } from "../../logic/MoveTop";
import { serverTimestamp } from "firebase/firestore";
import { addCategory, getCategorys, addRegistItems, getCategory, updateCategory } from "../../logic/FirebaseAction";
import { isRequireError, isMaxlengthError } from "../../logic/FormError";
import { useGlogalStore, States } from "../../store/global";
import { categoryStore, getCategoryId } from "../../store/Category";
import router, { getCategoryUrlId } from "../../router";
import { reactive, ref } from "vue";

const state = ref<States>(useGlogalStore());

const newItem: Item = reactive({
  itemId: "",
  itemName: "",
  categoryId: state.value.registCategory.categoryId,
  updateTime: serverTimestamp(),
  registTime: serverTimestamp(),
});

const newItems = ref<Item[]>([]);

const itemNameInputData: InputData = {
  titleName: "アイテム",
  required: true,
};

const categoryNameInputData: InputData = {
  titleName: "カテゴリーネーム",
  required: false,
};

const registItemsData: InputData = {
  titleName: "登録アイテム",
  required: false,
};

const itemNameInputFieldData: InputFieldData = {
  id: "アイテム",
  example: "洗剤",
  maxlength: 50,
};

const itemNameErrorMessages = ref<string[]>([]);
const itemsErrorMessages = ref<string[]>([]);

function checkItemName(itemName: string, maxlength: number) {
  itemNameErrorMessages.value = [];
  if (isRequireError(itemName)) {
    itemNameErrorMessages.value.push("アイテムを入力して下さい");
  }
  if (isMaxlengthError(itemName, maxlength)) {
    itemNameErrorMessages.value.push("アイテムは" + maxlength + "文字以内で入力して下さい");
  }
}

function checkItem(newItems: Item[]) {
  itemsErrorMessages.value = [];
  if (newItems.length === 0) {
    itemsErrorMessages.value.push("アイテムを1つ以上登録して下さい");
  }
}

const addItem = (e: Item, type: string) => {
  if (type === "registItem") {
    checkItemName(newItem.itemName, itemNameInputFieldData.maxlength);

    if (itemNameErrorMessages.value.length !== 0) {
      moveTop();
      return;
    }

    const newItemData: Item = {
      itemId: e.itemId,
      itemName: e.itemName,
      categoryId: e.categoryId,
      registTime: e.registTime,
      updateTime: e.updateTime,
    };

    newItems.value.push(newItemData);
  } else if (type === "saveItem") {
    newItems.value.push(e);
  }

  newItem.itemName = "";

  checkItem(newItems.value);
};

const deleteItem = (e: Item) => {
  const newItemsData = newItems.value.filter((item) => item.itemName !== e.itemName);
  newItems.value = newItemsData;
};

async function registItems() {
  try {
    checkItem(newItems.value);
    if (itemsErrorMessages.value.length !== 0) {
      moveTop();
      return;
    }

    let registCategoryId = state.value.registCategory.categoryId;
    // 新規カテゴリー登録処理
    if (state.value.registCategory.categoryId === "new") {
      await addCategory(state.value.registCategory, state.value.loginUser.userId);
      const newCategorys = await getCategorys(state.value.loginUser.userId);
      registCategoryId = await getCategoryId(newCategorys, state.value.registCategory.categoryName);
    }
    // カテゴリー更新処理
    else {
      await updateCategory(state.value.registCategory, state.value.loginUser.userId);
    }
    // アイテム登録処理
    await addRegistItems(newItems.value, state.value.loginUser.userId, registCategoryId);

    state.value.registCategory = await categoryStore();

    await router.push({ path: "/itemsList" });
  } catch (error) {
    console.log("アイテムの登録に失敗しました。");
    router.push({ name: "errors" });
  }
}

async function checkCategoryData() {
  const categoryUrlId = getCategoryUrlId();
  if (categoryUrlId !== state.value.registCategory.categoryId) {
    const category = await getCategory(state.value.loginUser.userId, categoryUrlId);

    if (category !== null) {
      state.value.registCategory = category;
    }
  }
}

function toRegistCategoryPage() {
  router.push({ name: "registCategory", params: { categoryId: state.value.registCategory.categoryId } });
}

checkCategoryData();
</script>

<template>
  <div>
    <div class="regist-item">
      <div class="item-inputs">
        <div class="category-input-name">
          <InputTitle :input-data="categoryNameInputData"></InputTitle>
          <p class="regit-item-category-name">{{ state.registCategory.categoryName }}</p>
        </div>
        <div class="item-input-name">
          <InputTitle :input-data="itemNameInputData"></InputTitle>
          <InputText v-model="newItem.itemName" :input-field-data="itemNameInputFieldData" :error-messages="itemNameErrorMessages"></InputText>
          <div class="item-add-form">
            <button @click="addItem(newItem, 'registItem')"><v-icon class="item-add-button">mdi-plus-circle</v-icon></button>
          </div>
        </div>
        <div class="regist-item-list">
          <template v-if="itemsErrorMessages.length !== 0">
            <ErrorMessage :error-messages="itemsErrorMessages"></ErrorMessage>
          </template>
          <InputTitle :input-data="registItemsData"></InputTitle>
          <template v-if="newItems.length === 0">
            <p class="regist-item-list-description">
              <span>※</span>
              登録アイテムが未入力です。
              <br />
              アイテム入力欄の右下のプラスボタンからアイテムを仮登録して下さい
            </p>
          </template>
          <template v-else>
            <ItemList :items="newItems" :type="'registItem'" @delete-item="deleteItem($event)"></ItemList>
          </template>
        </div>

        <div class="item-input-button">
          <BasicButton title="カテゴリーに戻る" font-color="{ text-color: white }" color="#B4C0B3" @click="toRegistCategoryPage()"></BasicButton>
          <BasicButton
            type="submit"
            title="アイテムを登録する"
            font-color="{ text-color: white }"
            color="#e47863"
            @click="registItems()"
          ></BasicButton>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.regist-item {
  padding: 20px 10px;

  .item-inputs {
    margin-bottom: 80px;

    .regit-item-category-name {
      padding: 10px 0px 5px 10px;
      margin-bottom: 15px;
      font-weight: bold;
      font-size: 22px;
      border-bottom: 3px dotted #f1a598;
    }

    .item-input-name {
      margin-bottom: 35px;
      position: relative;
      padding-bottom: 30px;
      border-bottom: 3px dotted #f1a598;

      .item-add-form {
        position: absolute;
        bottom: 18px;
        right: 10px;

        .item-add-button {
          font-size: 30px;
        }
      }
    }

    .regist-item-list {
      .regist-item-list-description {
        padding: 10px;
        opacity: 0.7;
        font-size: 14px;

        span {
          color: #ea1a1e;
        }
      }
    }

    .input-icon {
      color: #f1a598;
      font-size: 18px;
    }

    .item-input-button {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      margin: 50px 0 30px;

      button {
        width: 45%;
        height: 60px;
        font-size: 15px;
      }
    }
  }
}
</style>
