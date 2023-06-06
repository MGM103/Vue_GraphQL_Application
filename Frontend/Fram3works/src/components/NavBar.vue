<template>
  <nav class="navbar">
    <h2 class="logo"><router-link to="/">Fram3works</router-link></h2>
    <ul class="nav-links">
      <li>
        <router-link to="/">Home</router-link>
      </li>
      <li>
        <router-link to="/naratives">Naratives</router-link>
      </li>
    </ul>
    <button type="button">My Profile</button>
  </nav>
</template>

<style lang="scss" scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 5px;
  padding-left: 5%;
  padding-right: 5%;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  background: rgba(39, 44, 47, 0.8);
  height: 45px;
}

.logo {
  color: whitesmoke;
  font-size: 24px;

  a {
    text-decoration: none;
    color: whitesmoke;
    font-weight: bold;
  }
}

nav ul li {
  list-style-type: none;
  display: inline-block;
  padding: 5px 10px;

  a {
    text-decoration: none;
    color: whitesmoke;
    font-weight: bold;

    &:hover {
      color: rgba(46, 206, 152, 0.9);
      transition: 0.3s;
    }
  }
}

button {
  border: none;
  background: rgba(46, 206, 152, 0.9);
  padding: 4px 15px;
  border-radius: 30px;
  color: whitesmoke;
  font-weight: bold;

  &:hover {
    cursor: pointer;
    transform: scale(1.05);
  }
}
</style>
