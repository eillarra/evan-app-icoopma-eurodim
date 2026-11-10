import arrowBack from './arrow_back.svg?raw';
import arrowForward from './arrow_forward.svg?raw';
import chair from './chair.svg?raw';
import close from './close.svg?raw';
import driveFileRenameOutline from './drive_file_rename_outline.svg?raw';
import email from './email.svg?raw';
import feed from './feed.svg?raw';
import graphicEq from './graphic_eq.svg?raw';
import grid3x3 from './grid_3x3.svg?raw';
import groups from './groups.svg?raw';
import holidayVillage from './holiday_village.svg?raw';
import home from './home.svg?raw';
import hotel from './hotel.svg?raw';
import label from './label.svg?raw';
import launch from './launch.svg?raw';
import meetingRoom from './meeting_room.svg?raw';
import menu from './menu.svg?raw';
import pendingActions from './pending_actions.svg?raw';
import photo from './photo.svg?raw';
import pictureAsPdf from './picture_as_pdf.svg?raw';
import place from './place.svg?raw';
import recordVoiceOver from './record_voice_over.svg?raw';
import scheduleSend from './schedule_send.svg?raw';
import school from './school.svg?raw';
import send from './send.svg?raw';
import shield from './shield.svg?raw';
import tram from './tram.svg?raw';
import viewWeek from './view_week.svg?raw';

export const icons = {
  arrow_back: arrowBack,
  arrow_forward: arrowForward,
  chair,
  close,
  drive_file_rename_outline: driveFileRenameOutline,
  email,
  feed,
  graphic_eq: graphicEq,
  grid_3x3: grid3x3,
  groups,
  holiday_village: holidayVillage,
  home,
  hotel,
  label,
  launch,
  meeting_room: meetingRoom,
  menu,
  pending_actions: pendingActions,
  photo,
  picture_as_pdf: pictureAsPdf,
  place,
  record_voice_over: recordVoiceOver,
  schedule_send: scheduleSend,
  school,
  send,
  shield,
  tram,
  view_week: viewWeek,
} as const;

export type IconName = keyof typeof icons;
