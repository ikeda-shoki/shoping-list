<script setup lang="ts">
import InputTitle, { InputData } from "../../components/parts/InputTitle.vue";
import InputText, { InputFieldData } from "../../components/parts/InputText.vue";
import InputColorRadioButton from "../../components/parts/InputColorRadioButton.vue";
import BasicButton from "../../components/parts/BasicButton.vue";
import { Item } from "../../store/Item";
import { moveTop } from "../../logic/MoveTop";
import { serverTimestamp } from "firebase/firestore";
import { isRequireError, isMaxlengthError } from "../../logic/FormError";
import { reactive, ref } from "vue";
import router from "../../router";

const newItem: Item = reactive({
  itemId: "",
  itemName: "",
  categoryId: "",
  updateTime: serverTimestamp(),
  registTime: serverTimestamp(),
});

const itemNameInputData: InputData = {
  titleName: "カテゴリーネーム",
  required: true,
};

const colorInputData: InputData = {
  titleName: "カラー",
  required: true,
};

const itemNameInputFieldData: InputFieldData = {
  id: "カテゴリーネーム",
  example: "食品",
  maxlength: 30,
};

const itemNameErrorMessages = ref<string[]>([]);
const itemColorErrorMessages = ref<string[]>([]);

function checkItemName(itemName: string, maxlength: number) {
  itemNameErrorMessages.value.length = 0;
  if (isRequireError(itemName)) {
    itemNameErrorMessages.value.push("カテゴリーネームを入力して下さい");
  }
  if (isMaxlengthError(itemName, maxlength)) {
    itemNameErrorMessages.value.push("カテゴリーネームは" + maxlength + "以内で入力して下さい");
  }
}

function checkItemColor(itemColor: string) {
  itemColorErrorMessages.value.length = 0;
  if (isRequireError(itemColor)) {
    itemColorErrorMessages.value.push("カテゴリーカラーを選択して下さい");
  }
}

function checkFormError() {
  checkItemColor(newItem.itemColor);
  checkItemName(newItem.itemName, itemNameInputFieldData.maxlength);
}

const toRegistItem = () => {
  checkFormError();
  if (itemColorErrorMessages.value.length !== 0 || itemNameErrorMessages.value.length !== 0) {
    moveTop();
    return;
  }

  let params = "new";
  if (newItem.itemId !== "") {
    params = newItem.itemId;
  } else {
    sessionStorage.setItem("newItemName", newItem.itemName);
    sessionStorage.setItem("newItemColor", newItem.itemColor);
  }
  router.push({ name: "registItem", params: { itemId: params } });
};
</script>

<template>
  <div>
    <div class="regist-item">
      <form class="item-inputs" @submit.prevent="toRegistItem()">
        <div class="item-input-name">
          <InputTitle :input-data="itemNameInputData"></InputTitle>
          <InputText
            v-model="newItem.itemName"
            :input-field-data="itemNameInputFieldData"
            :error-messages="itemNameErrorMessages"
          ></InputText>
        </div>
        <div class="item-color-input">
          <InputTitle :input-data="colorInputData"></InputTitle>
          <div class="item-colors">
            <InputColorRadioButton v-model="newItem.itemColor" :error-messages="itemColorErrorMessages"></InputColorRadioButton>
          </div>
        </div>
        <div class="item-input-button">
          <BasicButton type="submit" title="アイテムを追加する" font-color="{ text-color: white }" color="#e47863"></BasicButton>
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.regist-item {
  padding: 20px 10px;

  .item-inputs {
    margin-bottom: 80px;

    .item-input-name {
      margin-bottom: 35px;
    }

    .input-icon {
      color: #f1a598;
      font-size: 18px;
    }

    .item-input-button {
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

