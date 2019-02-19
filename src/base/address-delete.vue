<template>
<div class="modal confirm-modal" id="deleteAddress">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
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
  mounted() {
    $('#deleteAddress').on('shown.bs.modal', function () {
      $('.modal-backdrop:eq(1)').css('z-index', '1052')
    })
  },
  methods: {
    deleteAddress() {
      this.$emit('deleteAddress', this.index, this.id)
    }
  }
}
</script>

<style scoped>
#deleteAddress {
  z-index: 1060;
}
</style>
