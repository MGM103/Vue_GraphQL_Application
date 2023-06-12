<template>
  <div class="create-account-content">
    <FormFieldUserCred heading="Create Account" submitBtn="Create">
      <template v-slot:default>
        <InputFieldUserCred
          id="username"
          icon="mail"
          inputType="text"
          placeholderText="username"
          v-model="username"
        >
        </InputFieldUserCred>
        <InputFieldUserCred
          id="password"
          icon="lock"
          inputType="password"
          placeholderText="new password"
          v-model="password"
        >
        </InputFieldUserCred>
        <InputFieldUserCred
          id="confirmPassword"
          icon="lock"
          inputType="password"
          placeholderText="confirm password"
          v-model="confirmPassword"
        >
        </InputFieldUserCred>
      </template>
      <template v-slot:extraContent>
        <div class="sign-in">
          <p>Already have an account? <router-link to="/login">Sign In</router-link> now!</p>
        </div>
      </template>
    </FormFieldUserCred>
  </div>
</template>

<script>
import FormFieldUserCred from '../components/FormFieldUserCred.vue';
import InputFieldUserCred from '../components/InputFieldUserCred.vue';

export default {
  name: 'CreateAccount',
  components: {
    FormFieldUserCred,
    InputFieldUserCred
  },
  date() {
    return {
      username: null,
      password: null,
      confirmPassword: null
    };
  }
};
</script>

<style lang="scss" scoped>
.create-account-content {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  flex-direction: column;

  h1 {
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

.sign-in {
  font-size: 0.9em;
  color: rgba(255, 255, 255, 0.75);
  margin: 10px 0 5px;

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
