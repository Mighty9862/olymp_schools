export interface INewsItem {
  id: number;
  title: string;
  description: string;
  content?: string;
  created_at?: string;
  images?: string[];
}
export interface INewsModalProps {
  text: string;
  date: string;
  desc: string;
  isOpen: boolean;
  onClose: () => void;
}
