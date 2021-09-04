import {request} from './request';

export function getList(list ,params){
  return request({
    url:`/${list}`,
    method:'get',
    params: params,
  })
}
//添加项目列表
export function addList(list, data){

  return request({
    url:`/${list}`,
    method:'post',
    data:data
  })
}
//删除项目列表
export function deleteList(list, id){

  return request({
    url:`/${list}/${id}`,
    method:'delete',
  })
}
//删除项目列表
export function deleteListByxqID(list, xqID){

  return request({
    url:`/${list}/${xqID}`,
    method:'delete',
  })
}

//修改项目列表
export function editList(list, id, data){

  return request({
    url:`/${list}/${id}`,
    method:'put',
    data:data
  })
}
export function editListByxqID(list, data){

  return request({
    url:`/${list}`,
    method:'put',
    data:data
  })
}

