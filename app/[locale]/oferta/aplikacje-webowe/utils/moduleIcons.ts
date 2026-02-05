import {
  Lock, Wallet, MessageCircle, Map, BarChart, Palette, CheckCircle
} from 'lucide-react';

export const iconMap: Record<string, any> = {
  'lock': Lock,
  'wallet': Wallet,
  'message-circle': MessageCircle,
  'map': Map,
  'bar-chart': BarChart,
  'palette': Palette
};

export const getIcon = (iconName: string) => {
  return iconMap[iconName] || CheckCircle;
};
