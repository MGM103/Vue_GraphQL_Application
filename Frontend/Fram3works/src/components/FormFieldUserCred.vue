<template>
  <div class="form-field">
    <h2 v-if="heading">{{ heading }}</h2>
    <label v-if="label"> {{ label }} </label>
    <template v-if="slottedContent">
      <slot></slot>
    </template>
    <div class="default-content" v-else>
      <InputFieldUserCred v-model="inputValue" @input="input" />
    </div>
    <div id="helperText" class="helper-text" v-if="helperText">
      <p>{{ helperText }}</p>
    </div>
    <template v-if="this.$slots.helperContent">
      <slot name="helperContent"></slot>
    </template>
    <div id="submitBtn" v-if="submitBtn">
      <button>{{ submitBtn }}</button>
    </div>
    <div v-if="this.$slots.extraContent">
      <slot name="extraContent"></slot>
    </div>
  </div>
</template>

<script>
import InputFieldUserCred from './InputFieldUserCred.vue';

export default {
  name: 'FormFieldUserCred',
  components: {
    InputFieldUserCred
  },
  props: {
    heading: {
      type: String
    },
    helperText: {
      type: String
    },
    label: {
      type: String
    },
    submitBtn: {
      type: String
    }
  },
  data() {
    return {
      inputValue: null
    };
  },
  computed: {
    slottedContent() {
      console.log(`Default slot: ${this.$slots.default}`);
      return this.$slots.default;
    }
  },
  methods: {
    input(val) {
      this.inputValue = val;
      this.$emit('update:inputValue', val);
    }
  }
};
</script>

<style lang="scss" scoped>
.form-field {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  flex-direction: column;

  h2 {
    color: whitesmoke;
  }

  button {
    width: 300px;
    height: 30px;
    border-radius: 35px;
    background-color: rgb(0, 255, 128, 0.8);
    border: none;
    outline: none;
    cursor: pointer;
    font-size: 0.8em;
    font-weight: 550;

    &:hover {
      background-color: rgb(0, 255, 128, 0.9);
    }
  }
}
</style>
