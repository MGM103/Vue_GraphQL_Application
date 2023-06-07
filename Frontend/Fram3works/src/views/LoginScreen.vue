<template>
  <div class="login-content">
    <h1>Login</h1>
    <div class="input-field">
      <ion-icon name="mail-outline"></ion-icon>
      <label for="username">Username:</label>
      <input type="text" id="username" v-model="username" />
    </div>
    <div class="input-field">
      <ion-icon name="lock-closed-outline"></ion-icon>
      <label for="password">Password:</label>
      <input type="password" id="password" v-model="password" />
    </div>
    <div class="forgot-pwd">
      <router-link to="#">Forgot password</router-link>
    </div>
    <button type="button">Sign in</button>
    <div class="create-account">
      <p>Don't have an account? <router-link to="#">Sign up</router-link> now!</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginScreen',
  date() {
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
}

.input-field {
  position: relative;
}
</style>
