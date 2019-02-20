// 全局过滤器
export function timeFormat(time){
	let date = new Date(1*time);
    return date.getFullYear()+'-'+(date.getMonth() + 1)+'-'+date.getDate()+'  '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
}