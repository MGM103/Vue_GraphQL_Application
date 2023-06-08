<template>
  <div class="login-content">
    <h1>Login</h1>
    <div class="input-field">
      <ion-icon name="mail-outline"></ion-icon>
      <input type="text" id="username" v-model="username" placeholder="username" />
    </div>
    <div class="input-field">
      <ion-icon name="lock-closed-outline"></ion-icon>
      <input type="password" id="password" v-model="password" placeholder="password" />
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

.input-field {
  position: relative;
  margin: 10px 0;
  min-width: 300px;
  border-bottom: 2px solid white;

  label {
    position: absolute;
    top: 20%;
    left: 5px;
    pointer-events: none;
    font-size: 1em;
    color: whitesmoke;
  }

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
  }

  input::placeholder {
    color: rgba(255, 255, 255, 0.7);
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
