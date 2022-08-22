export type TextureValue = string | null;

type WithoutTexture = "none";

export type Textures =
  | WithoutTexture
  | "door"
  | "ambientOcclusion"
  | "height"
  | "metalness"
  | "normal"
  | "roughness";

export type AlphaTextures = WithoutTexture | "alpha";

export type DefaultMatcapTextures =
  | "matcap1"
  | "matcap2"
  | "matcap3"
  | "matcap4"
  | "matcap5"
  | "matcap6"
  | "matcap7"
  | "matcap8";

export type MatcapTextures =
  | WithoutTexture
  | "matcap1"
  | "matcap2"
  | "matcap3"
  | "matcap4"
  | "matcap5"
  | "matcap6"
  | "matcap7"
  | "matcap8";

export type GradientMapTextures = WithoutTexture | "gradient3" | "gradient5";
