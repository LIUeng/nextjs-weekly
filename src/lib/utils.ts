import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function _dayjs() {
  dayjs.extend(relativeTime);
  dayjs.extend(updateLocale);

  dayjs.updateLocale("en", {
    relativeTime: {
      future: "%s后",
      past: "%s前",
      s: "几秒",
      m: "1分钟",
      mm: "%d分钟",
      h: "1小时",
      hh: "%d小时",
      d: "1天",
      dd: "%d天",
      M: "1个月",
      MM: "%d月",
      y: "1年",
      yy: "%d年",
    },
  });
  return dayjs;
}
