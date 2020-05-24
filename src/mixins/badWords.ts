import Vue from "vue";
import Component from "vue-class-component";

@Component
export class BadWordsMixin extends Vue {
  textIsValid(text: string) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const json: Array<string> = require("../assets/badwords.json");
    return !text.split(" ").some(word => json.includes(word));
  }
}
