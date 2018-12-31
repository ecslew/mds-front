<template>
<div class='project-backed'>
  <div class="container">
    <div class="row">
      <div class="col-sm-10 col-sm-offset-1">
        <h4 class="title">{{$t('support_projects')}}</h4>
        <div class="subtitle">{{$t('support_projects_subtitle')}}</div>
        <div class="started">{{$t("started")}}</div>
        <div class="list" v-for="item in programs" :key="item.id">
          <myproject-list :isBacked="isBacked" :id="item.eosID" :isFail="item.isFail" :picture="item.img" :isApproved="item.isApproved" :title="item.title" :targetAmount="item.targetAmount" :time="item.releaseTime"></myproject-list>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import myprojectList from '@/base/myproject-list'
import user from 'static/js/user'
export default {
  data() {
    return {
      isBacked: true,
      currentAccount:'',
      programs: []
    }
  },
  mounted() {
    this.getSupported();
  },
  methods: {
    getSupported(){
      let _this = this;
      user.getAccount().then((currentAccount) => {
        _this.currentAccount = currentAccount.name;
        // 从交易记录获取支持过的项目
        $.get(_this.globalData.domain+'/apiCrowdfunding/supported',{account:_this.currentAccount},function(res){
          if( res.success ){
            $.each( res.data.transfer,function(index,event){
              let memo = JSON.parse(event.data.memo.replace(/###/ig, ''));
              let eosID = memo.ID;
              // 通过编号查信息
              if( eosID  ){
                $.get( _this.globalData.domain+'/apiCrowdfunding/getInfo',{eosID:eosID},function(result){
                  if( result.success ){
                    let tmp = {
                      eosID: result.data.eosID,
                      img: result.data.photos,
                      title: result.data.title,
                      isApproved: false,
                      isFail: true,
                      releaseTime: result.data.releaseTime
                    };
                    _this.programs.push(tmp);
                  }
                },'json' )
              }
            })
          }
        },'json')  
      })
    }
  },
  components: {
    myprojectList
  }
}
</script>

<style scoped>
.project-backed {
  padding: 32px 0;
}

.project-backed .container {
  background: #fff;
  padding: 40px 15px 80px;
  border-radius: 4px;
}

.started {
  font-size: 16px;
  font-family: Gotham-Medium;
  padding: 64px 0 8px;
  border-bottom: 1px solid #e7ecf0;
  margin-bottom: 36px;
}

.list {
  padding: 12px 0;
}

@media (max-width: 767px) {
  .project-backed {
    padding: 16px;
  }

  .started {
    padding-top: 32px;
    margin: 8px;
  }

  .list {
    padding: 8px 0;
  }

}
</style>
