import { Image } from "./images";

export interface Message {
  message: string;
  type: string;
  isLoading: boolean;
  userTyped: boolean;
  suggestedReplies: string[];
  imageUrl?: string;
  videoUrl?: string;
  thumbNailUrl?: string;
  loadVideo?: boolean;
  showForm?: boolean;
  images?: Image[];
}
