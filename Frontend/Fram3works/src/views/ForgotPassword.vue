<template>
  <div class="forgot-password-content">
    <FormFieldUserCred heading="Forgot Password" submitBtn="Update">
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
    </FormFieldUserCred>
  </div>
</template>

<script>
import FormFieldUserCred from '../components/FormFieldUserCred.vue';
import InputFieldUserCred from '../components/InputFieldUserCred.vue';

export default {
  name: 'ForgotPassword',
  components: {
    FormFieldUserCred,
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
