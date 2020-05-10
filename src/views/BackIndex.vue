<template>
    <div>
                <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  </el-breadcrumb>
  <div class="text">
      <a>欢迎来到英雄联盟商城后台管理系统</a>
  </div>
  <div class="icon">
    <ul>
      <li>
          <div class="icon-img"> 
              <img src="./../assets/buser.png" alt="">
                </div>
                <div class="icon-text">
          <a>用户数</a><br>
          <countTo :startVal='startVal' :endVal='UendVal' :duration='2000'  class="icon-dtext"></countTo>
      </div>
      </li>
      <li>
          <div class="icon-img"> 
              <img src="./../assets/bgoods.png" alt="">
                </div>
                <div class="icon-text">
          <a>商品数</a><br>
          <countTo :startVal='startVal' :endVal='GendVal' :duration='2000'  class="icon-dtext"></countTo>
          </div>
      </li>
      <li>
          <div class="icon-img"> 
              <img src="./../assets/bsale.png" alt="">
                </div>
                <div class="icon-text">
          <a>销量</a><br>
          <countTo :startVal='startVal' :endVal='SendVal' :duration='2000'  class="icon-dtext"></countTo>
          </div>
      </li>
      <li>
         <div class="icon-img"> 
              <img src="./../assets/byes.png" alt="">
                </div>
                <div class="icon-text">
          <a>好评数</a><br>
          <countTo :startVal='startVal' :endVal='YendVal' :duration='2000'  class="icon-dtext"></countTo>
          </div>
      </li>
    </ul>
  </div>
  <div id="main" class="rest"></div>

    </div>
</template>
<script>
import countTo from 'vue-count-to';
export default {
    data(){
        return{
            startVal: 0,
            UendVal: 200,
            GendVal:210,
            SendVal:500,
            YendVal:470
        }
    },
    components:{countTo},
    mounted(){
        var echarts = require('echarts');
        var myChart = echarts.init(document.getElementById('main'));
        myChart.setOption({
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        right:'5%',      
        data: ['用户数', '商品数', '销量', '好评数']
    },
    grid: {
        left: '2%', 
        right: '4%',
        bottom: '2%',
        containLabel: true
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['十一月','十二月','一月', '二月', '三月', '四月', '五月']
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            name: '用户数',
            type: 'line',
            stack: '总量',
            data: [0, 40, 50, 100, 130, 155, 200]
        },
        {
            name: '商品数',
            type: 'line',
            stack: '总量',
            data: [0, 45, 77, 100, 140, 178, 210]
        },
        {
            name: '销量',
            type: 'line',
            stack: '总量',
            data: [0, 150, 244, 340, 390, 470, 500]
        },
        {
            name: '好评数',
            type: 'line',
            stack: '总量',
            data: [0, 120, 211, 313, 350, 400, 470]
        }
    ]
});
    }
}
</script>
<style scoped>
/* 主体区 */
.el-breadcrumb {
  height:50px;
  line-height:50px;
  font-size:22px;
  padding-left:30px;
}
.text{
  height:50px;
   line-height:50px;
   color:grey;
   font-size:20px;
   padding-left:30px;
}
.icon{
  height:160px;
  background-color:white;
}
.icon ul{
    display:flex;
}
.icon ul li {
    width:300px;
    height:110px;
    margin-left:20px;
    margin-top:20px;
    border:1px grey solid;
}
.icon ul li:hover{
    border:2px grey solid;
}
.icon-img img{
    width:50px;
    height:50px;
    margin-left:30px;
    margin-top:25px;
    float:left;
}
.icon-text{
    float:right;
    margin-right:50px;
}
.icon-text  a{
    font-size:20px;
    line-height:40px;
}
.icon-dtext{
    font-size:30px;
    line-height:50px;
}
.rest{
  height:305px;
}
</style>