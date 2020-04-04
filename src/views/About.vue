<template>
  <div class="about">
    <input v-model="name" />
    <h1>This is an about page</h1>
    <ul>
      <li v-for="element in arr" :key="element">{{ element }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import Vue from "vue";

@Component
export default class About extends Vue {
  firstName = "John";
  lastName = "Doe";
  arr = [1, 2, 3, 4];

  // Declared as computed property getter
  get name(): string {
    return this.firstName + " " + this.lastName;
  }

  // Declared as computed property setter
  set name(value: string) {
    const splitted = value.split(" ");
    this.firstName = splitted[0];
    this.lastName = splitted[1] || "";
  }
}
</script>
