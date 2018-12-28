<template>
<div class='project-steps project-container'>
  <div class="container">
    <div class="row">
      <div class="col-sm-offset-1 col-sm-10">
        <h4 class="title">{{$t('edit_project_details')}}</h4>
        <div class="subtitle">{{$t('create_project_steps')}}</div>
        <ul class='steps'>
          <li class="active">
            <router-link to="/projectBasic">
              <div class="list">1</div>
              <div class="step-mess">{{$t('create_project_steps1')}}</div>
            </router-link>
          </li>
          <li>
            <router-link to="/projectBasic">
              <div class="list">2</div>
              <div class="step-mess">{{$t('create_project_steps2')}}</div>
            </router-link>
          </li>
          <li>
            <div class="list">√</div>
            <div class="step-mess">{{$t('create_project_steps3')}}</div>
          </li>
        </ul>
        <div class="text-right">
          <router-link to="/projectBasic" class="start">{{$t('release')}}</router-link>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {

}
</script>

<style scoped>
.steps {
  padding: 64px 0;
  margin: 16px 0 64px;
  border-bottom: 1px solid #f2f5f6;
}

.steps li {
  padding-bottom: 84px;
  position: relative;
  font-family: Gotham-Medium;
}

.steps li:after {
  content: '';
  position: absolute;
  top: 0;
  left: 33.5px;
  height: 100%;
  border-left: 1px solid #a9b9c1;

}

.steps li:last-child {
  padding: 0;
}

.steps li:last-child:after {
  display: none;
}

.steps .list {
  float: left;
  width: 68px;
  height: 68px;
  line-height: 68px;
  text-align: center;
  border-radius: 50%;
  border: 1px solid #a9b9c1;
  margin-right: 32px;
  box-shadow: 0 0 0 4px #fff;
  position: relative;
  z-index: 10;
  background: #fff;
  font-size: 26px;
  color: #a9b9c1;
}

.step-mess {
  color: #a9b9c1;
  overflow: hidden;
  line-height: 1.43;
  border: 1px solid #a9b9c1;
  border-radius: 4px;
  padding: 24px;
}

.steps li:last-child .step-mess {
  border: none;
}

.active .list,
.active .step-mess {
  border-color: #2c363f;
  color: #2c363f;
}

.active .step-mess {
  background: url('../../static/img/icon/web_icon_ok.png')no-repeat 97% center/24px;
}

@media (max-width: 767px) {
  .steps{
    margin: 0;
  }
  .steps li{
    padding-bottom: 50px;
  }
  .steps .list {
    width: 40px;
    height: 40px;
    line-height: 40px;
    margin-right: 12px;
    font-size: 18px;
  }

  .steps li:after {
    left: 19.5px;
  }
  .step-mess{
    padding: 8px 30px 8px 8px;
  }
}
</style>
