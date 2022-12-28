import React, { useCallback, useEffect, useState } from 'react';
import { Modal, AutoComplete, Input, Form, Tag, Empty, message } from 'antd';
import { CloseOutlined }  from '@ant-design/icons';
import _ from 'lodash';

import { reqTagList, reqAddTag, reqDeleteTag } from '@api/admin';

interface TagModalProps {
  isModalVisible: boolean
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>
  tagList: { value: string, label: string }[]
  setTagList: React.Dispatch<React.SetStateAction<{ value: string, label: string }[]>>}

const TagModal: React.FC<TagModalProps> = props => {
  const { isModalVisible, tagList, setIsModalVisible, setTagList } = props

  const [tagOptions, setTagOptions] = useState<{ value: string, label: JSX.Element, name: string }[]>([])
  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    // 弹窗开启时，初始化并清空搜索内容
    if (isModalVisible) {
      setSearchText('')
      handleReqTagList()
    }
  }, [isModalVisible])

  // 获取Tag列表
  const handleReqTagList = async (search: string = '') => {
    const res = await reqTagList(search)
    const arr = res.data?.data
    const tags = arr.map((i: { _id: string, name: string }) => ({ value: i._id, label: renderTagOptionItem(i._id, i.name), name: i.name }))
    setTagOptions(tags)
  }

  // 防抖
  const debounceSearchTag = useCallback(
    _.debounce(async (value) => {
      handleReqTagList(value)
    }, 500)
  , [])

  // 搜索文本改变时，进行防抖搜索
  const handleSearchTag = async (value: string) => {
    setSearchText(value.trim())
    debounceSearchTag(value.trim())
  }

  // 添加标签到已选
  const handleSelectTag = (value: string, option: any) => {
    if (!tagList.some(i => i.value === value)) {
      setTagList(arr => [...arr, { value: option.value, label: option.name }])
    } else {
      message.error('该标签已添加')
    }
  }

  // 新增标签
  const handleAddTag = async (_: string, e: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLElement, MouseEvent> | React.KeyboardEvent<HTMLInputElement> | undefined) => {
    if (e) e.preventDefault()
    const res = await reqAddTag(searchText)
    if (res.data.status && res.data.status === 1) {
      message.success(res.data.message)
      setSearchText('')
      handleReqTagList()
      setTagList(arr => [...arr, { value: res.data.data._id, label: res.data.data.name }])
    }
  }

  // 删除标签
  const handleDeleteTag = (key: string, e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.stopPropagation()
    Modal.confirm({
      title: '删除标签',
      content: `确定删除这个标签吗？（所有文章中的该标签都将被删除）`,
      async onOk() {
        const res = await reqDeleteTag(key)
        if (res.data.status && res.data.status === 1) {
          message.success(res.data.message)
          // 删除已选标签中的该标签
          const temp = JSON.parse(JSON.stringify(tagList))
          for (let i = 0; i < temp.length; i++) {
            if (temp[i].value === key) {
              temp.splice(i, 1)
            }
          }
          setTagList(temp)
          setSearchText('')
          handleReqTagList()
        }
      }
    })
  }

  const renderTagOptionItem = (key: string, value: string) => (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      {value}
      <span onClick={(e) => handleDeleteTag(key, e)} style={{ cursor: 'pointer' }}>
        <CloseOutlined />
      </span>
    </div>
  )

  return (
    <Modal
      title="编辑标签"
      open={isModalVisible}
      width={420}
      footer={null}
      onCancel={() => setIsModalVisible(false)}
    >
      <AutoComplete
        value={searchText}
        style={{ width: '100%', margin: '10px 0' }}
        options={tagOptions}
        onSearch={handleSearchTag}
        onSelect={handleSelectTag}
        notFoundContent={<Empty />}
      >
        <Input.Search
          placeholder="输入内容进行搜索，点击新增可以新增标签"
          enterButton="新增"
          onSearch={handleAddTag}
        />
      </AutoComplete>

      <Form labelCol={{ span: 5 }} wrapperCol={{ span: 19 }}>
        <Form.Item label="已选标签">
          {
            tagList.length > 0 ?
              tagList.map(i => (
                <Tag closable key={i.value} style={{ marginBlock: '5px' }}>{i.label}</Tag>
              )) : '暂未选择'
          }
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TagModal;