<template>
  <div class="app-container" style="height: 100%">
    <div class="main">
      <header>123</header>

    </div>
  </div>
</template>

<script>
import MyTable from '../../components/Table/index'
export default {
  name: 'List',
  components: { MyTable },
  data() {
    return {
      list: []
    }
  },
  computed: {
    tableConfig() {
      return [
        {
          prop: 'date',
          label: '日期'
        },
        {
          prop: 'name',
          label: '名称'
        },
        {
          prop: 'analyis',
          label: '操作'
        }
      ]
    }
  }

}
</script>

<style scoped>

</style>
