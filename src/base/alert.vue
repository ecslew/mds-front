<template>
<div>
  <div class="modal text-center" id="alert">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">{{title}}</h4>
        <div class="alertInfo">{{info}}</div>
        <div class="start" data-dismiss="modal">{{$t('determine')}}</div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'alertModal',
  props: ['title', 'info']
}
</script>

<style scoped>
.modal-dialog {
  width: 280px !important;
}
#alert .modal-content{
  padding: 24px;
}
.alertInfo {
  padding: 24px;
  font-family: Gotham-Medium;
  font-weight: 500;
  font-size: 16px;
}

.start {
  display: block;
  margin: 30px 0 0;
  padding: 10px 50px;
}
</style>
