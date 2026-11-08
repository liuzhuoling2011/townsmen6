// Loads the original JAR's resources and manifest into the runtime.

import { unzipSync } from "fflate";
import { Sys } from "./io";
import { Device } from "./midp";

export function loadJar(jar: Uint8Array): void {
  const files = unzipSync(jar);
  for (const [name, data] of Object.entries(files)) {
    if (name.endsWith("/") || name.endsWith(".class")) continue;
    Sys.resources.set(name, new Int8Array(data.buffer, data.byteOffset, data.length));
  }
  const manifest = files["META-INF/MANIFEST.MF"];
  if (manifest) {
    const text = new TextDecoder().decode(manifest);
    let last = "";
    for (const raw of text.split(/\r?\n/)) {
      if (raw.startsWith(" ") && last) {
        Device.properties.set(last, Device.properties.get(last) + raw.slice(1));
        continue;
      }
      const i = raw.indexOf(":");
      if (i > 0) {
        last = raw.slice(0, i).trim();
        Device.properties.set(last, raw.slice(i + 1).trim());
      }
    }
  }
}
