<template>
  <div id="not-found">
    <b-icon-x-square-fill variant="danger" scale="2"></b-icon-x-square-fill>
    <h1>Not Found</h1>
    <p>
      Oops, we couldn't find that page. Try going
      <router-link to="/">home</router-link>
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
h1 {
  margin-top: 20px;
  font-weight: bold;
  color: darkgoldenrod;
}
p {
  margin-top: 20px;
  color: whitesmoke;
}
</style>