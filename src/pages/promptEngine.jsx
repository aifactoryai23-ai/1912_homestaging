// promptEngine.jsx
// Централизованный движок для сборки промптов

// ✅ Базовые правила
export const PROMPT_BASE_RULES = [
  "ultra realistic interior or exterior photo, real estate photography style, high resolution",
  "as an interior designer preparing a home for sale",
  "inpainting on existing photo, seamless photomontage on top of the original",
  "preserve original room geometry, lens perspective and camera angle",
  "keep existing walls, ceiling, floor, windows, doors and main openings in the same place",
  "realistic physically plausible materials and lighting only",
  "neutral modern color palette, cozy and inviting atmosphere",
  "design consistency within one space",
  "keep original framing and aspect ratio of the uploaded photo"
].join(", ");

// 🚫 Негативные правила
export const PROMPT_NEGATIVE_RULES = [
  "no people, no animals, no text, no watermarks, no logos",
  "no extra windows or doors, no new rooms, no new walls",
  "no surreal or fantastical elements",
  "no distorted or melted objects, no bent straight lines"
].join(", ");

// 🧩 Категорийные пресеты (без базовых правил — они добавляются функциями ниже)
export const PROMPTS = {
  renovation: [
    "freshly renovated version of this room",
    "fix imperfections on walls, ceiling and flooring",
    "clean lines, modern finishes, updated but not overdesigned",
    "bright, airy, move-in ready look"
  ].join(", "),

  staging: [
    "virtual home staging of this room for real estate listing",
    "remove clutter and personal items, keep architecture",
    "replace or adjust existing furniture only if needed for better layout",
    "add modern minimalist furniture and textiles in neutral colors",
    "create a cozy, lived-in yet clean feeling",
    "balanced decor, not overcrowded, ready for open house"
  ].join(", "),

  declutter: [
    "declutter and organize this room for sale",
    "remove mess, extra objects, visible cables and personal items",
    "keep only key furniture pieces, make layout feel open and spacious",
    "clean surfaces, simplified decor, fresh and tidy look"
  ].join(", "),

  repaint: [
    "repaint the walls in modern neutral tones",
    "soft beige, warm white or light greige, no bold or dark colors",
    "keep any existing wall panels or textures but refresh their color",
    "keep existing wall positions and room architecture",
    "make the space feel brighter, larger and more expensive"
  ].join(", "),

  lighting: [
    "enhance lighting of this interior",
    "bright natural-looking light, soft shadows, no harsh overexposure",
    "add subtle ambient and accent lighting if needed",
    "make the room feel warm, inviting and well lit"
  ].join(", "),

  floorRefresh: [
    "refresh the look of the flooring",
    "clean, modern material appearance, realistic textures only",
    "remove scratches and stains, keep existing floor layout",
    "make the floor match a modern neutral interior style"
  ].join(", "),

  curb: [
    "enhance curb appeal of the house facade",
    "clean and fresh exterior walls, no damage or dirt",
    "improve landscaping: neat lawn, trimmed bushes, some greenery",
    "clear pathways, welcoming entrance, ready for real estate photos"
  ].join(", "),

  styleSwitch: [
    "switch interior design to modern neutral aesthetic",
    "minimalist, high-end look with clean lines and few accents",
    "update colors, textiles and decor to look current",
    "keep existing layout and architecture of the room"
  ].join(", "),

  furnishEmpty: [
    "furnish this empty room for real estate listing",
    "add modern, cozy furniture set appropriate to room function",
    "use neutral colors, soft textiles and simple decor",
    "make it easy for buyers to imagine living here"
  ].join(", "),

  fixFinish: [
    "improve finishing details and craftsmanship",
    "remove visible defects, gaps, misalignments and rough edges",
    "polished, high-quality interior look, like new construction",
    "keep existing design but make execution perfect"
  ].join(", "),

  kitchen: [
    "modernize this kitchen visually for listing photos",
    "cleaner surfaces, tidy countertops, no clutter",
    "sleek cabinetry, updated hardware look, stainless or built-in appliances",
    "bright, functional, welcoming kitchen atmosphere"
  ].join(", "),

  bathroom: [
    "refresh this bathroom to spa-like look",
    "clean tiles and fixtures, remove stains and clutter",
    "bright and flattering lighting, fresh towels, minimal decor",
    "feeling of cleanliness, calm and modern comfort"
  ].join(", "),

  backyard: [
    "improve backyard and terrace for lifestyle photos",
    "healthy greenery and lawn, tidy planting, no debris",
    "cozy outdoor furniture and simple decor",
    "relaxing outdoor living area, ideal for entertaining"
  ].join(", "),
};

/**
 * 🧱 Сборка builderPrompt (правая колонка) из выборов пользователя
 */
export function buildBuilderPrompt({
  activeTab,
  iRoom = "",
  iStyle = "",
  iColors = "",
  iFurniture = "",
  iLighting = "",
  iAtmosphere = "",
  iCondition = "",
  iCamera = "",
  iDetails = [],
  eHouse = "",
  eFacade = "",
  eEnv = "",
  eSeason = "",
  eAtmosphere = "",
  eCamera = "",
  eCondition = "",
  eDetails = [],
}) {
  const parts = [];

  if (activeTab === "interior") {
    if (iRoom) parts.push(`${iRoom} interior`);
    if (iStyle) parts.push(`${iStyle} style`);
    if (iColors) parts.push(`${iColors.toLowerCase()} palette`);
    if (iFurniture) parts.push(iFurniture);
    if (iLighting) parts.push(`${iLighting.toLowerCase()} lighting`);
    if (iAtmosphere) parts.push(iAtmosphere);
    if (iCondition) parts.push(iCondition);
    if (iCamera) parts.push(iCamera);
    if (iDetails?.length) parts.push(iDetails.join(", "));
  } else {
    if (eHouse) parts.push(`${eHouse} exterior`);
    if (eFacade) parts.push(`${eFacade} facade`);
    if (eEnv) parts.push(`in ${eEnv.toLowerCase()} environment`);
    if (eSeason) parts.push(`${eSeason.toLowerCase()} setting`);
    if (eAtmosphere) parts.push(eAtmosphere);
    if (eCamera) parts.push(eCamera);
    if (eCondition) parts.push(eCondition);
    if (eDetails?.length) parts.push(eDetails.join(", "));
  }

  if (parts.length > 0) {
    parts.push(PROMPT_BASE_RULES);
    parts.push(PROMPT_NEGATIVE_RULES);
  }

  return parts.filter(Boolean).join(", ");
}

/**
 * 🎯 Сборка промпта при клике по пресету
 */
export function buildPresetPrompt({
  presetKey,
  presetMapping,
  activeTab,
  iRoom = "",
  iStyle = "",
  iLighting = "",
  eHouse = "",
  eFacade = "",
  eSeason = "",
}) {
  if (!presetMapping) return "";

  const mappedKey = presetMapping[presetKey];
  const categoryPrompt = mappedKey && PROMPTS[mappedKey];
  if (!categoryPrompt) return "";

  const parts = [];

  if (activeTab === "interior") {
    parts.push(
      iRoom
        ? `photo of a ${iRoom} interior`
        : "photo of a room interior"
    );

    if (iStyle) {
      parts.push(`in ${iStyle} style`);
    }

    if (iLighting) {
      parts.push(`${iLighting.toLowerCase()} lighting`);
    }
  } else {
    parts.push(
      eHouse
        ? `photo of a ${eHouse} exterior`
        : "photo of a house exterior"
    );

    if (eFacade) {
      parts.push(`${eFacade} facade`);
    }

    if (eSeason) {
      parts.push(`${eSeason.toLowerCase()} season setting`);
    }
  }

  parts.push(categoryPrompt);
  parts.push(PROMPT_BASE_RULES);
  parts.push(PROMPT_NEGATIVE_RULES);

  return parts.filter(Boolean).join(", ");
}

/**
 * 🧪 Финальный промпт, который реально отправляется в /api/transform
 */
export function buildFinalPrompt({ customPrompt, builderPrompt }) {
  const a = (customPrompt || "").trim();
  const b = (builderPrompt || "").trim();
  if (a && b) return `${b}, ${a}`;
  if (b) return b;
  return a;
}
