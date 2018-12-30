<template>
<div class='create-project project-container' >
  <div class="container text-center">
    <h4 class="title">{{$t('create_project')}}</h4>
    <div class="subtitle">{{$t('create_project_subtitle')}}</div>
    <div class='img'>
      <img src="static/img/icon/web_icon_fundraising.png">
    </div>
    <router-link to="/projectRelease" class="start">{{$t('publish_project')}}</router-link>
  </div>
</div>
</template>

<script>
export default {

}
</script>

<style scoped>

.img{
  margin:152px 0 96px;
}
.img img{
  width: 224px;
}
@media (max-width: 767px){
  .img{
    margin:76px 0 48px;
  }
  .img img{
    width: 140px;
  }
}
</style>
