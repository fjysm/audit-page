<template>
  <div class="app-container" style="height: 100%">
    <div class="main">
      <el-steps :active="1">
        <el-step title="1:上传EXCEL文件" icon="el-icon-upload"/>
        <el-step title="2：数据预览" icon="el-icon-tickets"/>
      </el-steps>
      <div class="upload">
        <div class="file">
          <el-upload
            class="upload-demo"
            drag
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple>
            <i class="el-icon-upload"/>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </div>
        <div class="introduction">
          <ul>
            <li>导入说明：</li>
            <li>1、支持xls、xlsx、csv等格式</li>
            <li>2、不能合并单元格</li>
            <li>3、第1行是标题不能缺失</li>
            <li>4、文件在10M内，最高5万行，1024列</li>
            <li> 5、日期字段需包含年月日（如2021/1/1），或
            年月日时分秒（如2021/1/1 00:00:00）</li>
          </ul>
        </div>
        <div class="example">
          <MyTable ref="table" :data="list" :config="tableConfig" :page="false" />
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import MyTable from '../../components/Table/index'
export default {
  name: 'Index',
  components: { MyTable },
  data() {
    return {
      list: [
        {
          first: '姓名',
          second: '性别',
          third: '年龄',
          four: '学历',
          five: '年收入',
          six: '日期'
        },
        {
          first: '1',
          second: '1',
          third: '3',
          four: '2',
          five: '2',
          six: '2'
        },
        {
          first: '2',
          second: '1',
          third: '2',
          four: '2',
          five: '3',
          six: '2'
        },
        {
          first: '3',
          second: '1',
          third: '2',
          four: '4',
          five: '2',
          six: '2'
        },
        {
          first: '4',
          second: '2',
          third: '1',
          four: '1',
          five: '1',
          six: '2'
        }
      ]
    }
  },
  computed: {
    tableConfig() {
      return [
        {
          prop: 'first',
          label: '第1列'
        },
        {
          prop: 'second',
          label: '第2列'
        },
        {
          prop: 'third',
          label: '第3列'
        },
        {
          prop: 'four',
          label: '第4列'
        },
        {
          prop: 'five',
          label: '第5列'
        },
        {
          prop: 'sex',
          label: '第6列'
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  padding: 5% 20%;
  height: 100%;
  background-color: rgb(235,238,245);
  .upload {
    display: grid;
    grid-template-columns: 60% 40%;
    grid-template-rows: 50% 50%;
    grid-template-areas:
		"file introduction"
		"example example";
  }
  .file {
    grid-area: file;

  }
  .introduction {
    grid-area: introduction;
  }
  .example {
    grid-area: example;
    background-color: #1482f0;
  }
}
ul li {
  list-style: none;
}

</style>
