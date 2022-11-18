import request from '@/utils/request'

export default {
  getTemplateList(current, limit, searchObj) {
    return request({
      url: `/admin/cmn/template/findPage/${current}/${limit}`,
      method: 'post',
      data: searchObj
    })
  },
  deleteTemplate(id) {
    return request({
      url: `/admin/cmn/template/${id}`,
      method: 'delete'
    })
  },
  // 批量删除
  batchTemplate(idList) {
    return request({
      url: `/admin/cmn/template/batchRemove`,
      method: 'delete',
      data: idList
    })
  },
  // 锁定模板
  lockTemplate(id, status) {
    return request({
      url: `/admin/cmn/template/lockTemplate/${id}/${status}`,
      method: 'put'
    })
  },
  // 添加模板
  saveTemplate(template) {
    return request({
      url: `/admin/cmn/template/saveTemplate`,
      method: 'post',
      data: template
    })
  },
  // 修改模板设置
  updateTemplate(template) {
    delete template.status
    return request({
      url: `/admin/cmn/template/editTemplate`,
      method: 'post',
      data: template
    })
  }

}
