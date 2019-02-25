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
    <div class="progress">
      <p class="progress-bar" :style="'width:'+parseFloat(amount/targetAmount*100)+'%'"></p>
    </div>
    <div class="complete">{{$t('complete')}}: {{targetAmount}} {{targetToken}}</div>
    <div class="time">{{$t('release_time')}}: {{time.slice(0,10)}}</div>
  </div>
</router-link>
</template>

<script>
export default {
  props: ['picture', 'title', 'targetAmount', 'amount', 'time', 'id', 'targetToken']
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
  box-shadow: 0 4px 6px rgba(0,0,0,0.02);
}

.info {
  padding: 24px 16px;
  color: var(--darkColor);
}

.info h4 {
  font-size: 20px;
  font-weight: 400;
  height: 4.2em;
  margin-bottom: 32px;
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
  font-weight: 500;
  font-size: 16px;
  padding: 8px 0 48px;
}

.info .time {
  color: var(--blueGrey);
}

@media (max-width: 767px) {
  .list-pic {
    height: 180px;
  }

  .info .complete {
    padding-bottom: 28px;
  }

  .info h4 {
    height: auto;
  }
}
</style>
