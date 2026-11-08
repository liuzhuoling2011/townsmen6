// Generated from the decompiled MIDlet by research/tools/src/J2TS.java.
import { classForName } from "../runtime/java";
import { Engine } from "./Engine";
import { Menu } from "./Menu";
import { UpsellOffer } from "./UpsellOffer";

export class Upsell {
  private static offer: UpsellOffer = null;
  private static launched: boolean = false;
  static isActive(): boolean {
    return Upsell.offer !== null ? Upsell.launched : false;
  }
  static openUpsellUrl(var0: number): void {
    Upsell.launched = true;
    if (Upsell.offer !== null) {
      let var1: number = var0;
      let var2: UpsellOffer = Upsell.offer;
      switch (var1) {
        case 1:
          if (var2.url !== null && var2.url.length !== 0) {
            Engine.openUrl(var2.url);
          }
      }
    }
  }
  static init(): void {
    try {
      let var0: UpsellOffer = Upsell.offer = classForName("UpsellOffer").newInstance() as UpsellOffer;
      let var1: boolean = Engine.getAppPropertyBool("Glu-Upsell-Enabled");
      var0.url = Engine.getAppProperty("Glu-Upsell-URL");
      if (var1 && var0.url !== null && !(var0.url.trim() === "") || Engine.demoEnabled) {
        var0.status = 0;
        var0.buttonTextId = 215;
        if (Engine.demoEnabled) {
          var0.buttonTextId = 43;
          var0.url = Engine.demoUrl;
        }
      }
    } catch (var2) {
    }
  }
  static addMenuItem(var0: Menu): void {
    if (Upsell.offer !== null) {
      let var1: Menu = var0;
      let var3: UpsellOffer = Upsell.offer;
      if (var1 === null || var3.status === (-1)) {
        return;
      }
      switch (var1.menuId as number) {
        case 39:
          let var2: number = var1.itemCount;
          if (var1.itemCount > 0) {
            var2 = 1;
          }
          if (Engine.demoEnabled) {
            var2 = 0;
          }
          var1.insertItem(Int32Array.of(203, 0, 0, var3.buttonTextId, 24577, 0), var2);
      }
    }
  }
  static handleAction(var0: number): boolean {
    if (Upsell.offer === null) {
      return false;
    }
    let var1: boolean = false;
    if (Upsell.offer !== null && var0 === 8 && Upsell.launched) {
      Upsell.launched = false;
      var1 = true;
    }
    return var1;
  }
}
