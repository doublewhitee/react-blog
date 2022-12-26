import { instance } from './request';

export function reqTagList (search: string) {
  return instance({
    url: '/admin/tag-list',
    method: 'get',
    params: { search }
  })
}

export function reqAddTag (name: string) {
  return instance({
    url: '/admin/tag-create',
    method: 'post',
    data: { name }
  })
}

export function reqDeleteTag (id: string) {
  return instance({
    url: '/admin/tag-delete',
    method: 'post',
    data: { id }
  })
}