<template>
  <div class="app-container">
    <el-row style="margin-bottom: 20px">
      <el-button type="primary" size="mini" icon="el-icon-search" @click="getList()">查询</el-button>
      <el-button type="danger" size="mini" @click="removeRows()">批量删除</el-button>
      <el-button type="primary" size="mini" @click="addTemplate()">新增</el-button>
    </el-row>
    <SearchBox :config="searchConfig" :param="searchParam"/>
    <MyTable ref="table" :data="list" :config="tableConfig" :current.sync="current" :size.sync="limit" :total="total" index check>
      <template slot="operate">
        <el-table-column label="操作" width="280" align="center">
          <template slot-scope="scope">
            <el-button
              type="danger"
              size="mini"
              icon="el-icon-delete"
              @click="removeDataById(scope.row.id)"/>
            <el-button
              v-if="scope.row.status==='可用'"
              type="primary"
              size="mini"
              icon="el-icon-check"
              @click="lockTemplate(scope.row.id,0)">锁定</el-button>
            <el-button
              v-else
              type="danger"
              size="mini"
              icon="el-icon-close"
              @click="lockTemplate(scope.row.id,1)">取消锁定</el-button>
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
              @click="update(scope.row)"/>
          </template>
        </el-table-column>
      </template>
    </MyTable>
    <MyDialog :visible.sync="addDialog" :form.sync="addForm" :form-config="dialogConfig" @confirm="save"/>
  </div>
</template>

<script>
import template from '@/api/template'
import MyTable from '../../components/Table/index'
import SearchBox from '../../components/SearchBox/index'
import MyDialog from '../../components/Dialog/index'

export default {
  components: { MyDialog, SearchBox, MyTable },
  data() {
    return {
      addDialog: false,
      current: 1,
      limit: 10,
      list: [],
      total: 0,
      searchParam: {
        template_code: '',
        template_name: ''
      },
      addForm: {
        dataname: '',
        datacode: '',
        contactsName: '',
        contactsPhone: '',
        type: ''
      }
    }
  },
  computed: {
    tableConfig() {
      return [
        {
          prop: 'templateName',
          label: '模板名称'
        },
        {
          prop: 'templateCode',
          label: '模板编码'
        },
        {
          prop: 'contactsName',
          label: '负责人'
        },
        {
          prop: 'contactsPhone',
          label: '联系人手机'
        },
        {
          prop: 'type',
          label: '类型'
        },
        {
          prop: 'version',
          label: '版本'
        },
        {
          prop: 'status',
          label: '状态'
        }
      ]
    },
    searchConfig() {
      return [
        {
          type: 'input',
          label: '模板名称',
          value: 'templateName'
        },
        {
          type: 'input',
          label: '模板编码',
          value: 'templateCode'
        }
      ]
    },
    dialogConfig() {
      return [
        {
          type: 'input',
          label: '模板名称',
          value: 'templateName'
        },
        {
          type: 'input',
          label: '模板编号',
          value: 'templateCode'
        },
        {
          type: 'input',
          label: '类型',
          value: 'type'
        },
        {
          type: 'input',
          label: '版本',
          value: 'version'
        },
        {
          type: 'input',
          label: '负责人姓名',
          value: 'contactsName'
        },
        {
          type: 'input',
          label: '负责人手机',
          value: 'contactsPhone'
        }
      ]
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      template.getTemplateList(this.current, this.limit, this.searchParam)
        .then(response => {
          this.list = response.data.records.map(item => {
            item.status = item.status === 1 ? '可用' : '不可用'
            return item
          })
          this.total = response.data.total
        })
        .catch(error => {
          console.log(error)
        })
    },
    removeDataById(id) {
      this.$confirm('此操作将永久删除该模板, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => { // 确定执行then方法
        // 调用接口
        template.deleteTemplate(id)
          .then(response => {
            // 提示
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            // 刷新页面
            this.getList()
          })
      })
    },
    lockTemplate(id, status) {
      template.lockTemplate(id, status)
        .then(response => {
          // 刷新页面
          this.getList()
        })
    },
    removeRows() {
      const idList = []
      this.$refs.table.checkRows.forEach(item => {
        idList.push(item.id)
      })
      template.batchTemplate(idList)
        .then(response => {
          // 提示
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          // 刷新页面
          this.getList()
        })
    },
    addTemplate() {
      this.addDialog = !this.addDialog
      this.addForm = {}
    },
    // 添加
    save() {
      if (this.addForm.id === undefined) {
        template.saveTemplate(this.addForm)
          .then(response => {
            // 提示
            this.$message({
              type: 'success',
              message: '添加成功!'
            })
            this.addDialog = false
            this.getList()
          })
      } else {
        template.updateTemplate(this.addForm)
          .then(response => {
            // 提示
            this.$message({
              type: 'success',
              message: '修改成功!'
            })
            this.addDialog = false
            this.getList()
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    // 修改
    update(row) {
      this.addDialog = !this.addDialog
      this.addForm = { ...row }
    }
  }

}
</script>

<style scoped>

</style>
