import { ServiceItem, SocialPost, StoryHighlight } from '../types';

const image = (number: number) => `/img/servicio%20${number}.jpg`;

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: 'balayage-rubio-perlado',
    name: 'Balayage Rubio Perlado',
    category: 'color',
    categoryLabel: 'Color & Balayage',
    description: 'Aclaración progresiva con raíz difuminada, matiz perlado y acabado luminoso para un rubio elegante y fácil de mantener.',
    duration: '180 - 240 min',
    price: 220,
    popular: true,
    featuredTag: 'Más solicitado',
    image: image(12),
  },
  {
    id: 'babylights-contouring',
    name: 'Babylights & Face Framing',
    category: 'color',
    categoryLabel: 'Color & Mechas',
    description: 'Mechas finas y puntos de luz alrededor del rostro para iluminar sin perder profundidad ni naturalidad.',
    duration: '180 min',
    price: 190,
    popular: true,
    featuredTag: 'Efecto luminoso',
    image: image(13),
  },
  {
    id: 'morena-iluminada',
    name: 'Morena Iluminada',
    category: 'color',
    categoryLabel: 'Color & Balayage',
    description: 'Dimensión en tonos avellana y caramelo, diseñada para conservar una base profunda con reflejos suaves y favorecedores.',
    duration: '150 - 210 min',
    price: 180,
    popular: true,
    featuredTag: 'Tendencia',
    image: image(10),
  },
  {
    id: 'chocolate-gloss',
    name: 'Chocolate Gloss & Brillo Espejo',
    category: 'color',
    categoryLabel: 'Coloración',
    description: 'Baño de color chocolate con tratamiento de brillo para intensificar el tono y conseguir una melena pulida y saludable.',
    duration: '90 - 120 min',
    price: 110,
    popular: false,
    image: image(4),
  },
  {
    id: 'mechas-dimensionales',
    name: 'Mechas Dimensionales',
    category: 'color',
    categoryLabel: 'Color & Mechas',
    description: 'Combinación de luces y sombras para aportar movimiento visual, profundidad y una transición delicada desde la raíz.',
    duration: '180 min',
    price: 195,
    popular: false,
    image: image(6),
  },
  {
    id: 'corte-capas-largas',
    name: 'Corte en Capas Largas',
    category: 'corte',
    categoryLabel: 'Corte & Diseño',
    description: 'Diseño de capas que conserva el largo, enmarca el rostro y aporta movimiento natural al peinado.',
    duration: '60 min',
    price: 45,
    popular: true,
    featuredTag: 'Movimiento natural',
    image: image(11),
  },
  {
    id: 'brushing-ondas',
    name: 'Brushing & Ondas Pulidas',
    category: 'corte',
    categoryLabel: 'Styling',
    description: 'Lavado, secado y ondas de larga duración con volumen controlado para eventos o para renovar tu look diario.',
    duration: '45 - 60 min',
    price: 40,
    popular: false,
    image: image(5),
  },
  {
    id: 'ritual-brillo',
    name: 'Ritual de Hidratación & Brillo',
    category: 'tratamiento',
    categoryLabel: 'Salud Capilar',
    description: 'Tratamiento nutritivo y sellado de cutícula para recuperar suavidad, controlar el frizz y potenciar el brillo.',
    duration: '75 min',
    price: 90,
    popular: true,
    featuredTag: 'Rescate capilar',
    image: image(7),
  },
  {
    id: 'matizacion-rubios',
    name: 'Matización & Mantenimiento de Rubios',
    category: 'tratamiento',
    categoryLabel: 'Mantenimiento de Color',
    description: 'Neutralización de reflejos no deseados, nutrición y baño de brillo para prolongar un rubio uniforme y luminoso.',
    duration: '90 min',
    price: 100,
    popular: false,
    image: image(2),
  },
];

export const SOCIAL_POSTS: SocialPost[] = [
  {
    id: 'tiktok-real-1', platform: 'tiktok', handle: '@destellossalon_chiclayo', authorName: 'Destellos Salón', authorAvatar: '/img/logo.png',
    mediaUrl: 'https://www.tiktok.com/@destellossalon_chiclayo/video/7642499288030874901', mediaType: 'video', thumbnail: image(1),
    caption: 'Mira este trabajo real de Destellos Salón. Reproduce el video para conocer el resultado completo.',
    likes: 0, commentsCount: 0, date: 'TikTok real', tags: ['#DestellosSalon', '#TikTokChiclayo'],
    serviceCategory: 'Videos de TikTok', stylistName: 'Equipo Destellos', isPinned: true,
    tiktokId: '7642499288030874901',
    tiktokUrl: 'https://www.tiktok.com/@destellossalon_chiclayo/video/7642499288030874901',
  },
  {
    id: 'tiktok-real-2', platform: 'tiktok', handle: '@destellossalon_chiclayo', authorName: 'Destellos Salón', authorAvatar: '/img/logo.png',
    mediaUrl: 'https://www.tiktok.com/@destellossalon_chiclayo/video/7262333996359503110', mediaType: 'video', thumbnail: image(3),
    caption: 'Video real publicado por Destellos Salón en TikTok.',
    likes: 0, commentsCount: 0, date: 'TikTok real', tags: ['#DestellosSalon', '#TikTokChiclayo'],
    serviceCategory: 'Videos de TikTok', stylistName: 'Equipo Destellos',
    tiktokId: '7262333996359503110',
    tiktokUrl: 'https://www.tiktok.com/@destellossalon_chiclayo/video/7262333996359503110',
  },
  {
    id: 'tiktok-real-3', platform: 'tiktok', handle: '@destellossalon_chiclayo', authorName: 'Destellos Salón', authorAvatar: '/img/logo.png',
    mediaUrl: 'https://www.tiktok.com/@destellossalon_chiclayo/video/7684809828274834708', mediaType: 'video', thumbnail: image(6),
    caption: 'Video real publicado por Destellos Salón en TikTok.',
    likes: 0, commentsCount: 0, date: 'TikTok real', tags: ['#DestellosSalon', '#TikTokChiclayo'],
    serviceCategory: 'Videos de TikTok', stylistName: 'Equipo Destellos', isPinned: true,
    tiktokId: '7684809828274834708',
    tiktokUrl: 'https://www.tiktok.com/@destellossalon_chiclayo/video/7684809828274834708',
  },
  {
    id: 'tiktok-real-4', platform: 'tiktok', handle: '@destellossalon_chiclayo', authorName: 'Destellos Salón', authorAvatar: '/img/logo.png',
    mediaUrl: 'https://www.tiktok.com/@destellossalon_chiclayo/video/7672557547055795477', mediaType: 'video', thumbnail: image(8),
    caption: 'Video real publicado por Destellos Salón en TikTok.',
    likes: 0, commentsCount: 0, date: 'TikTok real', tags: ['#DestellosSalon', '#TikTokChiclayo'],
    serviceCategory: 'Videos de TikTok', stylistName: 'Equipo Destellos',
    tiktokId: '7672557547055795477',
    tiktokUrl: 'https://www.tiktok.com/@destellossalon_chiclayo/video/7672557547055795477',
  },
  {
    id: 'tiktok-real-5', platform: 'tiktok', handle: '@destellossalon_chiclayo', authorName: 'Destellos Salón', authorAvatar: '/img/logo.png',
    mediaUrl: 'https://www.tiktok.com/@destellossalon_chiclayo/video/7654015392712559893', mediaType: 'video', thumbnail: image(9),
    caption: 'Video real publicado por Destellos Salón en TikTok.',
    likes: 0, commentsCount: 0, date: 'TikTok real', tags: ['#DestellosSalon', '#TikTokChiclayo'],
    serviceCategory: 'Videos de TikTok', stylistName: 'Equipo Destellos',
    tiktokId: '7654015392712559893',
    tiktokUrl: 'https://www.tiktok.com/@destellossalon_chiclayo/video/7654015392712559893',
  },
  {
    id: 'tiktok-real-6', platform: 'tiktok', handle: '@destellossalon_chiclayo', authorName: 'Destellos Salón', authorAvatar: '/img/logo.png',
    mediaUrl: 'https://www.tiktok.com/@destellossalon_chiclayo/video/7571987722030599442', mediaType: 'video', thumbnail: image(13),
    caption: 'Video real publicado por Destellos Salón en TikTok.',
    likes: 0, commentsCount: 0, date: 'TikTok real', tags: ['#DestellosSalon', '#TikTokChiclayo'],
    serviceCategory: 'Videos de TikTok', stylistName: 'Equipo Destellos',
    tiktokId: '7571987722030599442',
    tiktokUrl: 'https://www.tiktok.com/@destellossalon_chiclayo/video/7571987722030599442',
  },
];

export const STORY_HIGHLIGHTS: StoryHighlight[] = [
  {
    id: 'rubios', title: 'Rubios', coverImage: image(12),
    stories: [
      { id: 'r1', image: image(12), caption: 'Rubio perlado con raíz difuminada.', timestamp: 'Inspiración' },
      { id: 'r2', image: image(2), caption: 'Rubio cálido con acabado brillante.', timestamp: 'Inspiración' },
    ],
  },
  {
    id: 'morenas', title: 'Morenas', coverImage: image(10),
    stories: [
      { id: 'm1', image: image(10), caption: 'Dimensión avellana sobre una base profunda.', timestamp: 'Inspiración' },
      { id: 'm2', image: image(4), caption: 'Chocolate gloss y brillo espejo.', timestamp: 'Inspiración' },
    ],
  },
  {
    id: 'mechas', title: 'Mechas', coverImage: image(13),
    stories: [
      { id: 'me1', image: image(13), caption: 'Mechas beige con contorno luminoso.', timestamp: 'Inspiración' },
      { id: 'me2', image: image(6), caption: 'Mechas cálidas de efecto dimensional.', timestamp: 'Inspiración' },
    ],
  },
  {
    id: 'salon', title: 'El salón', coverImage: '/img/sede.png',
    stories: [
      { id: 's1', image: '/img/sede.png', caption: 'Un espacio preparado para dedicarle tiempo y detalle a cada look.', timestamp: 'Chiclayo' },
    ],
  },
];

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
}

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  { id: 'p1', title: 'Morena iluminada beige', category: 'Balayage', description: 'Luz suave alrededor del rostro y medios con profundidad natural.', image: image(1) },
  { id: 'p2', title: 'Rubio miel luminoso', category: 'Rubios', description: 'Mezcla cálida y uniforme con acabado de alto brillo.', image: image(2) },
  { id: 'p3', title: 'Dimensión avellana', category: 'Mechas', description: 'Reflejos finos y ondas que hacen visible el movimiento del color.', image: image(3) },
  { id: 'p4', title: 'Chocolate gloss', category: 'Coloración', description: 'Tono profundo y pulido con un brillo intenso.', image: image(4) },
  { id: 'p5', title: 'Ondas naturales', category: 'Styling', description: 'Peinado suave con volumen controlado y movimiento.', image: image(5) },
  { id: 'p6', title: 'Balayage caramelo', category: 'Balayage', description: 'Contraste cálido con integración progresiva desde la raíz.', image: image(6) },
  { id: 'p7', title: 'Castaño dimensional', category: 'Coloración', description: 'Reflejos delicados para dar profundidad y brillo.', image: image(7) },
  { id: 'p8', title: 'Face framing beige', category: 'Mechas', description: 'Puntos de luz frontales que enmarcan y realzan el rostro.', image: image(8) },
  { id: 'p9', title: 'Iluminación caramelo', category: 'Balayage', description: 'Degradado de bajo contraste pensado para un crecimiento natural.', image: image(9) },
  { id: 'p10', title: 'Morena iluminada avellana', category: 'Coloración', description: 'Luces y sombras equilibradas para una melena con dimensión.', image: image(10) },
  { id: 'p11', title: 'Capas largas & brillo', category: 'Corte', description: 'Capas que conservan el largo y multiplican el movimiento.', image: image(11) },
  { id: 'p12', title: 'Rubio perlado', category: 'Rubios', description: 'Aclaración limpia con matiz frío y contorno facial.', image: image(12) },
  { id: 'p13', title: 'Babylights beige', category: 'Mechas', description: 'Mechas finas con transición delicada y acabado luminoso.', image: image(13) },
];
