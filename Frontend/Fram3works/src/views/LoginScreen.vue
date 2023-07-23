<template>
  <div class="login-content">
    <Form id="login-form" @submit="onSubmit">
      <h2>Login</h2>
      <InputFieldUserCred
        id="email"
        icon="mail"
        inputType="text"
        placeholderText="email"
        v-model="email"
      />
      <InputFieldUserCred
        id="password"
        icon="lock"
        inputType="password"
        placeholderText="password"
        v-model="password"
      />
      <button>Submit</button>
    </Form>
    <div class="forgot-pwd">
      <router-link to="#">Forgot password</router-link>
    </div>
    <div class="create-account">
      <p>Don't have an account? <router-link to="/create_account">Sign up</router-link> now!</p>
    </div>
  </div>
</template>

<script>
import InputFieldUserCred from '../components/InputFieldUserCred.vue';
import { Form } from 'vee-validate';

export default {
  name: 'LoginScreen',
  components: {
    InputFieldUserCred,
    Form
  },
  data() {
    return {
      email: null,
      password: null
    };
  },
  methods: {
    onSubmit() {
      console.log(`Submitted`);
      alert(`Username ${this.email} & Password: ${this.password}`);
    }
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
