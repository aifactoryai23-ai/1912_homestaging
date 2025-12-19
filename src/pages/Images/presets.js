// src/pages/Images/presets.js
/**
 * Central registry for all image presets (keys + titles + preview images + prompts).
 * Any card you pass into UploadZoneImages should include `prompt`.
 */
export const PRESETS = {
  // Styles (carousel)
  sketch: {
    key: "sketch",
    title: "Sketch",
    src: "/images/images-page/styles/sketch.webp",
    prompt: `Generate an image from the uploaded photo that reimagines the subject as an ultra-detailed 3D graphite pencil sketch on textured white notebook paper. Emphasize crisp paper grain, subtle imperfections, and natural surface fibers. Show the subject actively drawing, with their hand holding a pencil as the sketch comes to life. Include an eraser, sharpener, and scattered pencil shavings resting on the page. Add realistic shadows, smudges, and fine graphite residue around the working area to reinforce the tactile, hand-drawn feel.`,
  },

  holiday: {
    key: "holiday",
    title: "Holiday portrait",
    src: "/images/images-page/styles/holiday.webp",
    prompt: `Transform the uploaded photo into a warm, polished Holiday portrait. Keep the person's REAL face, skin tone, expression, and features exactly the same. Restyle them in soft holiday lighting with gentle golden highlights. Surround them with festive elements like evergreen branches, warm twinkle lights, and a subtle bokeh glow. Add rich reds, forest greens, and cozy textures reminiscent of classic holiday cards. The final image should feel elegant, warm, and timeless — not cartoonish.`,
  },

  dramatic: {
    key: "dramatic",
    title: "Dramatic",
    src: "/images/images-page/styles/dramatic.webp",
    prompt: `Create a dramatic black-and-white headshot of the subject or subjects with a moody, cinematic atmosphere. Use high-contrast lighting that carves out the face with deep shadows and bright highlights. Make the subject appear wet, as if the subject has just been caught in the rain, with irregular water droplets and streaks across the cheeks, forehead, and jawline. Hair should look damp and slightly clumped, with a few strands falling naturally across the face. Keep the background dark and minimal so the illuminated features and droplets stand out. The overall look should feel intense, emotional, and photographic — a raw, expressive portrait with real rain texture and dramatic tonal depth.`,
  },

  plushie: {
    key: "plushie",
    title: "Plushie",
    src: "/images/images-page/styles/plushie.webp",
    prompt: `Transform the subject or image into an adorable plushie-style form with soft textures and rounded proportions. If a person is present, preserve recognizable traits; otherwise, reinterpret the object or animal as a cozy stuffed toy using felt or fleece textures. Give it a cozy felt or fleece texture, simplified shapes, and gentle embroidered details for the eyes, mouth, and features. Use a warm, pastel or neutral color palette with smooth shading and subtle seams, like a handcrafted stuffed toy. Keep the expression friendly and cute, with a slightly oversized head, short limbs, and a cuddly silhouette. The final image should feel like a charming, collectible plush toy — cozy, wholesome, and huggable, while still recognizable as the original subject.`,
  },

  bobblehead: {
    key: "bobblehead",
    title: "Baseball bobblehead",
    src: "/images/images-page/styles/bobblehead.webp",
    prompt: `Transform the subject into a classic baseball bobblehead figurine that clearly reads as a manufactured collectible rather than a person. Dramatically oversize the head so it feels top heavy and playful, connected to the body by a short, stiff neck that suggests a spring instead of anatomy. Preserve the subject's facial identity, but simplify the features and render the face as smooth matte painted vinyl skin with no pores or lifelike texture. Facial planes should feel simplified and graphic, with minimal surface detail. Hair and beard should appear fully sculpted, formed with carved grooves and solid shapes rather than individual strands. Dress the figure in a baseball uniform inspired by the colors of the subject's original clothing or local geography, translated into a cohesive jersey, cap, and accessories. The body should be small, rigid, and toy like. Place the figurine in front of a printed or softly illustrated baseball stadium backdrop so the scene reads as a collectible display, nostalgic and unmistakably a bobblehead. Do not include a name on the figurine.`,
  },

  glam: {
    key: "glam",
    title: "3D glam doll",
    src: "/images/images-page/styles/glam.webp",
    prompt: `Create a hyper-stylized 3D floating head of a bratty, glamorous version of the subject with a bothered, unimpressed expression: half-lidded eyes, arched brows, and a subtle lip curl, delivering classic "mean girl" attitude. Their fair, porcelain-smooth skin has a glossy vinyl finish with strong highlighter on cheekbones and nose, catching soft studio light. Apply holographic, iridescent eyeshadow shifting from purple to teal with crisp specular glints. Style their thick hair in slick, glossy, sculpted waves or a sleek updo, reflecting light like polished acrylic. Add a small metallic chrome nose piercing (stud or hoop) with subtle brushed-metal reflections. The head floats isolated against a plain white neutral background, tilted 15 degrees, like a premium product render. Use bright, diffuse studio lighting with no harsh shadows, emphasizing gloss, plasticity, and subsurface scattering for realistic depth. Mood: bratty, fashionable, coolly detached. Camera angle: close-up portrait, straight-on. Lens: 85mm. Textures: ultra-smooth, high-gloss, cartoon-style plastic skin, lips, and hair.`,
  },

  // Additional styles
  doodle: {
    key: "doodle",
    title: "Doodle",
    src: "/images/images-page/styles/doodle.webp",
    prompt: `Transform the subject into a naive, childlike doodle with rough, uneven black linework and exaggerated, awkward proportions. Draw with a loose, scribbly style — wobbly outlines, unsteady strokes, and simple shapes that look hand-drawn without precision. Hair can be represented with frantic curls or straight jagged lines, and the expression should feel endearingly cute and adorable. Keep the background plain or lightly textured like paper. The overall aesthetic should feel like a spontaneous kid's sketch or amateur doodle — charmingly imperfect, unrefined, and playfully weird, while still recognizable as the original subject. Don't make it look like a crayon drawing, line art style lines only.`,
  },

  artSchool: {
    key: "artSchool",
    title: "Art school",
    src: "/images/images-page/styles/art-school.webp",
    prompt: `Using the provided image as reference, create a soft, understated image with an art-school aesthetic. If people are present, preserve their identity while using gentle natural light, muted colors, and a relaxed, slightly awkward pose and place them in a simple, everyday setting such as a studio, classroom, or quiet street. Otherwise, treat the scene or object as the subject or subjects, using gentle light, muted colors, and intimate framing. The mood should feel intimate, youthful, and casually artistic rather than polished or glamorous.`,
  },

  ornament: {
    key: "ornament",
    title: "Ornament",
    src: "/images/images-page/styles/ornament.webp",
    prompt: `Turn this into an ornament sculpted from glossy molded glass, finished in a high-shine lacquer that catches light from every angle. Its surface feels perfectly smooth and cool, with a weight that suggests fragility and permanence at once. The coating is a lustrous enamel, somewhere between ceramic and a candy shell—reflective enough that small highlights bloom across its curves like soft sparks. Include a visible metallic ornament topper and attachment loop placed directly on the very top center of the person or object, aligned on the vertical axis. The topper should be clearly visible, emerging cleanly from the top and designed for hanging without disrupting the overall form. Make the background color similar to the input image.`,
  },

  fisheye: {
    key: "fisheye",
    title: "Fisheye",
    src: "/images/images-page/styles/fisheye.webp",
    prompt: `A high-contrast, bright futuristic portrait photographed with a Hasselblad medium-format film camera using an extreme fisheye wide-angle lens and harsh on-camera flash. The space is constructed from glossy white floor panels that reflect light, and a gridded white ceiling emitting uniform illumination. The scene feels clinical, sci-fi, and minimalistic.`,
  },

  inkwork: {
    key: "inkwork",
    title: "Inkwork",
    src: "/images/images-page/styles/inkwork.webp",
    prompt: `Create a black-and-white ink illustration of the subject or image using bold brushstrokes, expressive linework, and dynamic movement. If a person is present, keep their form recognizable; otherwise, translate the scene or object using the same high-contrast ink style.`,
  },

  popArt: {
    key: "popArt",
    title: "Pop art",
    src: "/images/images-page/styles/pop-art.webp",
    prompt: `A portrait of the subject in a 1960s comic-book pop-art style, illustrated with bold black contour lines, flat saturated primary colors, and dense halftone dot shading. Facial features should appear expressive, stylized, and slightly exaggerated, as if captured in a dramatic mid-panel moment. Use a clean, graphic composition with strong pop-art energy and vintage print charm. The artwork must be full-bleed — no borders.`,
  },

  sugarCookie: {
    key: "sugarCookie",
    title: "Sugar cookie",
    src: "/images/images-page/styles/sugar-cookie.webp",
    prompt: `Using the provided image as reference, create a tasty, perfectly formed sugar cookie decorated with smooth royal icing based on the subject or image. If the image contains a person, render a simplified icing likeness of their face that clearly resembles them while remaining non-photorealistic; if the image contains an object, animal, or scene, translate its most recognizable features into a friendly royal-icing design using the same logic. The cookie should be stamped in a simple, easy-to-cut silhouette, with the design piped entirely in feasible royal-icing shapes—chunky, smooth lines rather than fine illustration detail, minimal shading, and clean, confident outlines like those used by a skilled cookie artist. Colors should be vibrant, playful, and holiday-friendly without needing to follow real-world color accuracy. Add small, simplified seasonal accents such as holly, snowflakes, sparkles, a scarf, or a beanie rendered as basic piped shapes, avoiding anything overtly religious or denominational. The final result should feel cute, approachable, and clearly edible, emphasizing handcrafted charm, clarity, and a strong resemblance achieved through simplified, piped decoration rather than realism.`,
  },

  // Discover (list)
  holidayCard: {
    key: "holidayCard",
    title: "Create a holiday card",
    src: "/images/images-page/discover/holiday-card.webp",
    prompt: `Transform the reference photo into a warm, elegant holiday card with festive styling, cozy lighting, subtle décor, and natural, photorealistic likeness preserved. Optionally include tasteful holiday text or a short seasonal greeting that complements the image without overpowering the subject.`,
  },

  kpop: {
    key: "kpop",
    title: "What would I look like as a K-Pop star?",
    src: "/images/images-page/discover/kpop.webp",
    prompt: `Using the provided image of the subject as reference, transform them into a K-pop idol–style version of themselves, fully preserving their natural facial features, skin tone, ethnicity, and identity. Style the subject with a polished, high-fashion idol aesthetic inspired by contemporary K-pop concept photoshoots, featuring editorial studio lighting with soft glow and clean highlights, a flawless but natural dewy skin finish, and subtle enhancement of the eyes, lips, and hair for a camera-ready look. The subject poses confidently with expressive yet controlled body language, styled in fashion-forward outfits influenced by modern K-pop trends such as elevated streetwear, Y2K accents, chic tailoring, glam punk, or soft ethereal looks, adapted to complement their original clothing style. The atmosphere resembles a professional idol photoshoot, using bold colored backdrops or moody dramatic environments, studio or concert-style lighting, cinematic shadows, and refined color grading, with optional tasteful details like layered jewelry, belts, or statement accessories kept cohesive and restrained. The final image should feel like an authentic K-pop concept photo—crisp, stylish, and aspirational—projecting polished charisma and star presence while clearly remaining the same person.`,
  },

  pearl: {
    key: "pearl",
    title: "Me as The Girl with a Pearl",
    src: "/images/images-page/discover/pearl.webp",
    prompt: `Transform the subject as The Girl with a Pearl Earring portrait.`,
  },

  album: {
    key: "album",
    title: "Create an album cover",
    src: "/images/images-page/discover/album.webp",
    prompt: `Create an album cover displayed as a physical vinyl record sleeve. On the cover, show the subject with their face and hair full covered in shimmering gold glitter, glowing with a metallic sparkle effect. According to what you know about the user, add a single word as a title written in red handwritten lettering across the cover. The vinyl record is partially pulled out from one side, featuring a smooth multicolor gradient across the disc. Everything rests on a marble green table, visible only slightly at the bottom of the frame. The style should be bold, clean, and photorealistic.`,
  },

  styleMe: {
    key: "styleMe",
    title: "Style me",
    src: "/images/images-page/discover/style-me.webp",
    prompt: `Swap the person’s outfit for one that suits them aesthetically. Choose clothing that complements their face, hair, proportions, and overall vibe. Keep the pose, expression, lighting, and identity unchanged. Ensure the new outfit feels natural, flattering, and well-styled.`,
  },

  removePeopleBg: {
    key: "removePeopleBg",
    title: "Remove people in the background",
    src: "/images/images-page/discover/remove-people.webp",
    prompt: `Remove any people in the background while keeping the main subject unchanged. Fill in the background naturally so it looks like the people were never there.`,
  },

  productPhoto: {
    key: "productPhoto",
    title: "Create a professional product photo",
    src: "/images/images-page/discover/pro-product.webp",
    prompt: `Using the provided image of the subject as reference, create a clean, realistic studio portrait inspired by the visual conventions of new-graduate job-hunting photos. If a person is present, preserve the subject's facial features, proportions, and identity exactly as shown, without beautifying or altering their face. If not, apply the same restrained studio lighting, neutral background, and formal framing to the object or scene. Present the subject in a centered, front-facing composition wearing conservative, entry-level business attire, with neat grooming and a neutral, polite expression. Use flat, even studio lighting that minimizes shadows and emphasizes clarity, paired with a plain light blue, pale gray, or white background. The framing should be tightly cropped, symmetrical, and formal, with a restrained, slightly earnest mood that reflects professionalism, sincerity, and readiness for a job.`,
  },

  keychain: {
    key: "keychain",
    title: "Turn into a keychain",
    src: "/images/images-page/discover/keychain.webp",
    prompt: `Transform the subject or image into a small 3D figurine keychain. If a person is present, preserve their likeness in a small collectible figure with a rounded, slightly stylized toy-like features. Otherwise, convert the object or animal into a collectible keychain figure with realistic materials and scale. Add a glossy resin finish, subtle painted details, and a metal loop on top connected to a keyring. Use soft natural light, shallow depth of field, and keep everything photorealistic.`,
  },

  matchingOutfit: {
    key: "matchingOutfit",
    title: "Give us a matching outfit",
    src: "/images/images-page/discover/matching-outfit.webp",
    prompt: `Transform people into the image as friends standing close together in a softly coordinated, candid moment. They are posed side by side with relaxed, natural expressions, preserving their original facial features and hairstyles. Dress them in subtly matching casual outfits — similar colors, silhouettes, or textures rather than exact duplicates — such as neutral tops and light outerwear. If a pet or animal is included, dress the animal in a coordinated version of the same outfit style so it visually matches the group without overpowering the scene. Set the scene outdoors in gentle, diffused daylight with a calm, everyday atmosphere. Add a soft film look inspired by instant photography, with light grain, muted colors, and a faintly faded finish.`,
  },

  room: {
    key: "room",
    title: "Redecorate my room",
    src: "/images/images-page/discover/room.webp",
    prompt: `Using the photo of this room, add new furniture in a cohesive, realistic way. Keep the existing layout, architecture, and lighting intact. Introduce thoughtfully chosen pieces that matches the room's style and scale—for example: a sofa, armchair, side table, art, bookshelf, or console. Ensure correct perspective, natural shadows, and seamless integration. Preserve all original objects unless the request specifies removal. Show the updated room as a single, polished interior design visualization.`,
  },

  restoreOldPhoto: {
    key: "restoreOldPhoto",
    title: "Restore an old photo",
    src: "/images/images-page/discover/restore.webp",
    prompt: `Restore and enhance this photo as if it were captured today with a high-end modern camera. Improve overall sharpness and fine detail without changing the subject's identity or features. Enhance colors to look natural and vibrant (not oversaturated), correct white balance, and gently increase contrast and dynamic range. Reduce noise, fix blur or softness, and refine edges for a crisp, realistic look. Preserve authentic skin tones and textures, avoiding any artificial smoothing or stylization. The final image should feel clean, high-resolution, and true to the original scene, just clearer and more lifelike.`,
  },
};
