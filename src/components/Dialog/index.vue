<template>
  <div>
    <el-dialog
      :before-close="handleClose"
      :visible.sync="visible"
      title="提示"
      width="30%">
      <el-form :model="form" label-position="right" label-width="100px" inline >
        <el-form-item v-for="item in formConfig" :key="item.value" :label="item.label">
          <el-input v-model="form[item.value]" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cacelOp()">取 消</el-button>
        <el-button type="primary" @click="confirm()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'MyDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    formConfig: {
      type: Array,
      default: () => []
    },
    form: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
    }
  },
  watch: {
    form: {
      handler(newVal, oldVal) {
        this.$emit('update:form', newVal)
      },
      deep: true
    }
  },
  methods: {
    cacelOp() {
      this.$emit('update:visible', false)
    },
    confirm() {
      this.$emit('confirm')
    },
    handleClose() {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style scoped>

</style>
