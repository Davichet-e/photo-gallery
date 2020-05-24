import Vue from "vue";
import Component from "vue-class-component";

@Component
export class ShowErrorMixin extends Vue {
  showError(error: Error, title = "Error", variant = "danger") {
    this.$bvToast.toast(error.message, {
      title: title,
      variant: variant,
      solid: true,
      autoHideDelay: 2000
    });
  }
}
