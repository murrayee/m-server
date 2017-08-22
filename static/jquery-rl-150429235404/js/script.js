$(document).ready(function(){

	var date = new Date();
	var d = date.getDate();
	var m = date.getMonth();
	var y = date.getFullYear();

	if($('.calendar').length > 0){
		$('.calendar').fullCalendar({
			header: {
				left: 'prev,next,today',
				center: 'title',
				right: '月,周,日'
			},
			buttonText:{
				today:'跳转到当天'
			},
			editable: true,
			events: [
			{
				title: '全天事项',
				start: new Date(y, m, 1)
			},
			{
				title: '长距离项目',
				start: new Date(y, m, d-5),
				end: new Date(y, m, d-2)
			},
			{
				id: 999,
				title: '重复项目',
				start: new Date(y, m, d-3, 16, 0),
				allDay: false
			},
			{
				id: 999,
				title: '重复项目',
				start: new Date(y, m, d+4, 16, 0),
				allDay: false
			},
			{
				title: '会议',
				start: new Date(y, m, d, 10, 30),
				allDay: false
			},
			{
				title: '午餐',
				start: new Date(y, m, d, 12, 0),
				end: new Date(y, m, d, 14, 0),
				allDay: false
			},
			{
				title: '生日聚会',
				start: new Date(y, m, d+1, 19, 0),
				end: new Date(y, m, d+1, 22, 30),
				allDay: false
			},
			{
				title: '点击跳转谷歌',
				start: new Date(y, m, 28),
				end: new Date(y, m, 29),
				url: 'http://www.google.com/'
			}
			]
		});
	}
	
});