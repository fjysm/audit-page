<template>
  <div class="searchbox">
    <div v-for="item in config" :span="6" :key="item.prop" class="box">
      <span>{{ item.label }}：</span>
      <el-input v-if="item.type === 'input'" v-model="param[item.value]" placeholder="请输入内容"/>
      <el-select v-if="item.type === 'select'" v-model="param[item.value]" placeholder="请选择">
        <el-option
          v-for="op in item.options"
          :key="op.value"
          :label="op.label"
          :value="op.value"/>
      </el-select>
      <el-time-select
        v-if="item.type === 'time'"
        v-model="param[item.value]"
        :picker-options="{
          start: '08:30',
          step: '00:15',
          end: '18:30'
        }"
        placeholder="选择时间"/>
      <el-date-picker
        v-if="item.type === 'date'"
        v-model="param[item.value]"
        type="date"
        placeholder="选择日期"/>
      <el-date-picker
        v-if="item.type === 'datetime'"
        v-model="param[item.value]"
        type="date"
        placeholder="选择日期"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchBox',
  props: {
    config: {
      type: Array,
      default: () => []
    },
    param: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    param: {
      handler(newVal, oldVal) {
        this.$emit('update:param', newVal)
      },
      deep: true
    }
  }
}
</script>

<style scoped lang="less">
.searchbox {
  display: flex;
  .box {
    display: flex;
    align-items: center;
    width: 300px;
    flex-wrap: nowrap;
    .el-input {
      width: 200px;
    }
  }
}

</style>
