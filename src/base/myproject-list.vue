<template>
<div class="myproject-list">
  <div class="list-pic col-sm-3" :style="{backgroundImage: 'url(' + photos +')'}">
    <!-- 项目状态，0：审核中，1：审核未通过，2：筹款中，3：筹款结束 -->
    <div class="status" v-if="status==1 || status == 0">
      <!-- 审核未通过 1-->
      <div v-if="status==1">
        <p>{{$t('Audit_failed')}}</p>
        <p class="why" data-toggle="modal" :data-target="'#reason'+index">{{$t('not_pass_reason')}}</p>
      </div>
      <!-- 审核中 -->
      <div v-if='status==0'>
        <p>{{$t('in_review')}}</p>
      </div>
    </div>
  </div>
  <div class="info col-sm-9">
    <h4 style="-webkit-box-orient: vertical;">{{title}}</h4>
    <p class="time">{{$t('release_time')}}: {{time}}</p>
      <div class="btn-box">
        <!-- 我支持的项目 -->
        <template v-if="isBacked">
          <router-link :to="{
            path: '/projectDetail',
            query: {
              id: id
            }
          }">{{$t('view_project')}}</router-link>
        </template>
        <!-- 我的项目 -->
        <template v-else>
          <!-- 审核通过 -->
          <template v-if="status==2||status==3">
            <router-link :to="{
              path: '/projectDetail',
              query: {
                id: id
              }
            }" class="main-color">{{$t('approved')}}</router-link>
          </template>
          <!-- 待审核 -->
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

  <div class="modal text-center" :id="'reason'+index">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span></button>
        <div class="info">{{comment}}</div>
        <div class="start" data-dismiss="modal">{{$t("confirm")}}</div>
      </div>
    </div>
  </div>

</div>
</template>

<script>
export default {
  props: ['index', 'title', 'time', 'id', 'status', 'isBacked'],
  data() {
    return {
      url: '/apiCrowdfunding/getInfo?eosID=',
      photos: '',
      comment: ''
    }
  },
  mounted() {
    this.getPic()
  },
  methods: {
    getPic() {
      this.$http.get(this.globalData.domain + this.url + this.id).then((res) => {
        if (res.data.success) {
          this.photos = res.data.data.photos
          this.comment = res.data.data.comment
        }
      }, (err) => {
        console.log(err);
      })
    },
    deleteProject() {
      this.$emit('deleteItem', this.index, this.title, this.id)
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
  color: var(--darkColor);
  overflow: hidden;
}

.info h4 {
  font-family: Gotham-Medium;
  font-weight: 500;
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
  color: var(--blueGrey);
}



.status {
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  text-align: center;
  font-family: Gotham-Medium;
  font-weight: 500;
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

#reason .start {
  margin-top: 40px;
  padding: 16px 60px;
}
.modal .modal-content{
  padding: 24px;
}
@media (max-width: 767px) {
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
