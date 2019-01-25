<template>
<baidu-map :center="center" :zoom="zoom" @ready="handler">
  <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
</baidu-map>
</template>

<script>
// import BMap from 'vue-baidu-map'
export default {
  data() {
    return {
      center: {
        lng: 0,
        lat: 0
      },
      zoom: 3
    }
  },
  mounted() {
    // var map = new BMap.Map("allmap");
    // var point = new BMap.Point(116.331398, 39.897445);
    // map.centerAndZoom(point, 12);

    // var geolocation = new BMap.Geolocation();
    // geolocation.getCurrentPosition(function (r) {
    //   if (this.getStatus() == BMAP_STATUS_SUCCESS) {
    //     var mk = new BMap.Marker(r.point);
    //     map.addOverlay(mk);
    //     map.panTo(r.point);
    //     alert('您的位置：' + r.point.lng + ',' + r.point.lat);
    //   } else {
    //     alert('failed' + this.getStatus());
    //   }
    // });
  },
  methods: {
    handler({
      BMap,
      map
    }) {
      console.log(BMap, map)
      this.center.lng = 116.404
      this.center.lat = 39.915
      this.zoom = 15
      BMap.locationSuccess = function (e) {
        console.log(e);

      }
    }
  }
}
</script>

<style>
.bm-view {
  width: 100%;
  height: 300px;
}
</style>
