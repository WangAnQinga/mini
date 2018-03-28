Page({
  data:{
    swiperList:null,
    articleList:null,
    page:1,
    count:15
  },
  onLoad:function(){
    this.getSwiperList();
    this.getArticleList();
  },
  getSwiperList(){
    wx.request({
      url:"http://www.gelonghui.com/api/recommend/article/getList",
      success:(result) => {
        this.setData({
          swiperList:result.data.result
        })
      }
    })
  },
  getArticleList(){
    wx.request({
      url:`http://www.gelonghui.com/api/tags/articles?page=${this.data.page}&count=${this.data.count}`,
      success:(result)=>{
        result.data.result.map((item) => {
          item.articleTitle = item.articleTitle.slice(0, 15)          
        })
        if (this.data.page !=1){
          console.log('加载更多')
          this.setData({
            articleList: [...this.data.articleList,...result.data.result]
          });
          console.log(this.data.articleList)
        }else{
          this.setData({
            articleList: result.data.result  
          })
        }
        
      }
    })
  },
  onPullDownRefresh(){
    this.data.page =  1;
    this.getArticleList()
  },
  onReachBottom(){
    this.data.page++;
    this.getArticleList()
  }

})