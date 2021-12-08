import { MobileMenu } from "./mobile-menu";

export class FiltersMenu extends MobileMenu {
  constructor(selector, button) {
    super(selector, button)

    if (this.root) {
      this.init()
    }
  }

  init() {
    console.log("CLASS GO GO GO");
  }
}