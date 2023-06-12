<template>
  <div class="input-field">
    <template v-if="hasIcon()">
      <template v-if="isUsername()">
        <ion-icon name="mail-outline"></ion-icon>
      </template>
      <template v-if="isPassword()">
        <ion-icon name="lock-closed-outline"></ion-icon>
      </template>
    </template>
    <input
      :id="id"
      class="input-field"
      :type="inputType"
      :placeholder="placeholderText"
      v-model="inputValue"
      @input="input($event)"
    />
  </div>
</template>

<script>
import { iconEnum } from '../enums/index';

export default {
  name: 'InputFieldUserCred',
  props: {
    id: {
      type: String
    },
    icon: {
      type: String,
      default: iconEnum.NONE
    },
    inputType: {
      type: String
      // default: inputFieldTypeEnum.TEXT
    },
    placeholderText: {
      type: String
    }
  },
  data() {
    return {
      inputValue: this.value
    };
  },
  methods: {
    input(event) {
      this.inputValue = event.target.value;
      this.$emit('update:modelValue', event.target.value);
    },
    hasIcon() {
      return this.icon != iconEnum.NONE;
    },
    onEnter() {
      return this.$emit('onEnter');
    },
    isUsername() {
      return this.icon === iconEnum.USERNAME;
    },
    isPassword() {
      return this.icon === iconEnum.PASSWORD;
    }
  }
};
</script>

<style lang="scss" scoped>
.input-field {
  position: relative;
  margin: 10px 0;
  min-width: 300px;

  input {
    width: 100%;
    height: 50px;
    background: transparent;
    border: none;
    outline: none;
    font-size: 1em;
    padding: 20px 35px 0 5px;
    color: whitesmoke;
    position: relative;
    border-bottom: 2px solid white;

    &::placeholder {
      color: rgba(255, 255, 255, 0.7);
    }

    &:focus {
      border-bottom: 2px solid rgb(0, 255, 128, 0.65);
    }
  }

  ion-icon {
    color: white;
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50);
    font-size: 1.1em;
  }
}
</style>
