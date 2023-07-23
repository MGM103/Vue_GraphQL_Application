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
      <button>Change Password</button>
    </Form>
    <div class="return-login">
      <p>
        Remembered your details? Return to <router-link to="/login">Login</router-link> page now!
      </p>
    </div>
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

<style lang="scss" scoped>
.forgot-password-content {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  flex-direction: column;

  h1 {
    color: whitesmoke;
  }

  h2 {
    color: whitesmoke;
    text-align: center;
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

.return-login {
  font-size: 0.9em;
  color: rgba(255, 255, 255, 0.65);
  margin: 15px 0 5px;

  a {
    text-decoration: none;
    color: rgb(0, 255, 128, 0.8);
    font-size: 0.9em;

    &:hover {
      text-decoration: underline;
      color: rgb(0, 255, 128, 0.9);
    }
  }
}
</style>
