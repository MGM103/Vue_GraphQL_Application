<template>
  <div class="login-content">
    <FormFieldUserCred heading="Login" submitBtn="Submit">
      <template v-slot:default>
        <InputFieldUserCred
          id="username"
          icon="mail"
          inputType="text"
          placeholderText="username"
          v-model="username"
        />
        <InputFieldUserCred
          id="password"
          icon="lock"
          inputType="password"
          placeholderText="password"
          v-model="password"
        />
      </template>
      <template v-slot:helperContent>
        <div class="forgot-pwd">
          <router-link to="#">Forgot password</router-link>
        </div>
      </template>
      <template v-slot:extraContent>
        <div class="create-account">
          <p>Don't have an account? <router-link to="#">Sign up</router-link> now!</p>
        </div>
      </template>
    </FormFieldUserCred>
  </div>
</template>

<script>
import InputFieldUserCred from '../components/InputFieldUserCred.vue';
import FormFieldUserCred from '../components/FormFieldUserCred.vue';

export default {
  name: 'LoginScreen',
  components: {
    InputFieldUserCred,
    FormFieldUserCred
  },
  data() {
    return {
      username: null,
      password: null
    };
  }
};
</script>

<style lang="scss" scoped>
.login-content {
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

.forgot-pwd {
  margin-bottom: 10px;

  a {
    text-decoration: none;
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.8em;

    &:hover {
      text-decoration: underline;
      color: rgba(255, 255, 255, 0.95);
    }
  }
}

.create-account {
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
