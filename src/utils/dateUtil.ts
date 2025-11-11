/**
 * Independent time operation tool to facilitate subsequent switch to dayjs
 */
import dayjs from 'dayjs';
import {reactive, ref} from 'vue';


const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
const DATE_FORMAT = 'YYYY-MM-DD';

export function formatToDateTime(date?: dayjs.ConfigType, format = DATE_TIME_FORMAT): string {
  return dayjs(date).format(format);
}

export function formatToDate(date?: dayjs.ConfigType, format = DATE_FORMAT): string {
  return dayjs(date).format(format);
}


export const getTime = () => {
  const date = dayjs().format(DATE_FORMAT);
  let time = reactive<any>({ a: dayjs().format('HH:mm:ss') });
  const week = dayjs().day();
  let weekday = '';
  const clearInt = ref<any>(null);
  switch (week) {
    case 1:
      weekday = '星期一';
      break;
    case 2:
      weekday = '星期二';
      break;
    case 3:
      weekday = '星期三';
      break;
    case 4:
      weekday = '星期四';
      break;
    case 5:
      weekday = '星期五';
      break;
    case 6:
      weekday = '星期六';
      break;
    case 7:
      weekday = '星期日';
  }
  clearInt.value = setInterval(() => (time.a = dayjs().format('HH:mm:ss')), 1000);
  return {
    date,
    weekday,
    time: time.a,
    clear: () => clearInterval(clearInt.value),
  };
};


export const dateUtil = dayjs;

