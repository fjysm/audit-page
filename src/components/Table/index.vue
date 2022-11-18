<template>
  <div style="margin-top: 20px">
    <el-table
      :data="data"
      stripe
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        v-if="check"
        type="selection"
        width="55"
      />
      <el-table-column
        v-if="index"
        type="index"
        label="序号"
      />
      <el-table-column
        v-for="col in config"
        :key="col.prop"
        :prop="col.prop"
        :label="col.label"/>
      <slot name="operate"/>
    </el-table>
    <div v-if="page" class="page">
      <el-pagination
        :current-page="current"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="size"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"/>
    </div>
  </div>
</template>
<script>
export default {
  name: 'MyTable',
  props: {
    data: {
      type: Array,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: []
    },
    config: {
      type: Array,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: []
    },
    index: {
      type: Boolean,
      default: false
    },
    check: {
      type: Boolean,
      default: false
    },
    current: {
      type: Number,
      default: 1
    },
    size: {
      type: Number,
      default: 10
    },
    total: {
      type: Number,
      default: 0
    },
    page: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      checkRows: []
    }
  },
  methods: {
    handleSizeChange(val) {
      this.$emit('update:size', val)
    },
    handleCurrentChange(val) {
      this.$emit('update:current', val)
    },
    handleSelectionChange(selections) {
      this.checkRows = selections
    }
  }
}
</script>

<style scoped>
.page {
  position: fixed;
  bottom: 2%;
}

</style>
