<template>
  <div class="forgot-password-content">
    <h2>Forgot Password</h2>
    <Form id="forgot-pwd-form" @submit="onSubmit">
      <InputFieldUserCred
        id="newPassword"
        icon="lock"
        inputType="password"
        placeholderText="New Password"
        v-model="newPassword"
      />
      <InputFieldUserCred
        id="confirmNewPassword"
        icon="lock"
        inputType="password"
        placeholderText="Confirm Password"
        v-model="confirmNewPassword"
      />
    </Form>
  </div>
</template>

<script>
import InputFieldUserCred from '../components/InputFieldUserCred.vue';
import { Form } from 'vee-validate';

export default {
  name: 'ForgotPassword',
  components: {
    Form,
    InputFieldUserCred
  },
  data() {
    return {
      newPassword: null,
      confirmNewPassword: null
    };
  }
};
</script>

<style lang="scss" scoped></style>
