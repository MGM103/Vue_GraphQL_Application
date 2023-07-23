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
    <Field
      :name="id"
      :type="inputType"
      class="input-field"
      :placeholder="placeholderText"
      @input="input($event)"
      :rules="ruleSet"
    />
  </div>
</template>

<script>
import { iconEnum } from '../enums/index';
import { Field } from 'vee-validate';
import { string } from 'yup';

export default {
  name: 'InputFieldUserCred',
  components: {
    Field
  },
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
    },
    placeholderText: {
      type: String
    }
  },
  computed: {
    ruleSet() {
      if (this.id === 'username') {
        const rule = string().email().required();
        console.log(rule);
        return rule;
      } else {
        return string().min(8).required();
      }
    }
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

    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus {
      -webkit-text-fill-color: #fff;
      -webkit-background-clip: text !important;
      font-family: Arial;
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
