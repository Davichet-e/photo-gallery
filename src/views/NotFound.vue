<template>
  <div id="not-found">
    <b-icon-x-square-fill variant="danger" scale="2"></b-icon-x-square-fill>
    <h1 class="not-found-heading">Not Found</h1>
    <p class="not-found-text">
      Oops, we couldn't find that page. Try going
      <router-link to="/" class="not-found-link">home</router-link>
    </p>
  </div>
</template>

<style scoped>
#not-found {
  height: 75vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.not-found-heading {
  color: goldenrod;
  margin-top: 20px;
  font-weight: bold;
}

.not-found-text {
  margin-top: 20px;
  color: whitesmoke;
}

.not-found-link {
  color: teal;
}
</style>
