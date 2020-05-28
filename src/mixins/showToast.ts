import Vue from "vue";
import Component from "vue-class-component";

@Component
export class ShowToastMixin extends Vue {
  fetchingError({ message }: Error) {
    return this.showToast(message, "Fetching error");
  }
  showToast(message: string, title = "Error", variant = "danger") {
    this.$bvToast.toast(message, {
      title: title,
      variant: variant,
      solid: true,
      autoHideDelay: 2000
    });
  }
}
