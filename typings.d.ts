import Framework7 from 'framework7';
import { EventsType } from '@/services/events';
declare global {
  declare module '*.css';
  declare module '*.less';
  declare module '*.png';
  declare module '*.db';
  interface Window {
    Events: EventsType;
  }
}
