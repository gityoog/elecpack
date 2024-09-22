

export function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function createUUID(e: number = 32) {
  e = e || 32
  for (var t = "4a5122a4vUpy33j924bb2e5d", n = t.length, o = "", a = 0; a < e; a++)
    o += t.charAt(Math.floor(Math.random() * n))
  return o
}

export function formatDate(date: Date | string | number = new Date(), fmt: string = 'yyyy-MM-dd') {
  if (typeof date === 'string' || typeof date === 'number') {
    date = new Date(date)
  }
  let o: Record<string, number> = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? String(o[k]) : ('00' + o[k]).substr(('' + o[k]).length))
    }
  }
  return fmt
}