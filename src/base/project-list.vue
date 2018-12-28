<template>
<router-link :to="{
          path: '/projectDetail',
          query: {
            id: id
          }
        }" class="program-list">
  <div class="list-pic" :style="{backgroundImage: 'url(' + picture +')'}"></div>
  <div class="info">
    <h4 style="-webkit-box-orient: vertical;">{{title}}</h4>
    <div class="complete">{{$t('complete')}}:{{complete}} EOS</div>
    <div class="time">{{$t('release_time')}}:{{time}}</div>
    </div>
</router-link>
</template>

<script>
export default {
  props: ['picture', 'title', 'complete', 'time', 'id']
}
</script>

<style scoped>
.program-list {
  display: block;
  box-shadow: 0 2px 8px rgba(175, 175, 175, 0.5);
  border-radius: 4px;
  overflow: hidden;
}

.list-pic {
  height: 240px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

.info {
  padding: 24px 16px;
  color: #2c363f;
}

.info h4 {
  font-size: 20px;
  font-weight: 400;
  height: 116px;
  padding-bottom: 32px;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.info .complete {
  font-weight: 600;
  font-family: Gotham-Medium;
  font-size: 16px;
  position: relative;
  padding: 12px 0 48px;
}

.info .complete:after {
  content: '';
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
  border-radius: 4px;
  border-top: 4px solid #00d102;
}

.info .time {
  color: #607d8b;
}
@media (max-width: 767px){
  .list-pic{
    height: 180px;
  }
  .info .complete{
    padding-bottom: 28px;
  }
  .info h4{
    height: auto;
  }
}
</style>
