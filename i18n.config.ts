export const UI_LANGUAGE_COOKIE = "inventory-ui-language";
export const UI_LANGUAGE_HEADER = "x-inventory-ui-language";
export const UI_LANGUAGES = ["en", "de"] as const;
export type UiLanguage = (typeof UI_LANGUAGES)[number];
