Page({
  data:{
    title:"首页",
    list:null,
    lastDataTime:'',
  },
  onLoad:function(){
    this.getData()
  },
  getData:function(){
    wx.request({
      url:`http://www.gelonghui.com/api/dtb/list?timestamp=${this.data.lastDataTime}`,
      success:(response) => {
        response.data.result.map((item,index) => {
          item.createTime = this.dateFtt("YYYY-MM-dd hh:mm:ss", new Date(item.createTime*1000))
        })
        if (this.data.lastDataTime){
          this.setData({
            list:[...this.data.list,...response.data.result],
            lastDataTime: response.data.result[response.data.result.length - 1].createTime - 1
          })
        }else{
          this.setData({
            list: response.data.result,
            lastDataTime: response.data.result[response.data.result.length - 1].createTime - 1
          })
        }
        
      }
    })
  },
  onPullDownRefresh() {
    this.data.lastDataTime = ''
    this.getData()
  },
  onReachBottom() {
    this.getData()
  },
  dateFtt(fmt, date){
     //author: meizz   
      var o = {
        'Y+': date.getFullYear(),
        "M+": date.getMonth() + 1,                 //月份   
        "d+": date.getDate(),                    //日   
        "h+": date.getHours(),                   //小时   
        "m+": date.getMinutes(),                 //分   
        "s+": date.getSeconds(),                 //秒   
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度   
        "S": date.getMilliseconds()             //毫秒   
      };   

      if(/(y +)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));

      for (var k in o){
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      };

      return fmt;   
  } 
})