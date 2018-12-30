<template>
<div class="myproject-list">
  <div class="list-pic col-sm-3" :style="{backgroundImage: 'url(' + picture +')'}">
    <!-- 我的项目:未发布的项目 -->
    <div class="status" v-if='(!isBacked)&&(!isApproved)'>
      <!-- 审核未通过 -->
      <div v-if="isFail">
        <p>{{$t('Audit_failed')}}</p>
        <!-- <p class="why">{{$t('not_pass_reason')}}</p> -->
      </div>
      <!-- 正在审核 -->
      <div v-else>
        <p>{{$t('in_review')}}</p>
      </div>
    </div>
  </div>
  <div class="info col-sm-9">
    <h4 style="-webkit-box-orient: vertical;">{{title}}</h4>
    <div class="time">{{$t('release_time')}}: {{time.slice(0,10)}}</div>
    <div class="btn-box">
      <!-- 支持项目 -->
      <template v-if='isBacked'>
        <router-link :to="{
            path: '/projectDetail',
            query: {
              id: id
            }
          }">{{$t('view_project')}}</router-link>
      </template>
      <!-- 我的项目 -->
      <template v-else>
        <!-- 已发布 -->
        <template v-if="isApproved">
          <router-link :to="{
              path: '/projectDetail',
              query: {
                id: id
              }
            }" class="main-color">{{$t('approved')}}</router-link>
        </template>
        <!-- 未发布 -->
        <template v-else>
          <router-link class="editor" :to="{
              path: '/projectModify',
              query: {
                eosID: id
              }
            }">{{$t('editor')}}</router-link>
          <a href="javascript:;" class="delete" @click="deleteProject">{{$t('delete')}}</a>
        </template>
      </template>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: ['index', 'picture', 'title', 'targetAmount', 'time', 'id', 'isApproved', 'isFail', 'isBacked'],
  methods: {
    deleteProject() {
      this.$emit('deleteItem', this.index, this.id)
    }
  }
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
  margin-bottom: 8px;
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

.btn-box a {
  display: inline-block;
  padding-right: 32px;
  color: #2196f3;
  cursor: pointer;
}

.btn-box .delete {
  color: #f44336 !important;
}

.status {
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  text-align: center;
  font-family: Gotham-Medium;
  line-height: 1.7;
  height: 100%;
  position: relative;
}

.status>div {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
}

.why {
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

  .info .time {
    font-size: 12px;
  }

  .btn-box {
    font-size: 14px;
  }
}
</style>
