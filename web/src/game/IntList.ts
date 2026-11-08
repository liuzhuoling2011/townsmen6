// Generated from the decompiled MIDlet by research/tools/src/J2TS.java.
import { ArrayIndexOutOfBoundsException, IllegalArgumentException, NoSuchElementException, arraycopy, jstr } from "../runtime/java";

export class IntList {
  data: Int32Array = null;
  size: number = 0;
  private capacityIncrement: number = 0;
  $init0(var1: number, var2: number): this {
    if (var1 < 0) {
      throw new IllegalArgumentException("Illegal Capacity: " + jstr(var1));
    }
    this.data = new Int32Array(var1);
    this.capacityIncrement = var2;
    return this;
  }
  $init1(var1: number): this {
    this.$init0(var1, 0);
    return this;
  }
  $init2(): this {
    this.$init1(10);
    return this;
  }
  private grow(var1: number): void {
    let var2: number = this.data.length;
    let var3: Int32Array = this.data;
    if ((var2 = this.capacityIncrement > 0 ? var2 + this.capacityIncrement : var2 << 1) < var1) {
      var2 = var1;
    }
    this.data = new Int32Array(var2);
    arraycopy(var3, 0, this.data, 0, this.size);
  }
  get(var1: number): number {
    if (var1 >= this.size) {
      throw new ArrayIndexOutOfBoundsException(jstr(var1) + " >= " + jstr(this.size));
    }
    try {
      return this.data[var1];
    } catch ($e0) {
      if ($e0 instanceof ArrayIndexOutOfBoundsException) {
        const var2 = $e0;
        throw new ArrayIndexOutOfBoundsException(jstr(var1) + " < 0");
      } else {
        throw $e0;
      }
    }
  }
  first(): number {
    if (this.size === 0) {
      throw new NoSuchElementException();
    } else {
      return this.data[0];
    }
  }
  set(var1: number, var2: number): void {
    if (var2 >= this.size) {
      throw new ArrayIndexOutOfBoundsException(jstr(var2) + " >= " + jstr(this.size));
    }
    this.data[var2] = var1;
  }
  removeAt(var1: number): void {
    if (var1 >= this.size) {
      throw new ArrayIndexOutOfBoundsException(jstr(var1) + " >= " + jstr(this.size));
    }
    if (var1 < 0) {
      throw new ArrayIndexOutOfBoundsException(var1);
    }
    let var2: number = 0;
    if ((var2 = this.size - var1 - 1) > 0) {
      arraycopy(this.data, var1 + 1, this.data, var1, var2);
    }
    this.size--;
    this.data[this.size] = 0;
  }
  insertAt(var1: number, var2: number): void {
    let var3: number = this.size + 1;
    if (var2 >= var3) {
      throw new ArrayIndexOutOfBoundsException(jstr(var2) + " > " + jstr(this.size));
    }
    if (var3 > this.data.length) {
      this.grow(var3);
    }
    arraycopy(this.data, var2, this.data, var2 + 1, this.size - var2);
    this.data[var2] = var1;
    this.size++;
  }
  add(var1: number): void {
    let var2: number = 0;
    if ((var2 = this.size + 1) > this.data.length) {
      this.grow(var2);
    }
    this.data[this.size++] = var1;
  }
  clear(): void {
    for (let var1: number = 0; var1 < this.size; var1++) {
      this.data[var1] = 0;
    }
    this.size = 0;
  }
  toString(): string {
    return "";
  }
}
