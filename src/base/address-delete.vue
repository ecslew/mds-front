<template>
<div class="modal confirm-modal" id="deleteAddress">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span></button>
      <h4 class="modal-title">{{$t('delete_address')}}</h4>
      <p class="modal-info">{{$t('delete_address_info')}}</p>
      <div class="btn-contain clearfix">
        <span data-dismiss="modal">{{$t('cancel')}}</span>
        <span @click="deleteAddress" data-dismiss="modal">{{$t('determine')}}</span>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: ['index', 'id'],
  methods: {
    deleteAddress() {
      this.$emit('deleteAddress', this.index, this.id)
    }
  }
}
</script>

<style scoped>

</style>
