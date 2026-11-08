   public final boolean method_493(int var1, boolean var2, boolean var3) {
      int[] row = this.field_453[this.field_449];
      boolean handled = false;
      switch (row[0]) {
         case 206:
            if (var1 == 3 || var1 == 4) {
               int value;
               if (var1 == 3) {
                  value = class_22.method_562(row[6]) - row[8];
                  if (value < row[3]) {
                     value = row[3];
                  }
               } else {
                  value = class_22.method_562(row[6]) + row[8];
                  if (value > row[4]) {
                     value = row[4];
                  }
               }

               row[5] = value;
               int partner = row[6] == 4 ? 5 : 4;

               for (int i = 0; i < this.field_452; i++) {
                  int[] other = this.field_453[i];
                  if (other[0] == 206 && other[6] == partner) {
                     class_22.method_563(other[6], other[3]);
                     other[5] = other[3];
                     break;
                  }
               }

               class_22.method_563(row[6], value);
               if (row[6] == 4) {
                  if (class_12.field_238 != null) {
                     class_15.method_457(row[6], class_15.method_352(2, 7));
                  } else {
                     class_15.method_457(row[6], 0);
                  }
               } else {
                  class_15.method_450();
                  class_15.method_457(row[6], 30);
               }

               handled = true;
            }
            break;
         case 207:
            if (var1 == 3) {
               if (--row[5] < 0) {
                  row[5] = 0;
               }

               handled = true;
            } else if (var1 == 4) {
               if (++row[5] > row[4]) {
                  row[5] = row[4];
               }

               handled = true;
            }
            break;
      }

      if (handled) {
         return true;
      }

      boolean result = false;
      switch (var1) {
         case 2:
            field_465 = false;
            if (this.field_452 != 0) {
               if (method_470(this.field_453[this.field_449][0])) {
                  if (!var3) {
                     int target = this.field_449 - 1;
                     if (target >= 0) {
                        int found = target;

                        for (int k = target; k > 0; k--) {
                           if (this.method_488(k)) {
                              found = k;
                              break;
                           }
                        }

                        target = found;
                     }

                     if (target < 0 || target < this.method_489()) {
                        target = this.field_452 - 1;
                     }

                     this.method_490(target, var1);
                  }
               } else {
                  this.field_450 -= 16;
                  if (this.field_434 > this.field_424) {
                     this.field_450 = this.field_434 / 2;
                     return true;
                  }

                  if (this.field_450 < this.field_454[this.field_449] || this.field_450 < this.field_434 / 2) {
                     if (this.field_449 > 0 && this.field_449 > this.method_489()) {
                        this.method_490(this.field_449 - 1, var1);
                     } else {
                        this.field_450 = this.field_434 / 2;
                     }
                  }
               }
            }
            break;
         case 5:
            field_465 = false;
            if (this.field_452 != 0) {
               if (method_470(this.field_453[this.field_449][0])) {
                  if (!var3) {
                     int target = this.field_449 + 1;
                     if (target < this.field_452) {
                        int found = target;

                        for (int k = target; k < this.field_452; k++) {
                           if (this.method_488(k)) {
                              found = k;
                              break;
                           }
                        }

                        target = found;
                     }

                     if (target >= this.field_452) {
                        target = 0;
                     }

                     this.method_490(target, var1);
                     return true;
                  }
               } else {
                  this.field_450 += 16;
                  if (this.field_434 > this.field_424) {
                     this.field_450 = this.field_434 / 2;
                     return true;
                  }

                  if (this.field_450 >= this.field_454[this.field_449 + 1] || this.field_450 > this.field_424 - this.field_434 / 2) {
                     if (this.field_449 < this.field_452 - 1) {
                        this.method_490(this.field_449 + 1, var1);
                     } else {
                        this.field_450 = this.field_424 - this.field_434 / 2;
                     }
                  }
               }
            }
            break;
         case 6:
            if (this.field_444 != -1 && !var3) {
               class_22.method_577(this.field_444, this.field_445);
               result = true;
            } else if (this.field_452 != 0 && !var3) {
               result = this.method_491(this.field_449);
            }
            break;
         case 7:
            if (this.field_439 == 4102) {
               if (!var3) {
                  this.method_491(this.field_449);
               }
            } else if (this.field_439 != -1) {
               class_22.method_577(this.field_439, this.field_440);
            }

            result = true;
            break;
         case 8:
            class_22.method_577(this.field_442, this.field_443);
            result = true;
            break;
      }

      return result;
   }
