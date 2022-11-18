<template>
  <div class="app-container">
    <el-row style="margin-bottom: 20px">
      <el-button type="primary" size="mini" icon="el-icon-search" @click="getList()">查询</el-button>
      <el-button type="danger" size="mini" @click="removeRows()">批量删除</el-button>
      <el-button type="primary" size="mini" @click="addOrgset()">新增</el-button>
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
              @click="lockHostSet(scope.row.id,0)">锁定</el-button>
            <el-button
              v-else
              type="danger"
              size="mini"
              icon="el-icon-close"
              @click="lockHostSet(scope.row.id,1)">取消锁定</el-button>
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
import orgset from '@/api/orgset'
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
        orgcode: '',
        orgname: ''
      },
      addForm: {
        orgname: '',
        orgcode: '',
        apiUrl: '',
        contactsName: '',
        contactsPhone: ''
      }
    }
  },
  computed: {
    tableConfig() {
      return [
        {
          prop: 'orgname',
          label: '审计机构名称'
        },
        {
          prop: 'orgcode',
          label: '审计机构编码'
        },
        {
          prop: 'apiUrl',
          label: 'api基础路径'
        },
        {
          prop: 'contactsName',
          label: '联系人'
        },
        {
          prop: 'contactsPhone',
          label: '联系人手机'
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
          label: '审计机构名称',
          value: 'orgname'
        },
        {
          type: 'input',
          label: '审计机构编码',
          value: 'orgcode'
        }
      ]
    },
    dialogConfig() {
      return [
        {
          type: 'input',
          label: '审计机构名称',
          value: 'orgname'
        },
        {
          type: 'input',
          label: '审计机构编号',
          value: 'orgcode'
        },
        {
          type: 'input',
          label: 'api基础路径',
          value: 'apiUrl'
        },
        {
          type: 'input',
          label: '联系人姓名',
          value: 'contactsName'
        },
        {
          type: 'input',
          label: '联系人手机',
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
      orgset.getOrgSetList(this.current, this.limit, this.searchParam)
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
      this.$confirm('此操作将永久删除审计机构设置信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => { // 确定执行then方法
        // 调用接口
        orgset.deleteOrgSet(id)
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
    removeRows() {
      const idList = []
      this.$refs.table.checkRows.forEach(item => {
        idList.push(item.id)
      })
      orgset.batchOrgSet(idList)
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
    lockHostSet(id, status) {
      orgset.lockOrgSet(id, status)
        .then(response => {
          // 刷新页面
          this.getList()
        })
    },
    addOrgset() {
      this.addDialog = !this.addDialog
      this.addForm = {}
    },
    // 添加
    save() {
      if (!this.addForm.id) {
        orgset.saveOrgtSet(this.addForm)
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
        orgset.updateOrgSet(this.addForm)
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
