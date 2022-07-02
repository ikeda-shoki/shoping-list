<script setup lang="ts">
import InputTitle, { InputData } from "../../components/parts/InputTitle.vue";
import InputText, { InputFieldData } from "../../components/parts/InputText.vue";
import BasicButton from "../../components/parts/BasicButton.vue";
import { Item } from "../../store/Item";
import { moveTop } from "../../logic/MoveTop";
import { serverTimestamp } from "firebase/firestore";
import { isRequireError, isMaxlengthError } from "../../logic/FormError";
import { reactive, ref } from "vue";

const newItem: Item = reactive({
  itemId: "",
  itemName: "",
  categoryId: "",
  updateTime: serverTimestamp(),
  registTime: serverTimestamp(),
});

const itemNameInputData: InputData = {
  titleName: "アイテム",
  required: true,
};

const itemNameInputFieldData: InputFieldData = {
  id: "アイテム",
  example: "洗剤",
  maxlength: 50,
};

const itemNameErrorMessages = ref<string[]>([]);

function checkItemName(itemName: string, maxlength: number) {
  itemNameErrorMessages.value.length = 0;
  if (isRequireError(itemName)) {
    itemNameErrorMessages.value.push("アイテムを入力して下さい");
  }
  if (isMaxlengthError(itemName, maxlength)) {
    itemNameErrorMessages.value.push("アイテムは" + maxlength + "文字以内で入力して下さい");
  }
}

function checkFormError() {
  checkItemName(newItem.itemName, itemNameInputFieldData.maxlength);
}

const toRegistItem = () => {
  checkFormError();
  if (itemNameErrorMessages.value.length !== 0) {
    moveTop();
    return;
  }

  // アイテム登録処理
};
</script>

<template>
  <div>
    <div class="regist-item">
      <form class="item-inputs" @submit.prevent="toRegistItem()">
        <div class="item-input-name">
          <InputTitle :input-data="itemNameInputData"></InputTitle>
          <InputText v-model="newItem.itemName" :input-field-data="itemNameInputFieldData" :error-messages="itemNameErrorMessages"></InputText>
        </div>
        <div class="item-input-button">
          <BasicButton type="submit" title="アイテムを登録する" font-color="{ text-color: white }" color="#e47863"></BasicButton>
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
