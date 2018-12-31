<template>
<!-- 联系我们 -->
<div class="contact">
  <a href="mailto:hello@medishares.org" class="container">
    <div class="icon">👏</div>
    <div class="contact-info">
      <h4>Like what we are building?</h4>
      <p>Welcome mutual aid organization, inclusive finance organization and volunteer contact us! Send Email to us:hello@medishares.org </p>
    </div>
  </a>
</div>
</template>
<script>
export default {

}
</script>
<style scoped>
.contact{
  background: #00d102;
  padding: 32px 0;
}
.contact a{
  color: #fff;
  font-size: 20px;
  line-height: 1.2;
  display: block;
  position: relative;
  padding-left: 92px;
  max-width: 800px;
}
.contact .icon{
  width: 68px;
  height: 68px;
  font-size:36px;
  padding: 17px 0 0 15px;
  border-radius: 50%;
  background: #fff;
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
}
h4{
  font-size: 32px;
  padding-bottom: 8px;
  font-family: Gotham-Medium;
  line-height: 1;
}
</style>
