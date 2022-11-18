import request from '@/utils/request'

export default {
  getOrgSetList(current, limit, searchObj) {
    return request({
      url: `/admin/org/orgSet/findPage/${current}/${limit}`,
      method: 'post',
      data: searchObj
    })
  },
  deleteOrgSet(id) {
    return request({
      url: `/admin/org/orgSet/${id}`,
      method: 'delete'
    })
  },
  // 批量删除
  batchOrgSet(idList) {
    return request({
      url: `/admin/org/orgSet/batchRemove`,
      method: 'delete',
      data: idList
    })
  },
  // 锁定医院
  lockOrgSet(id, status) {
    return request({
      url: `/admin/org/orgSet/lockOrgSet/${id}/${status}`,
      method: 'put'
    })
  },
  // 添加医院
  saveOrgtSet(orgSet) {
    return request({
      url: `/admin/org/orgSet/saveOrgSet`,
      method: 'post',
      data: orgSet
    })
  },
  // 修改医院设置
  updateOrgSet(orgSet) {
    delete orgSet.status
    return request({
      url: `/admin/org/orgSet/editOrgSet`,
      method: 'post',
      data: orgSet
    })
  }

}
