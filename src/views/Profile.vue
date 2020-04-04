<template>
  <div>
    <div id="wrap">
      <h1>Name</h1>
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis, quaerat?</p>
      <b-icon-people-circle variant="light" class="h1" scale="2"></b-icon-people-circle>
      <ul class="bottom-line">
        <li>
          <ul class="bottom-line-left"></ul>
        </li>
        <li>
          <ul class="bottom-line-center">
            <li>
              <a href="#">
                <b-icon-arrow-bar-up></b-icon-arrow-bar-up>
              </a>
            </li>
            <li>
              <a href="#">
                <b-icon-heart-fill></b-icon-heart-fill>
              </a>
            </li>
            <li>
              <a href="#">
                <b-icon-person-plus></b-icon-person-plus>
              </a>
            </li>
            <li>
              <a href="#
              ">
                <b-icon-download></b-icon-download>
              </a>
            </li>
          </ul>
        </li>
        <li>
          <ul class="bottom-line-right"></ul>
        </li>
      </ul>
    </div>
    <b-nav pills class="mx-4 border border-secondary rounded">
      <b-nav-item @click="handleActive('Photos')" :active="active === 'Photos'">Photos</b-nav-item>
      <b-nav-item @click="handleActive('Users')" :active="active === 'Users'">Users</b-nav-item>
      <b-nav-item-dropdown
        id="my-nav-dropdown"
        text="Sort by"
        toggle-class="nav-link-custom"
        center
      >
        <b-dropdown-item>Most Recents</b-dropdown-item>
        <b-dropdown-item>Most Popular</b-dropdown-item>
      </b-nav-item-dropdown>
    </b-nav>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import Vue from "vue";

@Component
export default class Profile extends Vue {
  active = "Photos";
  handleActive(id: string) {
    this.active = id;
  }
}
</script>

<style scoped>
[class|="bottom-line"] {
  padding: 0;
  margin-top: auto;
  list-style: none;
  display: flex;
}
.bottom-line {
  width: 100vw;
  justify-content: space-between;
}
li {
  color: antiquewhite;
  margin: 0px 10px 0px 10px;
}
p {
  margin-bottom: 40px;
  color: rgb(23, 49, 40);
}
a:hover {
  color: rgb(83, 83, 83);
}
#wrap {
  height: 300px;
  width: 100vw;
  background-image: url("https://picsum.photos/2000/1000/?blur=10");
  background-color: black;
  opacity: 0.7;
  background-position: center;

  display: flex;
  flex-direction: column;
  align-items: center;
}
h1 {
  font-style: bold;
  color: white;
}
</style>