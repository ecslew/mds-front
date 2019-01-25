<template>
<div class="project-container">
  <div class="container support">
    <h4 class="title">{{$t('support_list')}}</h4>
    <div class="subtitle">{{$t('support_list_subtitle')}}</div>
    <div class="dropdown">
      <p class="dropdown-toggle" data-toggle="dropdown"><span>{{gear}}</span><span class="tri"></span></p>
      <ul class="dropdown-menu">
        <li v-for="(item, index) in gearList" :key="index" @click="changeGear(item,index)">{{$t('gear'+(index+1))}}</li>
      </ul>
    </div>
    <div class="row support-list">
      <div class="hidden-xs">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>{{$t('numbering')}}</th>
              <th>{{$t('name')}}</th>
              <th>{{$t('contact')}}</th>
              <th>{{$t('address')}}</th>
              <th>{{$t('quantity')}}</th>
              <th>{{$t('gear')}}/{{$t('amount')}}</th>
              <th>{{$t('delivery_status')}}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in supportList" :key="item.id">
              <td>{{index+1}}</td>
              <td>{{item.name}}</td>
              <td>{{item.contact}}</td>
              <td>{{item.address}}</td>
              <td>{{item.quantity}}</td>
              <td class="price">{{$t('gear'+item.gear.list)}}<br>{{item.gear.amount}}</td>
              <td class="status">
                <span v-if="item.delivery_status==1">{{$t('delivery_status1')}}</span>
                <span v-else class="status0" @click="changeStatus(item)">{{$t('delivery_status0')}}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <ul class="hidden-sm hidden-md hidden-lg">
        <li v-for="(item,index) in supportList" :key="item.id">
          <div class="serial-number">{{index+1}}</div>
          <div class="support-info">
            <p>{{item.name}}</p>
            <p>{{item.address}}</p>
            <h5>{{$t('gear'+item.gear.list)}} : {{item.gear.amount}}</h5>
            <p>{{$t('quantity')}} : {{item.quantity}}</p>
            <p>{{item.contact}}</p>
          </div>
          <div class="status">
            <span v-if="item.delivery_status==1">{{$t('delivery_status1')}}</span>
            <span v-else class="status0" @click="changeStatus(item)">{{$t('delivery_status0')}}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      gear: this.$t('gear1'),
      gearList: [{
        sum: '10',
        unit: '2'
      }, {
        sum: '20',
        unit: '4'
      }, {
        sum: '30',
        unit: '8'
      }],
      supportList: [{
        name: 'xxx',
        contact: '18701939766',
        address: '上海市，浦东新区，高行镇高博璐 211 弄 西林雅苑  1 号楼 11808 室；',
        quantity: '1',
        gear: {
          list: '1',
          amount: '10 EOS'
        },
        delivery_status: '1'
      }]
    }
  },
  methods: {
    changeGear(item, index) {
      this.gear = this.$t('gear' + (index + 1))
      this.supportList = [{
          name: 'xxx',
          contact: '18701939766',
          address: '上海市，浦东新区，高行镇高博璐 211 弄 西林雅苑  1 号楼 11808 室；',
          quantity: '1',
          gear: {
            list: index + 1,
            amount: item.sum + ' EOS'
          },
          delivery_status: '1'
        }
      ]
    },
    changeStatus(item) {
      item.delivery_status = 1
    }
  }
}
</script>

<style scoped>
span {
  vertical-align: middle;
}

.support {
  padding: 40px 48px;
}

.dropdown {
  float: right;
  margin-top: 60px;
  border: 1px solid var(--light-grey-blue);
  padding: 16px 24px;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}

.dropdown-menu {
  width: 100%;
  text-align: center;
  min-width: auto;
  margin-top: 8px;
  border-color: var(--light-grey-blue);
  padding: 8px 0;
}

.dropdown-menu li {
  padding: 8px 4px;
  font-size: 16px;
}

.support-list {
  margin-top: 140px;
}

table tbody {
  display: block;
  height: calc(100vh - 510px);
  overflow-y: scroll;
}

table tr {
  display: table;
  width: 100%;
  table-layout: fixed;
  text-align: center;
}

.table>thead>tr>th {
  padding: 24px 24px 8px;
  border: none;
  border-bottom: 1px solid var(--paleBlue);
  color: var(--blueGrey);
  font-family: Gotham-Medium;
  font-weight: 500;
  text-align: center;
}

.table>tbody>tr>td {
  padding: 24px;
  color: #000;
  border: none;
  border-bottom: 1px solid var(--paleBlue);
}

.table>thead>tr>th:first-child,
.table>thead>tr>th:nth-child(5),
.table>tbody>tr>td:first-child,
.table>tbody>tr>td:nth-child(5) {
  width: 78px;
}

.table>thead>tr>th:last-child {
  width: 18%;
  padding-right: 4%;
}

.table-striped>tbody>tr:nth-of-type(odd) {
  background: #fff;
}

.table-striped>tbody>tr:nth-of-type(even) {
  background: var(--very-light-blue);
}

.status span {
  font-size: 16px;
  font-family: Gotham-Medium;
  font-weight: 500;
  color: var(--primaryColor);
  line-height: 24px;
  padding: 8px 16px;
  display: inline-block;
  min-width: 80px;
}

.status .status0 {
  background: var(--primaryColor);
  color: #FFF;
  border-radius: 4px;
  cursor: pointer;
}

.support-list ul {
  height: calc(100vh - 310px);
  overflow: scroll;
  border-top: 1px solid var(--paleBlue);
}

.support-list li {
  border-bottom: 1px solid var(--paleBlue);
  padding: 16px;
  position: relative;
  color: #000;
}

.serial-number {
  float: left;
  padding: 0 16px 0 8px;
}

.support-info {
  overflow: hidden;
}

.support-list li .status {
  position: absolute;
  right: 16px;
  bottom: 16px;
}

.support-list li p {
  margin-bottom: 8px;
}

.support-list li h5 {
  font-size: 14px;
  font-family: Gotham-Medium;
  font-weight: 500;
  margin: 16px 0 8px;
}

@media (max-width: 992px) {
  .table>thead>tr>th {
    padding: 16px 10px 8px;
  }

  .table>tbody>tr>td {
    padding: 16px 10px;
  }
}

@media (max-width: 767px) {
  .support {
    padding: 24px 15px;
  }

  .dropdown {
    margin-top: 24px;
  }

  .support-list {
    margin-top: 92px;
  }
}
</style>
