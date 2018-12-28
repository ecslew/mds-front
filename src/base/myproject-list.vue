<template>
<router-link :to="{
          path: '/projectDetail',
          query: {
            id: id
          }
        }" class="myproject-list">
  <div class="list-pic col-sm-3" :style="{backgroundImage: 'url(' + picture +')'}">
    <div class="status" v-if='!isApproved'>
      <div v-if="isFail">
        <p>{{$t('Audit_failed')}}</p>
        <p class="why">{{$t('not_pass_reason')}}</p>
      </div>
      <div v-else>
        <p>{{$t('in_review')}}</p>
      </div>
    </div>
  </div>
  <div class="info col-sm-9">
    <h4 style="-webkit-box-orient: vertical;">{{title}}</h4>
    <div class="time">{{$t('release_time')}}:{{time}}</div>
      <div class="btn-box">
        <template v-if="isApproved">
          <span class="main-color">{{$t('approved')}}</span>
        </template>
        <template v-else>
          <span class="editor">{{$t('editor')}}</span>
          <span class="delete">{{$t('delete')}}</span>
        </template>
      </div>
    </div>
</router-link>
</template>

<script>
export default {
  props: ['picture', 'title', 'complete', 'time', 'id', 'isApproved', 'isFail']
}
</script>

<style scoped>
.myproject-list {
  display: block;
  border: 1px solid #e7ecf0;
  border-radius: 4px;
  overflow: hidden;
}

.list-pic {
  padding: 0;
  height: 168px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

.info {
  padding: 16px;
  color: #2c363f;
  overflow: hidden;
}

.info h4 {
  font-family: Gotham-Medium;
  font-size: 20px;
  height: 48px;
  padding-bottom: 8px;
  line-height: 1.2;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.info .time {
  color: #607d8b;
}

.btn-box {
  margin-top: 24px;
  font-size: 16px;
  font-family: Gotham-Medium;
  line-height: 1.5;
}

.btn-box span {
  display: inline-block;
  padding-right: 32px;
  color: #2196f3;
  cursor: pointer;
}

.btn-box .delete {
  color: #f44336;
}
.status{
  background: rgba(0,0,0,0.5);
  color: #fff;
  text-align: center;
  font-family: Gotham-Medium;
  line-height: 1.7;
  height: 100%;
  position: relative;
}
.status>div{
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
}
.why{
  text-decoration: underline;
  font-family: Gotham-Book;
}
@media (max-width: 767px) {
  .list-pic {
    height: 228px;
  }

  .info .complete {
    padding-bottom: 28px;
  }

  .info h4 {
    height: auto;
    font-size: 14px;
  }
  .info .time{
    font-size: 12px;
  }
  .btn-box{
    font-size: 14px;
  }
}
</style>
