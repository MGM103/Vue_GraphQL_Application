<template>
  <div class="forgot-password-content">
    <h2>Forgot Password</h2>
    <div id="step1" v-if="currentStep == 1">
      <InputFieldUserCred
        id="username"
        icon="mail"
        inputType="text"
        placeholderText="username"
        v-model="username"
      />
      <button @click="getCredentials()">Submit</button>
    </div>
    <div id="step2" v-if="currentStep == 2">
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
      <button @click="updatePassword()">Change Password</button>
    </div>
    <div class="return-login">
      <p>
        Remembered your details? Return to <router-link to="/login">Login</router-link> page now!
      </p>
    </div>
    <div id="error" class="invalid-username" v-if="error">
      <p>Username does not exist.</p>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue';
import { gql } from 'graphql-tag';
import { useLazyQuery, useMutation } from '@vue/apollo-composable';
import { useRouter } from 'vue-router';

// Component imports
import InputFieldUserCred from '../components/InputFieldUserCred.vue';

export default {
  name: 'ForgotPassword',
  components: {
    InputFieldUserCred
  },
  setup() {
    const router = useRouter();

    // Define state variable
    const currentStep = ref(1);
    const username = ref(null);
    const id = ref(null);
    const newPassword = ref(null);
    const confirmNewPassword = ref(null);

    // GraphQL Queries
    const userCredentialsQuery = gql`
      query GetUserByName($name: String!) {
        getUserByName(name: $name) {
          username
          _id
        }
      }
    `;

    const passwordMutation = gql`
      mutation ChangePassword($id: ID!, $password: String!) {
        changePassword(_id: $id, password: $password)
      }
    `;

    // GraphQL Methods
    const { result, load, refetch, error } = useLazyQuery(userCredentialsQuery, () => ({
      name: username.value
    }));

    const userCredentials = computed(() => result.value?.getUserByName ?? []);

    watch(userCredentials, (data) => {
      id.value = data._id;
      incrementCurrentStep();
    });

    const getCredentials = () => {
      load() || refetch();
    };

    const { mutate: changePassword } = useMutation(passwordMutation);

    // Methods
    const incrementCurrentStep = () => {
      currentStep.value++;
    };

    const updatePassword = () => {
      if (newPassword.value === confirmNewPassword.value) {
        changePassword({ id: id.value, password: newPassword.value });
        router.push('/login');
      } else {
        alert(`Passwords do not match. ${newPassword.value} & ${confirmNewPassword.value}`);
      }
    };

    return {
      currentStep,
      username,
      newPassword,
      confirmNewPassword,
      error,
      getCredentials,
      updatePassword
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

.invalid-username {
  font-size: 0.9em;
  color: rgb(223, 48, 48);
  margin: 5px 0;
}
</style>
