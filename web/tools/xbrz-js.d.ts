declare module "xbrz-js" {
  export const xbrzColorFormat: { argb: number };
  export interface XbrzConfig {
    equalColorTolerance: number;
    centerDirectionBias: number;
    steepDirectionThreshold: number;
    dominantDirectionThreshold: number;
    oobRead: "auto" | "duplicate" | "transparent";
  }
  export function xbrzConfig(opts?: Partial<XbrzConfig>): XbrzConfig;
  export function xbrzScale(scale: number, src: Uint32Array, dst: Uint32Array, width: number, height: number, colorFormat: number, config?: XbrzConfig): void;
}
