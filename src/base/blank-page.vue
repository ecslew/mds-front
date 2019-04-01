<template>
<div class="blank-page">
  <p>{{$t("no_project")}}</p>
  <router-link to="/projectStep"><span>{{$t("to_publish_projects")}}</span></router-link>
</div>
</template>

<script>
export default {

}
</script>

<style>
.blank-page {
  padding: 80px 0 100px;
  color: var(--blueGrey);
  font-size: 16px;
  text-align: center;
}

.blank-page>a {
  color: var(--blueColor) !important;
  padding: 8px 0;
  display: block;
}

.blank-page span {
  vertical-align: middle;
}
</style>
