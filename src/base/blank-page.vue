<template>
<div class="blank-page">
  <p>{{$t("no_project")}}</p>
  <router-link to="/projectRelease"><span>{{$t("to_publish_projects")}}</span><img src="static/img/icon/guide.png" width="26"></router-link>
</div>
</template>

<script>
export default {

}
</script>

<style>
.blank-page{
  padding: 120px 0 60px;
  color: #607d8b;
  font-size: 16px;
  text-align: center;
}
.blank-page>a{
  color: #2196f3;
  padding: 8px 0;
    display: block;
}
.blank-page span{
  vertical-align: middle;
}
</style>
