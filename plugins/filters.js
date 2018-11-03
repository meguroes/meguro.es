import Vue from 'vue'
const WEEKDAY = ['日', '月', '火', '水', '木', '金', '土']

Vue.filter('toJPDate', function(value) {
  const date = new Date(value)
  return `${date.getFullYear()}年 ${date.getMonth() + 1}月 ${date.getDate()}日 (${WEEKDAY[date.getDay()]})`
})
