import type {
  SemanticEffectType,
  WorldReactionState,
  HiddenClue
} from '../types/game.ts';

export interface ReactionMeta {
  type: SemanticEffectType;
  name: string;
  emoji: string;
  banner: string;
  badge: string;
  sound: string;
  color: string;
}

// 52+ Curated Living World Reactions Catalog
export const REACTIONS_CATALOG: Record<SemanticEffectType, ReactionMeta> = {
  // --- 1. Elemental Forces ---
  fire: {
    type: 'fire',
    name: 'Blazing Braziers',
    emoji: '🔥',
    banner: '🔥 ELEMENTAL REACTION: TORCHES IGNITED — Twin flaming braziers flank the arena with rising embers!',
    badge: '🔥 FIRE',
    sound: 'fire',
    color: '#f97316'
  },
  rain: {
    type: 'rain',
    name: 'Celestial Rainstorm',
    emoji: '🌧️',
    banner: '🌧️ ELEMENTAL REACTION: CELESTIAL DELUGE — Rain cascades through the cosmic sky!',
    badge: '🌧️ RAIN',
    sound: 'rain',
    color: '#38bdf8'
  },
  snow: {
    type: 'snow',
    name: 'Frost Blizzard',
    emoji: '❄️',
    banner: '❄️ ELEMENTAL REACTION: FROST BLIZZARD — Crystalline snowflakes drift across the world!',
    badge: '❄️ SNOW',
    sound: 'snow',
    color: '#93c5fd'
  },
  lightning: {
    type: 'lightning',
    name: 'Plasma Arc Lightning',
    emoji: '⚡',
    banner: '⚡ ELEMENTAL REACTION: TEMPEST ARCS — Violet lightning forks crackle through the void!',
    badge: '⚡ LIGHTNING',
    sound: 'lightning',
    color: '#a855f7'
  },
  wind: {
    type: 'wind',
    name: 'Zephyr Vortex',
    emoji: '💨',
    banner: '💨 ELEMENTAL REACTION: ZEPHYR GALE — Swirling wind currents wrap around the diorama!',
    badge: '💨 WIND',
    sound: 'wind',
    color: '#67e8f9'
  },
  quake: {
    type: 'quake',
    name: 'Seismic Tremor',
    emoji: '🌋',
    banner: '🌋 ELEMENTAL REACTION: SEISMIC SHIFT — Ancient monoliths shudder and elevate!',
    badge: '🌋 QUAKE',
    sound: 'quake',
    color: '#d97706'
  },
  volcano: {
    type: 'volcano',
    name: 'Magma Eruption',
    emoji: '💥',
    banner: '💥 ELEMENTAL REACTION: MAGMA ERUPTION — Molten core fissures erupt with lava sparks!',
    badge: '💥 MAGMA',
    sound: 'fire',
    color: '#ef4444'
  },
  toxic: {
    type: 'toxic',
    name: 'Miasma Vapor',
    emoji: '🧪',
    banner: '🧪 ELEMENTAL REACTION: TOXIC MIASMA — Luminescent lime-green fumes swirl through the air!',
    badge: '🧪 MIASMA',
    sound: 'water',
    color: '#84cc16'
  },
  sand: {
    type: 'sand',
    name: 'Desert Sirocco',
    emoji: '🏜️',
    banner: '🏜️ ELEMENTAL REACTION: DESERT SIROCCO — Golden sand grains whip across the dunes!',
    badge: '🏜️ SAND',
    sound: 'wind',
    color: '#eab308'
  },
  steam: {
    type: 'steam',
    name: 'Thermal Geysers',
    emoji: '♨️',
    banner: '♨️ ELEMENTAL REACTION: THERMAL GEYSER — Scalding vapor plumes billow toward the stars!',
    badge: '♨️ STEAM',
    sound: 'water',
    color: '#cbd5e1'
  },

  // --- 2. Celestial & Cosmic Phenomena ---
  moon: {
    type: 'moon',
    name: 'Lunar Crescent',
    emoji: '🌙',
    banner: '🌙 COSMIC REACTION: LUNAR ASCENT — Radiant crescent moon rises with celestial rings!',
    badge: '🌙 MOON',
    sound: 'chime',
    color: '#93c5fd'
  },
  sun: {
    type: 'sun',
    name: 'Solar Corona',
    emoji: '☀️',
    banner: '☀️ COSMIC REACTION: SOLAR CORONA — Blazing golden radiance blazes in rotating god-rays!',
    badge: '☀️ SOLAR',
    sound: 'chime',
    color: '#facc15'
  },
  aurora: {
    type: 'aurora',
    name: 'Aurora Borealis',
    emoji: '🌌',
    banner: '🌌 COSMIC REACTION: AURORA BOREALIS — Shimmering emerald & violet curtains dance across the sky!',
    badge: '🌌 AURORA',
    sound: 'chime',
    color: '#34d399'
  },
  meteor: {
    type: 'meteor',
    name: 'Meteor Shower',
    emoji: '🌠',
    banner: '🌠 COSMIC REACTION: METEOR SHOWER — Blazing shooting stars streak across the cosmic horizon!',
    badge: '🌠 METEORS',
    sound: 'chime',
    color: '#f43f5e'
  },
  singularity: {
    type: 'singularity',
    name: 'Void Singularity',
    emoji: '🕳️',
    banner: '🕳️ COSMIC REACTION: SINGULARITY — A glowing gravitational black hole warps space-time!',
    badge: '🕳️ VOID',
    sound: 'singularity',
    color: '#6366f1'
  },
  rings: {
    type: 'rings',
    name: 'Planetary Rings',
    emoji: '🪐',
    banner: '🪐 COSMIC REACTION: PLANETARY RINGS — Vast iridescent particle rings encircle the world!',
    badge: '🪐 RINGS',
    sound: 'chime',
    color: '#f59e0b'
  },
  supernova: {
    type: 'supernova',
    name: 'Stellar Supernova',
    emoji: '✨',
    banner: '✨ COSMIC REACTION: SUPERNOVA — A cosmic starburst shockwave radiates into the void!',
    badge: '✨ SUPERNOVA',
    sound: 'singularity',
    color: '#fb7185'
  },
  eclipse: {
    type: 'eclipse',
    name: 'Solar Eclipse',
    emoji: '🌑',
    banner: '🌑 COSMIC REACTION: ECLIPSE CORONA — Obsidian darkness drapes the world with silver coronal halo!',
    badge: '🌑 ECLIPSE',
    sound: 'chime',
    color: '#e2e8f0'
  },
  nebula: {
    type: 'nebula',
    name: 'Interstellar Nebula',
    emoji: '🟣',
    banner: '🟣 COSMIC REACTION: NEBULA VEIL — Pastel magenta cosmic dust clouds envelop the arena!',
    badge: '🟣 NEBULA',
    sound: 'chime',
    color: '#c084fc'
  },
  pulsar: {
    type: 'pulsar',
    name: 'Relativistic Pulsar',
    emoji: '🚨',
    banner: '🚨 COSMIC REACTION: PULSAR BEACON — High-energy radiation beams sweep like a cosmic beacon!',
    badge: '🚨 PULSAR',
    sound: 'laser',
    color: '#38bdf8'
  },

  // --- 3. Flora, Fauna & Nature ---
  tree: {
    type: 'tree',
    name: 'Verdant Bonsai',
    emoji: '🌿',
    banner: '🌿 NATURE REACTION: FLORA SPROUTED — Verdant crystal bonsai trees burst into bloom!',
    badge: '🌿 FLORA',
    sound: 'tree',
    color: '#10b981'
  },
  sakura: {
    type: 'sakura',
    name: 'Sakura Petals',
    emoji: '🌸',
    banner: '🌸 NATURE REACTION: SAKURA BLOSSOMS — Delicate pink petals flutter and dance on the wind!',
    badge: '🌸 SAKURA',
    sound: 'tree',
    color: '#f472b6'
  },
  butterflies: {
    type: 'butterflies',
    name: 'Celestial Butterflies',
    emoji: '🦋',
    banner: '🦋 NATURE REACTION: CELESTIAL BUTTERFLIES — Luminous spirit butterflies flutter around your letters!',
    badge: '🦋 BUTTERFLIES',
    sound: 'love',
    color: '#60a5fa'
  },
  spores: {
    type: 'spores',
    name: 'Mycelium Spores',
    emoji: '🍄',
    banner: '🍄 NATURE REACTION: BIOLUMINESCENT SPORES — Glowing mushroom caps sprout with rising motes!',
    badge: '🍄 SPORES',
    sound: 'tree',
    color: '#4ade80'
  },
  wave: {
    type: 'wave',
    name: 'Tidal Swell',
    emoji: '🌊',
    banner: '🌊 NATURE REACTION: TIDAL SWELL — Luminous ocean rings expand and surge across the floor!',
    badge: '🌊 TIDES',
    sound: 'water',
    color: '#0ea5e9'
  },
  coral: {
    type: 'coral',
    name: 'Abyssal Coral',
    emoji: '🪸',
    banner: '🪸 NATURE REACTION: CORAL REEF — Iridescent branching corals rise with floating bubbles!',
    badge: '🪸 CORAL',
    sound: 'water',
    color: '#fb7185'
  },
  crystal: {
    type: 'crystal',
    name: 'Prismatic Crystals',
    emoji: '💎',
    banner: '💎 NATURE REACTION: CRYSTAL SPIRES — Towering amethyst and quartz clusters spear through rock!',
    badge: '💎 CRYSTALS',
    sound: 'chime',
    color: '#c084fc'
  },
  vines: {
    type: 'vines',
    name: 'Twisting Vines',
    emoji: '🌱',
    banner: '🌱 NATURE REACTION: CANOPY LIANAS — Coiling jungle vines weave across the stone arches!',
    badge: '🌱 VINES',
    sound: 'tree',
    color: '#22c55e'
  },
  phoenix: {
    type: 'phoenix',
    name: 'Phoenix Soar',
    emoji: '🦅',
    banner: '🦅 MYTHIC REACTION: PHOENIX ASCENT — A radiant bird of golden solar fire soars across the sky!',
    badge: '🦅 PHOENIX',
    sound: 'fire',
    color: '#f97316'
  },
  fireflies: {
    type: 'fireflies',
    name: 'Golden Fireflies',
    emoji: '💡',
    banner: '💡 NATURE REACTION: FIREFLY SWARM — Countless warm golden fireflies drift between the tiles!',
    badge: '💡 FIREFLIES',
    sound: 'love',
    color: '#fde047'
  },

  // --- 4. Magic, Arcana & Mythos ---
  runes: {
    type: 'runes',
    name: 'Runic Glyphs',
    emoji: '🔯',
    banner: '🔯 ARCANE REACTION: RUNIC CIRCLE — Glowing celestial glyphs spin in concentric rings on stone!',
    badge: '🔯 RUNES',
    sound: 'chime',
    color: '#38bdf8'
  },
  ghost: {
    type: 'ghost',
    name: 'Spectral Wisps',
    emoji: '👻',
    banner: '👻 ARCANE REACTION: SPECTRAL APPARITION — Translucent spirit wisps weave through monoliths!',
    badge: '👻 SPIRITS',
    sound: 'wind',
    color: '#94a3b8'
  },
  gold: {
    type: 'gold',
    name: 'Midas Alchemy',
    emoji: '👑',
    banner: '👑 ARCANE REACTION: MIDAS ALCHEMY — World transmutes into pure gold with glittering dust!',
    badge: '👑 GOLD',
    sound: 'chime',
    color: '#eab308'
  },
  portal: {
    type: 'portal',
    name: 'Dimensional Rift',
    emoji: '🌀',
    banner: '🌀 ARCANE REACTION: DIMENSIONAL GATEWAY — A swirling wormhole rift tears open the horizon!',
    badge: '🌀 PORTAL',
    sound: 'singularity',
    color: '#a855f7'
  },
  time: {
    type: 'time',
    name: 'Chronos Gearwork',
    emoji: '⏳',
    banner: '⏳ ARCANE REACTION: TIME DILATION — Gigantic glowing clockwork gears turn in the background!',
    badge: '⏳ CHRONOS',
    sound: 'chime',
    color: '#f59e0b'
  },
  rainbow: {
    type: 'rainbow',
    name: 'Prismatic Rainbow',
    emoji: '🌈',
    banner: '🌈 ARCANE REACTION: SPECTRAL RAINBOW — A seven-color optical light arc arches over the world!',
    badge: '🌈 RAINBOW',
    sound: 'chime',
    color: '#ec4899'
  },
  holy: {
    type: 'holy',
    name: 'Divine Radiance',
    emoji: '🕊️',
    banner: '🕊️ ARCANE REACTION: DIVINE SANCTUARY — Beams of pure white celestial light illuminate the tiles!',
    badge: '🕊️ DIVINE',
    sound: 'chime',
    color: '#ffffff'
  },
  blood: {
    type: 'blood',
    name: 'Crimson Eclipse',
    emoji: '🩸',
    banner: '🩸 ARCANE REACTION: BLOOD MOON — The sky darkens into deep crimson scarlet with dark smoke!',
    badge: '🩸 BLOOD',
    sound: 'fire',
    color: '#dc2626'
  },
  mirror: {
    type: 'mirror',
    name: 'Mirror Citadel',
    emoji: '🪞',
    banner: '🪞 ARCANE REACTION: MIRROR REALM — An inverted reflection citadel floats suspended above!',
    badge: '🪞 MIRROR',
    sound: 'chime',
    color: '#67e8f9'
  },
  eye: {
    type: 'eye',
    name: 'Eye of the Aeons',
    emoji: '👁️',
    banner: '👁️ ARCANE REACTION: EYE OF THE AEONS — A colossal mystical guardian eye watches from the stars!',
    badge: '👁️ EYE',
    sound: 'singularity',
    color: '#818cf8'
  },

  // --- 5. Technology & Sci-Fi ---
  matrix: {
    type: 'matrix',
    name: 'Cyber Matrix',
    emoji: '📟',
    banner: '📟 CYBER REACTION: MATRIX RAIN — Cascades of green digital glyphs stream across space!',
    badge: '📟 MATRIX',
    sound: 'glitch',
    color: '#22c55e'
  },
  glitch: {
    type: 'glitch',
    name: 'Reality Glitch',
    emoji: '👾',
    banner: '👾 CYBER REACTION: REALITY GLITCH — Chromatic aberration and digital tearing ripple through void!',
    badge: '👾 GLITCH',
    sound: 'glitch',
    color: '#ec4899'
  },
  laser: {
    type: 'laser',
    name: 'Laser Beam Grid',
    emoji: '🔦',
    banner: '🔦 CYBER REACTION: LASER ARRAY — Intersecting crimson & cyan laser arrays crisscross the sky!',
    badge: '🔦 LASERS',
    sound: 'laser',
    color: '#ef4444'
  },
  shield: {
    type: 'shield',
    name: 'Hex Forcefield',
    emoji: '🛡️',
    banner: '🛡️ CYBER REACTION: AEGIS FORCEFIELD — A translucent hexagonal energy dome shields the world!',
    badge: '🛡️ SHIELD',
    sound: 'laser',
    color: '#38bdf8'
  },
  synthwave: {
    type: 'synthwave',
    name: 'Synthwave Horizon',
    emoji: '🌆',
    banner: '🌆 CYBER REACTION: SYNTHWAVE GRID — Retro neon magenta sun and cyan wireframe horizons ignite!',
    badge: '🌆 SYNTHWAVE',
    sound: 'laser',
    color: '#f43f5e'
  },
  radar: {
    type: 'radar',
    name: 'Sonar Radar Ping',
    emoji: '📡',
    banner: '📡 CYBER REACTION: RADAR SCAN — A sweeping circular sensor pulse scans the cosmic surroundings!',
    badge: '📡 RADAR',
    sound: 'laser',
    color: '#06b6d4'
  },

  // --- 6. Abstract, Concepts & Wonder ---
  love: {
    type: 'love',
    name: 'Heart Affinity',
    emoji: '💖',
    banner: '💖 WONDER REACTION: HEART HARMONY — Floating magenta heart motes shower the realm in warmth!',
    badge: '💖 LOVE',
    sound: 'love',
    color: '#ec4899'
  },
  music: {
    type: 'music',
    name: 'Harmonic Cadence',
    emoji: '🎵',
    banner: '🎵 WONDER REACTION: HARMONIC RESONANCE — Musical staves and glowing clefs float through the air!',
    badge: '🎵 MUSIC',
    sound: 'chime',
    color: '#a855f7'
  },
  chaos: {
    type: 'chaos',
    name: 'Cosmic Chaos',
    emoji: '🌪️',
    banner: '🌪️ WONDER REACTION: CHAOS DISTORTION — Floating debris orbits in unpredictable turbulent orbits!',
    badge: '🌪️ CHAOS',
    sound: 'glitch',
    color: '#f97316'
  },
  peace: {
    type: 'peace',
    name: 'Zen Sanctuary',
    emoji: '🪷',
    banner: '🪷 WONDER REACTION: ZEN SERENITY — Turquoise tranquility settles with floating lotus petals!',
    badge: '🪷 ZEN',
    sound: 'tree',
    color: '#14b8a6'
  },
  candy: {
    type: 'candy',
    name: 'Sugar Realm',
    emoji: '🍭',
    banner: '🍭 WONDER REACTION: SUGAR CONFECTION — Pastel confetti sprinkles and sugar crystals rain down!',
    badge: '🍭 CANDY',
    sound: 'love',
    color: '#f472b6'
  },
  zerog: {
    type: 'zerog',
    name: 'Zero Gravity',
    emoji: '🎈',
    banner: '🎈 WONDER REACTION: ZERO GRAVITY — Monoliths and stones detach to float in weightless suspension!',
    badge: '🎈 ZERO-G',
    sound: 'singularity',
    color: '#818cf8'
  },

  // Backward-compatibility aliases
  night: {
    type: 'moon',
    name: 'Nightfall',
    emoji: '🌙',
    banner: '🌙 ELEMENTAL REACTION: NIGHTFALL — Deep twilight descends and moonlight awakens!',
    badge: '🌙 NIGHT',
    sound: 'chime',
    color: '#93c5fd'
  },
  light: {
    type: 'sun',
    name: 'Solar Flare',
    emoji: '☀️',
    banner: '☀️ ELEMENTAL REACTION: SOLAR FLARE — Brilliant daylight rays pierce through the void!',
    badge: '☀️ LIGHT',
    sound: 'chime',
    color: '#facc15'
  },
  fly: {
    type: 'zerog',
    name: 'Sky Glide',
    emoji: '🕊️',
    banner: '🕊️ ELEMENTAL REACTION: SKY GLIDE — Monoliths float and glide across the wind!',
    badge: '🕊️ FLIGHT',
    sound: 'singularity',
    color: '#60a5fa'
  }
};

// 52+ Comprehensive Semantic Word Keyword Mappings
export const SEMANTIC_DICTIONARY: Record<SemanticEffectType, string[]> = {
  // 1. Fire
  fire: [
    'FIRE', 'FLAME', 'BLAZE', 'EMBER', 'TORCH', 'BURNS', 'HEAT',
    'FLARE', 'ASHES', 'SMOKE', 'SPARK', 'WARM', 'INFER', 'MATCH',
    'MAGMA', 'ROAST', 'BAKES', 'IGNIT', 'PYROS', 'CHARR'
  ],
  // 2. Rain
  rain: [
    'RAIN', 'STORM', 'WATER', 'RIVER', 'OCEAN', 'FLOOD', 'CLOUD',
    'MISTS', 'DROPS', 'POURS', 'SHOWER', 'STREAM', 'VAPOR', 'DRIZZ',
    'WETLY', 'LAKES', 'DRIPS', 'SWAMP', 'DAMP'
  ],
  // 3. Snow
  snow: [
    'SNOW', 'FROST', 'CHILL', 'ICING', 'POLAR', 'SLEET', 'GLAZE',
    'FRIGI', 'COLDS', 'HAILS', 'ARCTI', 'WINT', 'BLIZZ', 'SHIVE', 'FLAKE'
  ],
  // 4. Lightning
  lightning: [
    'BOLTS', 'SHOCK', 'ELECT', 'ZAPPS', 'FLASH', 'THUND', 'VOLTS',
    'STRIK', 'SPARK', 'CHARG', 'IONIC', 'TESLA', 'JOLTS'
  ],
  // 5. Wind
  wind: [
    'WINDS', 'WINDY', 'GALES', 'BREEZ', 'GUSTS', 'CYCLO', 'DRAFT',
    'BLOWS', 'SWIRL', 'ZEPHY', 'AIRYS', 'CHILL', 'TYPHO'
  ],
  // 6. Quake
  quake: [
    'QUAKE', 'EARTH', 'SHAKE', 'ROCKS', 'STONE', 'FAULT', 'TECTO',
    'TREMO', 'SPLIT', 'CRACK', 'CHASM', 'SLATE', 'BOULD'
  ],
  // 7. Volcano
  volcano: [
    'VOLCA', 'LAVAS', 'CRATE', 'ERUPT', 'MOLTE', 'FORGE', 'SMELT',
    'CALDE', 'BASAL', 'OBSID', 'SCORI', 'CENIS'
  ],
  // 8. Toxic
  toxic: [
    'TOXIC', 'VENOM', 'ACIDS', 'POISO', 'FUMES', 'VIRUS', 'SLIME',
    'CORRO', 'BILE', 'HAZAR', 'RUSTY', 'SEWER'
  ],
  // 9. Sand
  sand: [
    'SANDS', 'SANDY', 'DUNES', 'DUSTY', 'DUSTS', 'DESER', 'SAHAR',
    'GRAIN', 'OASIS', 'ARID', 'BEACH', 'SHORE'
  ],
  // 10. Steam
  steam: [
    'STEAM', 'GEYSE', 'BOILS', 'VAPOR', 'SAUNA', 'SCALD', 'HEATS',
    'THERM', 'MISTS', 'VAPES', 'SMOKE'
  ],

  // 11. Moon
  moon: [
    'MOONS', 'LUNAR', 'ORBIT', 'CRATE', 'PHASE', 'ASTRA', 'TIDES',
    'SPACE', 'COMET', 'CRESC', 'APOLL', 'SELEN'
  ],
  // 12. Sun
  sun: [
    'SOLAR', 'SUNNY', 'SHINE', 'BEAMS', 'DAWNS', 'FLARE', 'DAYLY',
    'HELIO', 'NOONS', 'LIGHT', 'BRIGH', 'RAYSS'
  ],
  // 13. Aurora
  aurora: [
    'AUROR', 'NORTH', 'GLOWS', 'SHIMS', 'POLAR', 'IRIDE', 'CURTA',
    'NEONS', 'EMERA', 'VIOLE'
  ],
  // 14. Meteor
  meteor: [
    'METEO', 'COMET', 'SHOOT', 'STARS', 'FALLS', 'ASTRO', 'ROCKS',
    'BOLID', 'CRASH', 'SPEED'
  ],
  // 15. Singularity
  singularity: [
    'HOLES', 'BLACK', 'ABYSS', 'GRAVI', 'SINGU', 'EVENT', 'WARPS',
    'VOIDS', 'DARKS', 'COLLA', 'DENSE'
  ],
  // 16. Rings
  rings: [
    'RINGS', 'SATUR', 'ORBIT', 'DISKS', 'HALOS', 'BELTS', 'ROUND',
    'CIRCL', 'LOOPS', 'TORUS'
  ],
  // 17. Supernova
  supernova: [
    'SUPER', 'NOVAS', 'BURST', 'BLAST', 'STELL', 'EXPL', 'COSMO',
    'FLARE', 'ATOMS', 'PULSE'
  ],
  // 18. Eclipse
  eclipse: [
    'ECLIP', 'SHADO', 'CORON', 'TOTES', 'DARKS', 'ALIGNS', 'OBSCU',
    'OCCUL', 'BLIND'
  ],
  // 19. Nebula
  nebula: [
    'NEBUL', 'COSMO', 'DUSTS', 'SPACE', 'INTER', 'CLOUD', 'STARS',
    'GASES', 'ORION'
  ],
  // 20. Pulsar
  pulsar: [
    'PULSA', 'RADIO', 'BEAMS', 'SWEEP', 'RHYTH', 'LIGHT', 'BLINK',
    'FLASH', 'SIGNL'
  ],

  // 21. Tree
  tree: [
    'TREES', 'PLANT', 'BLOOM', 'FLORA', 'GREEN', 'GROVE', 'LEAFS',
    'ROOTS', 'WOODS', 'FORES', 'SPROU', 'GRASS', 'BRANCH'
  ],
  // 22. Sakura
  sakura: [
    'SAKUR', 'PETAL', 'CHERR', 'PINKY', 'SPRING', 'ROSES', 'BLOSS',
    'HANAM', 'SWEET', 'GENTL'
  ],
  // 23. Butterflies
  butterflies: [
    'BUTTE', 'MOTHS', 'FLIES', 'INSEC', 'SWARM', 'WINGS', 'FLOAT',
    'HOVER', 'PUPAS', 'CHRYS'
  ],
  // 24. Spores
  spores: [
    'SPORE', 'FUNGI', 'MUSHR', 'TOADS', 'HYPHA', 'DECAY', 'MOSS',
    'BIOLU', 'SHROO', 'MYCEL'
  ],
  // 25. Wave
  wave: [
    'WAVES', 'SURFS', 'OCEAN', 'TIDES', 'RIPPL', 'SURGE', 'SHORE',
    'COAST', 'SWELL', 'BEACH', 'AQUAS', 'CREST'
  ],
  // 26. Coral
  coral: [
    'CORAL', 'REEFS', 'SHELL', 'PEARL', 'AQUAS', 'MARIN', 'ABYSS',
    'POLYP', 'TIDAL'
  ],
  // 27. Crystal
  crystal: [
    'PRISM', 'CRYST', 'QUART', 'SHARD', 'JEWEL', 'MINES', 'GEMS',
    'DIAMO', 'BERYL', 'OPALS', 'RUBYS'
  ],
  // 28. Vines
  vines: [
    'VINES', 'IVIES', 'CREEP', 'JUNGLE', 'TWIST', 'GRAPE', 'TENDR',
    'CLIMB', 'LIANA', 'WEEDS'
  ],
  // 29. Phoenix
  phoenix: [
    'PHOEN', 'BIRDS', 'AVIAN', 'FLIER', 'WINGS', 'ASHES', 'REBIR',
    'SOARS', 'EAGLE', 'HAWKS'
  ],
  // 30. Fireflies
  fireflies: [
    'FLIES', 'GLOWS', 'BUGS', 'TWINK', 'NIGHT', 'LAMPS', 'SPARK',
    'FIREY', 'BEETL'
  ],

  // 31. Runes
  runes: [
    'RUNES', 'GLYPH', 'SIGIL', 'MAGIC', 'SPELL', 'MYTHS', 'MARKS',
    'WARDS', 'ARCAS', 'ELDER', 'ENCHA'
  ],
  // 32. Ghost
  ghost: [
    'GHOST', 'SOULS', 'SHADE', 'SPOOK', 'HAUNT', 'PHANT', 'WRAITH',
    'SPIRI', 'APPAR', 'ETHER', 'SPECT'
  ],
  // 33. Gold
  gold: [
    'GOLDS', 'ALCHE', 'MIDAS', 'COINS', 'WEALT', 'SHINE', 'TREAS',
    'RICHY', 'AUREU', 'ROYAL', 'CROWN'
  ],
  // 34. Portal
  portal: [
    'PORTA', 'GATE', 'DOORS', 'WARPS', 'ENTER', 'RIFTS', 'WORMS',
    'VOIDS', 'ENTRY', 'TELEP'
  ],
  // 35. Time
  time: [
    'TIMES', 'CLOCK', 'TICKS', 'HOURS', 'TEMPO', 'CHRON', 'WATCH',
    'AEONS', 'YEARS', 'AGING', 'EPOCH'
  ],
  // 36. Rainbow
  rainbow: [
    'RAINB', 'COLOR', 'SPECTR', 'HUES', 'BOWED', 'IRIDE', 'VIBRA',
    'TINTS', 'PASTE'
  ],
  // 37. Holy
  holy: [
    'HOLYS', 'SAINT', 'ANGEL', 'DIVIN', 'GRACE', 'BLESS', 'SANCT',
    'ALTAR', 'SACRE', 'FAITH', 'HALOS'
  ],
  // 38. Blood
  blood: [
    'BLOOD', 'DEMON', 'DEVIL', 'HELLS', 'CURSE', 'EVILS', 'SINNE',
    'DOOMS', 'CRIMS', 'GORYS', 'VAMPI'
  ],
  // 39. Mirror
  mirror: [
    'MIRRO', 'GLAS', 'REFLE', 'TWINS', 'ECHOS', 'CLONE', 'IMAGE',
    'PARAL'
  ],
  // 40. Eye
  eye: [
    'EYES', 'SIGHT', 'GAZES', 'WATCH', 'VISION', 'PUPIL', 'LOOKS',
    'SEERS', 'OCULA', 'BLIND', 'VIEW'
  ],

  // 41. Matrix
  matrix: [
    'MATRI', 'CYBER', 'CODES', 'BYTES', 'DIGIT', 'NODES', 'NETS',
    'HACKS', 'LOGIC', 'PROGR'
  ],
  // 42. Glitch
  glitch: [
    'GLITC', 'ERROR', 'BUGGY', 'WARPS', 'NOISE', 'CHAOS', 'CORRU',
    'BROKE', 'ANOMA', 'FATAL', 'CRASH'
  ],
  // 43. Laser
  laser: [
    'LASER', 'BEAMS', 'RAYS', 'OPTIC', 'LIGHT', 'FIBER', 'PHASE',
    'ZAPPS', 'FOCUS', 'PENCIL'
  ],
  // 44. Shield
  shield: [
    'SHIEL', 'FORCE', 'ARMOR', 'BLOCK', 'BARRI', 'DEFEN', 'DOMES',
    'GUARD', 'AEGIS', 'WARDE'
  ],
  // 45. Synthwave
  synthwave: [
    'RETRO', 'SYNTH', 'NEONS', 'DISCO', 'VIBES', 'EIGHT', 'MIAMI',
    'GRID'
  ],
  // 46. Radar
  radar: [
    'RADAR', 'SONAR', 'PINGS', 'SCANS', 'PULSE', 'RADIO', 'SCOPE',
    'SWEEP', 'ECHO'
  ],

  // 47. Love
  love: [
    'LOVES', 'HEART', 'AFFE', 'SWEET', 'WARMS', 'AMORE', 'CUPID',
    'CRUSH', 'CHARM', 'ADORE', 'DARLI'
  ],
  // 48. Music
  music: [
    'MUSIC', 'CHORD', 'NOTES', 'TUNES', 'SONGS', 'SOUND', 'VOICE',
    'AUDIO', 'PIANO', 'DRUMS', 'FLUTE'
  ],
  // 49. Chaos
  chaos: [
    'CHAOS', 'ANARC', 'HAVOC', 'MESSY', 'CRAZY', 'PANIC', 'RIOT',
    'TURMO', 'SHRED', 'WRECK'
  ],
  // 50. Peace
  peace: [
    'PEACE', 'CALMS', 'QUIET', 'ZENLY', 'STILL', 'SEREN', 'RESTS',
    'SOOTH', 'RELAX'
  ],
  // 51. Candy
  candy: [
    'CANDY', 'SWEET', 'SUGAR', 'TREAT', 'CAKES', 'ICING', 'HONEY',
    'JELLY', 'FUDGE', 'CRISP'
  ],
  // 52. ZeroG
  zerog: [
    'FLOAT', 'LEVIT', 'ZEROG', 'SPACE', 'HOVER', 'WEIGHT', 'DRIFT',
    'GLIDE', 'AERO'
  ],

  // Backward compatibility
  night: ['NIGHT', 'DARKS', 'SHADO', 'DUSKS', 'GLOOM', 'BLACK', 'SLEEP', 'DREAM', 'NOCTU'],
  light: ['LIGHT', 'SOLAR', 'SHINE', 'SUNNY', 'GLOWS', 'BRIGH', 'BEAMS', 'WHITE', 'CLEAR'],
  fly: ['FLIES', 'FLOAT', 'GLIDE', 'BIRDS', 'WINGS', 'SOARS', 'HOVER', 'DRIFT', 'PLANE']
};

export function getReactionMeta(type: SemanticEffectType): ReactionMeta {
  return (
    REACTIONS_CATALOG[type] || {
      type,
      name: 'Elemental Surge',
      emoji: '✨',
      banner: '✨ WORLD REACTION: Elemental frequency awakens!',
      badge: '✨ SURGE',
      sound: 'chime',
      color: '#34d399'
    }
  );
}

// Physics keyword mappings
const PHYSICS_KEYWORDS = {
  speedFast: ['FAST', 'QUICK', 'SWIFT', 'SPEED', 'FLASH', 'RUSH', 'HYPER'],
  speedSlow: ['SLOW', 'CALM', 'QUIET', 'PAUSE', 'CHILL', 'RESTS', 'SLOTH'],
  scaleBig: ['BIG', 'GIANT', 'GREAT', 'LARGE', 'TITAN', 'HEAVY', 'COLOS'],
  scaleSmall: ['SMALL', 'TINY', 'MICRO', 'SHORT', 'PETIT', 'MINI', 'DWARF'],
  gravityFloat: ['FLOAT', 'LIGHT', 'LEVIT', 'CLOUD', 'FEATH', 'AERIAL'],
  gravityFall: ['FALL', 'STONE', 'HEAVY', 'SINK', 'DROP', 'GRAVE', 'DEPTH'],
  brightDay: ['LIGHT', 'SUNNY', 'SOLAR', 'SHINE', 'GLOWS', 'FLASH', 'WHITE'],
  brightDark: ['DARK', 'NIGHT', 'BLACK', 'SHADO', 'GLOOM', 'DIM', 'DUSK']
};

export class WordWorldReactionEngine {
  /**
   * Evaluates a guess against semantic categories and returns triggered visual effects
   */
  public static evaluateSemanticEffects(guess: string): SemanticEffectType[] {
    const cleanGuess = guess.toUpperCase().trim();
    const active: SemanticEffectType[] = [];

    for (const [effect, words] of Object.entries(SEMANTIC_DICTIONARY) as [SemanticEffectType, string[]][]) {
      const match = words.some((w) => cleanGuess.includes(w) || w.includes(cleanGuess));
      if (match) {
        active.push(effect);
      }
    }

    return active;
  }

  /**
   * Evaluates if a guess triggers dynamic physics alterations
   */
  public static evaluatePhysics(guess: string) {
    const g = guess.toUpperCase().trim();
    const physics = {
      gravity: 1.0,
      scale: 1.0,
      speed: 1.0,
      brightness: 1.0
    };

    if (PHYSICS_KEYWORDS.speedFast.some((k) => g.includes(k))) physics.speed = 1.6;
    if (PHYSICS_KEYWORDS.speedSlow.some((k) => g.includes(k))) physics.speed = 0.55;
    if (PHYSICS_KEYWORDS.scaleBig.some((k) => g.includes(k))) physics.scale = 1.25;
    if (PHYSICS_KEYWORDS.scaleSmall.some((k) => g.includes(k))) physics.scale = 0.85;
    if (PHYSICS_KEYWORDS.gravityFloat.some((k) => g.includes(k))) physics.gravity = 1.45;
    if (PHYSICS_KEYWORDS.gravityFall.some((k) => g.includes(k))) physics.gravity = 0.55;
    if (PHYSICS_KEYWORDS.brightDay.some((k) => g.includes(k))) physics.brightness = 1.4;
    if (PHYSICS_KEYWORDS.brightDark.some((k) => g.includes(k))) physics.brightness = 0.5;

    return physics;
  }

  /**
   * Determines if a guess is a thrilling near-miss (at least 4 matching letters)
   */
  public static isNearMiss(answer: string, guess: string): boolean {
    if (answer === guess) return false; // Win is not a near-miss

    const ansArr = answer.toUpperCase().split('');
    const guessArr = guess.toUpperCase().split('');

    let matches = 0;
    const ansUsed = Array(5).fill(false);
    const guessUsed = Array(5).fill(false);

    // Exact matches
    for (let i = 0; i < 5; i++) {
      if (guessArr[i] === ansArr[i]) {
        matches++;
        ansUsed[i] = true;
        guessUsed[i] = true;
      }
    }

    // Misplaced matches
    for (let i = 0; i < 5; i++) {
      if (guessUsed[i]) continue;
      for (let j = 0; j < 5; j++) {
        if (!ansUsed[j] && guessArr[i] === ansArr[j]) {
          matches++;
          ansUsed[j] = true;
          break;
        }
      }
    }

    return matches >= 4;
  }

  /**
   * Analyzes guess and returns full reactive world delta
   */
  public static processGuess(
    answer: string,
    guess: string,
    currentState: WorldReactionState
  ): WorldReactionState {
    const semanticEffects = this.evaluateSemanticEffects(guess);
    const physics = this.evaluatePhysics(guess);
    const nearMiss = this.isNearMiss(answer, guess);
    const isGlitch = guess.toUpperCase() === 'GLITCH' || guess.toUpperCase() === 'CHAOS' || Math.random() < 0.005;

    // Combine distinct effects
    const combinedEffects = Array.from(
      new Set([...currentState.activeEffects, ...semanticEffects])
    );

    return {
      activeEffects: combinedEffects,
      physics,
      nearMiss,
      isGlitch,
      lastReactionWord: guess.toUpperCase()
    };
  }

  /**
   * Generates deterministic hidden clue relics placed in the 3D world based on the mystery word
   */
  public static generateCluesForWord(word: string, dayNumber: number): HiddenClue[] {
    const w = word.toUpperCase();
    const clues: HiddenClue[] = [];

    if (w.includes('TREE') || w.includes('PLANT') || w.includes('BLOOM') || w.includes('FLORA') || w.includes('GROVE')) {
      clues.push({
        id: `clue-${dayNumber}-flora`,
        word: w,
        name: 'Sacred Verdant Sprout',
        whisper: 'A luminous sapling breathes with ancient chlorophyll...',
        position: [0.9, 0.35, 0.4],
        found: false
      });
    } else if (w.includes('SOLAR') || w.includes('LIGHT') || w.includes('SHINE') || w.includes('BEAM') || w.includes('PRISM')) {
      clues.push({
        id: `clue-${dayNumber}-light`,
        word: w,
        name: 'Refraction Prism Crystal',
        whisper: 'Five concentrated spectral beams refract through sacred glass...',
        position: [-0.85, 0.45, 0.3],
        found: false
      });
    } else if (w.includes('OCEAN') || w.includes('RIVER') || w.includes('WATER') || w.includes('OASIS') || w.includes('TIDE')) {
      clues.push({
        id: `clue-${dayNumber}-water`,
        word: w,
        name: 'Spring of Living Dew',
        whisper: 'Gentle ripples form concentric rings in the tranquil basin...',
        position: [0.0, 0.28, 0.2],
        found: false
      });
    } else if (w.includes('PILOT') || w.includes('PLANE') || w.includes('CRANE') || w.includes('WING') || w.includes('FLY')) {
      clues.push({
        id: `clue-${dayNumber}-flight`,
        word: w,
        name: 'Celestial Astrolabe Compass',
        whisper: 'A magnetized golden needle trembles toward the stratosphere...',
        position: [0.75, 0.38, -0.4],
        found: false
      });
    } else {
      // Default enigmatic runestone
      clues.push({
        id: `clue-${dayNumber}-rune`,
        word: w,
        name: 'Echoing Relic Inscription',
        whisper: `Ancient geometric carvings murmur the cadence of "${w.charAt(0)}..."`,
        position: [-0.95, 0.32, -0.3],
        found: false
      });
    }

    return clues;
  }
}

export type ScreenFXType =
  | 'lightning'
  | 'fire'
  | 'frost'
  | 'quake'
  | 'water'
  | 'toxic'
  | 'glitch'
  | 'blood'
  | 'holy'
  | 'portal'
  | 'love'
  | 'laser'
  | 'gold'
  | 'runes'
  | 'sakura'
  | null;

/**
 * Detects real-time cinematic screen effects when typing specific evocative words
 */
export function detectScreenFX(word: string): ScreenFXType {
  const w = word.toUpperCase().trim();
  if (!w || w.length < 3) return null;

  // 1. Lightning / Shock (e.g. user typing 'SHOCK', 'LIGHT', 'STORM', 'BOLTS')
  if (
    ['SHOCK', 'BOLTS', 'ELECT', 'ZAPPS', 'FLASH', 'THUND', 'VOLTS', 'STRIK', 'STORM', 'SPARK', 'LIGHT', 'SURGE'].some(
      (k) => w.includes(k) || (w.length >= 4 && k.includes(w))
    )
  ) {
    return 'lightning';
  }
  // 2. Fire / Flame
  if (
    ['FLAME', 'FIRES', 'EMBER', 'BLAZE', 'BURNS', 'TORCH', 'HEATS', 'BAKES', 'MAGMA', 'IGNIT', 'SMOKE', 'ASHES', 'INFER'].some(
      (k) => w.includes(k) || (w.length >= 4 && k.includes(w))
    )
  ) {
    return 'fire';
  }
  // 3. Frost / Blizzard
  if (
    ['FROST', 'CHILL', 'SNOWY', 'SNOWS', 'ICING', 'POLAR', 'SLEET', 'GLAZE', 'COLDS', 'BLIZZ', 'FLAKE', 'ARCTI', 'WINTY'].some(
      (k) => w.includes(k) || (w.length >= 4 && k.includes(w))
    )
  ) {
    return 'frost';
  }
  // 4. Earthquake / Seismic
  if (
    ['QUAKE', 'EARTH', 'SHAKE', 'ROCKS', 'STONE', 'FAULT', 'TREMO', 'SPLIT', 'CRACK', 'CLIFF', 'CAVES'].some(
      (k) => w.includes(k) || (w.length >= 4 && k.includes(w))
    )
  ) {
    return 'quake';
  }
  // 5. Water / Tidal Deluge
  if (
    ['WATER', 'RAINY', 'RAINS', 'FLOOD', 'OCEAN', 'TIDES', 'WAVES', 'POURS', 'RIVER', 'AQUAS', 'HYDRO'].some(
      (k) => w.includes(k) || (w.length >= 4 && k.includes(w))
    )
  ) {
    return 'water';
  }
  // 6. Toxic / Poison Miasma
  if (
    ['TOXIC', 'VENOM', 'POISO', 'ACIDS', 'SLIME', 'VIRUS', 'FUMES', 'CORRO', 'TOXIN', 'PLAGU', 'VAPOR'].some(
      (k) => w.includes(k) || (w.length >= 4 && k.includes(w))
    )
  ) {
    return 'toxic';
  }
  // 7. Glitch / Cyber Chaos
  if (
    ['GLITC', 'CHAOS', 'ERROR', 'CYBER', 'HACKS', 'WARPS', 'NOISE', 'BROKE', 'PIXEL', 'RESET'].some(
      (k) => w.includes(k) || (w.length >= 4 && k.includes(w))
    )
  ) {
    return 'glitch';
  }
  // 8. Blood / Crimson
  if (
    ['BLOOD', 'DEMON', 'DEVIL', 'HELLS', 'CURSE', 'DOOMS', 'CRIMS', 'GORYS', 'BLEED', 'SKULL', 'FANGS'].some(
      (k) => w.includes(k) || (w.length >= 4 && k.includes(w))
    )
  ) {
    return 'blood';
  }
  // 9. Holy / Divine Radiance
  if (
    ['HOLYS', 'ANGEL', 'DIVIN', 'BLESS', 'SHINE', 'SOLAR', 'SANCT', 'ALTAR', 'SAINT', 'GLORY', 'HALOS'].some(
      (k) => w.includes(k) || (w.length >= 4 && k.includes(w))
    )
  ) {
    return 'holy';
  }
  // 10. Portal / Void Singularity
  if (
    ['PORTA', 'WORMS', 'BLACK', 'HOLES', 'ABYSS', 'SINGU', 'ENTRY', 'TELEP', 'SPACE', 'WARPS', 'VOIDY'].some(
      (k) => w.includes(k) || (w.length >= 4 && k.includes(w))
    )
  ) {
    return 'portal';
  }
  // 11. Love / Heart Affinity
  if (
    ['LOVES', 'HEART', 'SWEET', 'AMORE', 'CUPID', 'CRUSH', 'CHARM', 'ADORE', 'DARLI', 'KISSY', 'ROSES'].some(
      (k) => w.includes(k) || (w.length >= 4 && k.includes(w))
    )
  ) {
    return 'love';
  }
  // 12. Laser / Synthwave
  if (
    ['LASER', 'BEAMS', 'SYNTH', 'RETRO', 'NEONS', 'RADAR', 'OPTIC', 'RAYSS', 'PHOTN', 'DISCO'].some(
      (k) => w.includes(k) || (w.length >= 4 && k.includes(w))
    )
  ) {
    return 'laser';
  }
  // 13. Gold / Alchemy
  if (
    ['GOLDS', 'ALCHE', 'MIDAS', 'COINS', 'WEALT', 'CROWN', 'JEWEL', 'TREAS', 'MONEY', 'RICHS', 'TIARA'].some(
      (k) => w.includes(k) || (w.length >= 4 && k.includes(w))
    )
  ) {
    return 'gold';
  }
  // 14. Magic / Runes
  if (
    ['MAGIC', 'RUNES', 'SPELL', 'GLYPH', 'SIGIL', 'MYTHS', 'ARCAS', 'WARDS', 'WITCH', 'MYSTI', 'RELIC'].some(
      (k) => w.includes(k) || (w.length >= 4 && k.includes(w))
    )
  ) {
    return 'runes';
  }
  // 15. Sakura / Blossoms
  if (
    ['SAKUR', 'PETAL', 'CHERR', 'BLOOM', 'HANAM', 'FLORA', 'TREES', 'LOTUS', 'GARDN'].some(
      (k) => w.includes(k) || (w.length >= 4 && k.includes(w))
    )
  ) {
    return 'sakura';
  }

  return null;
}
