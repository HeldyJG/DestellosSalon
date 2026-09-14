export interface ServiceItem {
  id: string;
  name: string;
  category: 'color' | 'corte' | 'tratamiento' | 'uñas' | 'novias';
  categoryLabel: string;
  description: string;
  duration: string;
  price: number;
  popular?: boolean;
  featuredTag?: string;
  image: string;
}

export interface SocialPost {
  id: string;
  platform: 'instagram' | 'tiktok';
  handle: string;
  authorName: string;
  authorAvatar: string;
  mediaUrl: string;
  mediaType: 'image' | 'video';
  thumbnail: string;
  caption: string;
  likes: number;
  commentsCount: number;
  date: string;
  tags: string[];
  serviceCategory: string;
  stylistName: string;
  audioTitle?: string;
  isPinned?: boolean;
  tiktokId?: string;
  tiktokUrl?: string;
}

export interface Stylist {
  id: string;
  name: string;
  role: string;
  experience: string;
  photo: string;
  specialties: string[];
  instagram: string;
  bio: string;
  rating: number;
}

export interface Testimonial {
  id: string;
  clientName: string;
  avatar: string;
  service: string;
  rating: number;
  comment: string;
  date: string;
  source: 'Google Reviews' | 'Instagram' | 'Treatwell';
  stylistName: string;
}

export interface BeforeAfterTransformation {
  id: string;
  title: string;
  category: string;
  stylist: string;
  beforeImage: string;
  afterImage: string;
  duration: string;
  description: string;
  formula: string;
}

export interface StoryHighlight {
  id: string;
  title: string;
  coverImage: string;
  stories: {
    id: string;
    image: string;
    caption: string;
    timestamp: string;
  }[];
}

export interface BookingDetails {
  serviceId: string;
  serviceName: string;
  servicePrice: number;
  stylistId: string;
  stylistName: string;
  date: string;
  timeSlot: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  notes?: string;
}
