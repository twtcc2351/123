<template>
  <div class="hello">
    <img src="../assets/image/top1.jpg" alt>
    <div class="container">
      <div class="titile layui-btn-radius">个人投资者参与条件</div>
      <p>
        1、开通前的20个交易日证券账户及资金账户内的资产
        <span class="words">日均不低于人民币50万元</span>
        （不包括通过融资融券融入的资金和证券）；
      </p>
      <p>
        2、参与证券交易
        <span class="words">24个月</span>
        以上
      </p>
      <p>3、充分了解科创板相关规则及风险，并符合适当性管理相关要求。</p>
      <router-link to="/Yuyue" class="layui-btn layui-btn-radius btn-color b20">点此立即预约</router-link>
       <div class="titile layui-btn-radius">科创板与现有A股的区别</div>
      <table class="layui-table">
        <colgroup>
          <col width="20%">
          <col width="40%">
          <col width="40%">
        </colgroup>
        <thead>
          <tr>
            <th></th>
            <th>科创板</th>
            <th>现有A股</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>企业门槛</td>
            <td>允许未盈利企业、红筹企业上市</td>
            <td>国内盈利企业</td>
          </tr>
          <tr>
            <td>投票权</td>
            <td>允许同股不同权</td>
            <td>必须同股同权</td>
          </tr>
          <tr>
            <td>审批流程</td>
            <td>注册制，5个工作日内上交所决定是否受理+3个月内上交所出具是否同意公开发行并上市的审核意见+20个工作日内证监会决定是否同意注册</td>
            <td>审核制，企业上市需要排队审核，扶贫企业和央企优先</td>
          </tr>
          <tr>
            <td>IPO定价</td>
            <td>机构投资者市场化询价</td>
            <td>“限定”23倍市盈率发行</td>
          </tr>
          <tr>
            <td>发行配售</td>
            <td>网下配售预估占比在60%-80%</td>
            <td>网下配售最多50%</td>
          </tr>
           <tr>
            <td>开户资格</td>
            <td>2年交易经验，权限开通前20个交易日证券账户及资金账户内的资产日均不低于人民币50万元</td>
            <td>开通创业板需要2年交易经验，其余0门槛</td>
          </tr>
           <tr>
            <td>交易规则</td>
            <td>上市前5天没有涨跌幅限制，之后每天限定为20%</td>
            <td>上市首日最大涨幅为44%，之后限制为10%</td>
          </tr>
           <tr>
            <td>交易单位</td>
            <td>每手不低于200股，然后1股递增</td>
            <td>每手100股</td>
          </tr>
           <tr>
            <td>盘后固定价格交易</td>
            <td>新增盘后固定价格交易，15:05-15:30，可以继续按照当天的收盘价委托交易</td>
            <td></td>
          </tr>
           <tr>
            <td>退市规则</td>
            <td>1、连续120个交易日累计成交量低于200万股<br>
                2、连续20个交易日收盘价格低于面值<br>
                3、连续20个交易日股票市值低于3亿元<br>
                4、连续20个交易日股东数量均低于400人<br>
                5、科创板取消暂停交易和恢复交易机制，连续2年不达标直接退市
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="footer"></div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {};
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  width: 100%;
  font-size: 0;
}
.hello .container {
  width: 100%;
  background: url("../assets/image/container2.jpg");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  box-sizing: border-box;
  padding: 2rem;
  font-size: 16px;
  font-weight: 600;
  color: #fff;
}
.hello .footer{
  width: 100%;
  background: url("../assets/image/footer.jpg");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  height: 6.6rem;
}
.hello .container .titile {
  background: linear-gradient(
    to top,
    rgba(11, 52, 230, 0.6),
    rgba(11, 52, 230, 0.84)
  );
  padding: 0.7rem 2rem;
  width: 15rem;
  margin: 0 auto 2rem ;
  font-family:'SimHei,FangSong'
}
p {
  color: #666;
  font-size: 15px;
  text-align: left;
  font-weight: 400;
  line-height: 2rem;
  margin-bottom: 1rem;
}
.words {
  color: orangered;
}
.layui-table thead tr th,
.layui-table tbody tr td:nth-child(1) {
  color:blue;
  font-size: 10px;
  font-weight: 600;
  text-align: center;
}
.layui-table td,
.layui-table th{
  padding: 0.3rem;
}
.layui-table tbody tr td:not(:first-child){
  font-size: 8px;
  font-weight: 400;
  text-align: left;
}
.b20{
  margin-bottom: 3rem;
}
</style>
