<template>
  <div class="home">
    <div class="mds-top">
      <div class="container">
        <div class="title">{{$t('title')}}</div>
        <div class="slogan">{{$t('slogan')}}</div>
        <a href="javascript:;" class="start" @click="createProject">{{$t('start_project')}}</a>
      </div>
    </div>
    <!-- All mutual aid programs -->
    <div class="aid-programs">
      <div class="container">
        <div class="mds-title">{{$t('programs_title')}}</div>
        <ul class="row project-list">
          <li class="col-sm-4 col-xs-12" v-for="item in programs" :key="item.id">
            <project-list
              :id="item.eosID"
              :picture="item.img"
              :title="item.title"
              :targetAmount="item.targetAmount"
              :amount="item.reciveAmount"
              :time="item.releaseTime"
              :targetToken="item.targetToken"
            ></project-list>
          </li>
        </ul>
        <router-link to="/project" class="see-more">{{$t('see_more')}}</router-link>
      </div>
    </div>
    <contact></contact>
    <foot></foot>
    <loading v-if="!isLoaded"></loading>
    <mds-toast :toastInfo="toastInfo" :isWarn="isWarn" @toast="infoByToast"></mds-toast>
  </div>
</template>

<script>
import loading from "@/base/loading";
import projectList from "@/base/project-list";
import contact from "@/base/contact";
import foot from "@/base/foot";
import user from "static/js/user";
import mdsToast from "@/base/toast";
export default {
  data() {
    return {
      url: "/apiCrowdfunding/homePage?page=1",
      transferUrl: "/apiEos/getCrowdfundingTransfer?account=",
      programs: [],
      isLoaded: false,
      toastInfo: "",
      isWarn: true
    };
  },
  mounted() {
    this.getPrograms();
  },
  methods: {
    infoByToast: function(val) {
      this.toastInfo = val;
    },
    getPrograms() {
      this.$http.get(this.globalData.domain + this.url).then(
        res => {
          if (res.data.success) {
            this.isLoaded = true;
            const pageData = res.data.data.pageData.slice(0, 3);
            this.programs = pageData;
          }
        },
        err => {
          console.log("err" + err);
        }
      );
    },
    createProject() {
      user.getAccount().then(
        res => {
          $(".currentAccount").html(res.name);
          $("#login").modal("hide");
          $(".login").hide();
          $(".personal").show();
          this.$router.push("/projectStep");
        },
        () => {
          // 未安装 scatter 或 登录失败
          this.toastInfo = this.$t("connect_scatter");
        }
      );
    }
  },
  components: {
    contact,
    foot,
    projectList,
    loading,
    mdsToast
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
.project-list li {
  margin-bottom: 32px;
}
.program-list {
  display: block;
  box-shadow: 0 2px 8px rgba(175, 175, 175, 0.5);
  border-radius: 4px;
  overflow: hidden;
}
.no-progress {
  height: 4px;
}
.list-pic {
  height: 240px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.02);
}

.info {
  padding: 24px 16px;
  color: var(--darkColor);
}

.info h4 {
  font-size: 20px;
  font-weight: 400;
  height: 4.2em;
  margin-bottom: 32px;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.info .info-title {
  font-size: 20px;
  font-weight: 400;
  height: 4.2em;
  margin-bottom: 32px;
  line-height: 1.4;
}
.info .complete {
  font-weight: 600;
  font-family: Gotham-Medium;
  font-weight: 500;
  font-size: 16px;
  padding: 8px 0 48px;
}

.info .time {
  color: var(--blueGrey);
}

@media (max-width: 767px) {
  .list-pic {
    height: 180px;
  }

  .info .complete {
    padding-bottom: 28px;
  }

  .info h4 {
    height: auto;
  }
}
</style>
