import React, { useState, useEffect, useRef } from 'react';
import { Button, Space, Input, Modal, Form, Upload, Switch, Select, Tag, Divider, message, UploadFile } from 'antd';
import { PlusOutlined, LoadingOutlined }  from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';
import { RcFile, UploadRequestOption } from 'rc-upload/lib/interface'
import Vditor from 'vditor';
import 'vditor/src/assets/less/index.less';

import TagModal from './Components/TagModal';

import { useAppSelector } from '@redux/hooks';
import { uploadFile } from '@api/upload';
import { picHostInfo } from '@config/index';
import { reqCategoryList, reqAddCategory } from '@api/admin';

import './index.less';

const Work: React.FC = () => {
  const isDarkMode = useAppSelector(state => state.user.isDarkMode)
  const [form] = Form.useForm()

  const containerRef = useRef<HTMLDivElement | null>(null)
  const [title, setTitle] = useState('') // 文章标题
  const [vd, setVd] = useState<Vditor>()
  const [content, setContent] = useState('开始编辑文章内容 `Example`')
  const [isModalVisible, setIsModalVisible] = useState(false) // 发布文章Modal
  const [isTagModalVisible, setIsTagModalVisible] = useState(false) // 添加标签Modal
  const [fileList, setFileList] = useState<UploadFile[]>([]) // 上传文件列表
  const [uploadLoading, setUploadLoading] = useState(false)
  const [categoryOptions, setCategoryOptions] = useState<{ value: string, label: string }[]>([])
  const [categoryNameValue, setCategoryNameValue] = useState('')
  const [tagList, setTagList] = useState<{ value: string, label: string }[]>([])

  useEffect(() => {
    if (containerRef) {
      const height = containerRef.current?.offsetHeight || 500
      const vditor = new Vditor('vditor', {
        width: '100%',
        height: height - 180,
        theme: 'dark',
        toolbar: [
          'emoji', 'headings', 'bold', 'italic', 'strike', 'link', '|',
          'list', 'ordered-list', 'check', 'outdent', 'indent', '|',
          'quote', 'line', 'code', 'inline-code', '|',
          'table', '|',
          'undo', 'redo',
          {
            name: 'more',
            toolbar: [ 'both', 'edit-mode', 'outline' ],
          },
      ],
        after: () => {
          vditor.setValue(content)
          setVd(vditor)
        }
      })
    }
  }, [containerRef, content])

  // 根据主题切换修改vditor主题
  useEffect(() => {
    if (vd) {
      if (isDarkMode) {
        vd.setTheme('dark', 'dark')
      } else {
        vd.setTheme('classic', 'light')
      }
    }
  }, [isDarkMode, vd])

  // 开启Modal时请求分类列表，并设置options
  useEffect(() => {
    if (isModalVisible) {
      handleReqCategoryList()
      // 清空之前填写的信息
      form.setFieldsValue({ cover: undefined, category: undefined, lock: false })
      setTagList([])
    }
  }, [isModalVisible])

  // beforeCrop中进行png格式校验
  const handleBeforeCrop = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      message.error('请上传JPG/PNG格式文件')
      // 清空fileList
      setFileList([])
      form.setFieldValue('cover', undefined)
      return false
    }
    return true
  }

  // 上传图片
  const handleUploadImg = async (options: UploadRequestOption<any>) => {
    const { file, onSuccess, onError } = options
    // 设置文件名格式：[文件名]_[时间戳].文件类型
    const nameArr = (file as RcFile).name.split('.')
    const type = nameArr.pop()!
    const name = nameArr.join('')
    const newFileName = `${name}_${(new Date()).valueOf()}.${type}`
    // 转为Base64格式
    const reader = new FileReader()
    reader.readAsDataURL(file as Blob)
    reader.onloadend = async () => {
      setUploadLoading(true)
      // Base64内容
      const content = reader.result ? (reader.result as string).split(',')[1] : ''
      const res = await uploadFile(newFileName, content)
      if (res.status === 201) {
        message.success('上传图片成功')
        onSuccess!(file)
        // 成功后设置fileList及form中的值
        const temp: UploadFile = file as UploadFile
        temp.thumbUrl = picHostInfo.baseAddr + newFileName
        temp.url = picHostInfo.baseAddr + newFileName
        form.setFieldValue('cover', picHostInfo.baseAddr + newFileName)
        setFileList([file as UploadFile])
      } else {
        message.error('上传图片失败')
        onError!(new Error('上传图片失败'))
        // 清空fileList
        setFileList([])
        form.setFieldValue('cover', undefined)
      }
      setUploadLoading(false)
    }
  }

  // 获取分类列表
  const handleReqCategoryList = async () => {
    const res = await reqCategoryList()
    const data = res.data.data
    const options: { value: string, label: string }[] = []
    data.map((i: { name: string, _id: string }) => options.push({ value: i._id, label: i.name }))
    setCategoryOptions(options)
  }

  // 新增分类
  const handleAddCategory = async () => {
    if (categoryNameValue.trim().length === 0) {
      message.error('分类名不能为空')
    } else {
      const res = await reqAddCategory(categoryNameValue.trim())
      if (res.data.status && res.data.status === 1) {
        message.success(res.data.message)
        handleReqCategoryList()
        setCategoryNameValue('')
      }
    }
  }

  const handleSubmit = () => {
    console.log(form.getFieldsValue())
    form.validateFields()
  }

  return (
    <div className="admin-work" ref={containerRef}>
      <Input
        value={title}
        size="large"
        placeholder="请输入文章标题（1-100个字）"
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className="admin-work-editor">
        <div id="vditor" className="vditor" />
      </div>

      <div>
        <Space>
          <Button>保存草稿</Button>
          <Button type="primary" onClick={() => setIsModalVisible(true)}>发布文章</Button>
        </Space>
      </div>

      <Modal
        title="发布文章"
        open={isModalVisible}
        okText="发布"
        onCancel={() => setIsModalVisible(false)}
        onOk={handleSubmit}
      >
        <Form form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 14 }}>
          <Form.Item name="cover" label="封面图" valuePropName="fileList">
            <ImgCrop grid aspect={5 / 2} beforeCrop={handleBeforeCrop}>
              <Upload
                accept=".png, .jpg"
                customRequest={handleUploadImg}
                listType="picture-card"
                fileList={fileList}
                maxCount={1}
                onRemove={() => { setFileList([]); form.setFieldValue('cover', undefined); }}
              >
                <div>
                  {uploadLoading ? <LoadingOutlined /> : <PlusOutlined />}
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              </Upload>
            </ImgCrop>
          </Form.Item>

          <Form.Item name="category" label="分类" rules={[{ required: true, message: '请选择分类' }]}>
            <Select
              options={categoryOptions}
              showSearch
              optionFilterProp="label"
              dropdownRender={(menu) => (
                <>
                  {menu}
                  <Divider style={{ margin: '8px 0' }} />
                  <Space style={{ padding: '0 8px 4px' }}>
                    <Input value={categoryNameValue} placeholder="请输入分类名" onChange={(e) => setCategoryNameValue(e.target.value)} />
                    <Button type="text" icon={<PlusOutlined />} onClick={handleAddCategory}>
                      新增分类
                    </Button>
                  </Space>
                </>
              )}
            />
          </Form.Item>

          <Form.Item
            label="标签"
            name="tags"
            required
            wrapperCol={{ span: 20 }}
            rules={[
              { validator: async () => {
                if (tagList.length === 0) throw new Error('至少选择一个标签')
              }}
            ]}
          >
            <>
              {tagList.map(i => (
                <Tag closable key={i.value} style={{ marginBlock: '5px' }}>{i.label}</Tag>
              ))}
              <Tag style={{ cursor: 'pointer' }} onClick={() => setIsTagModalVisible(true)}>
                <PlusOutlined />添加标签
              </Tag>
            </>
          </Form.Item>

          <Form.Item name="lock" label="仅自己可见" valuePropName="checked" initialValue={false}>
            <Switch />
          </Form.Item>
        </Form>
      </Modal>

      <TagModal
        isModalVisible={isTagModalVisible}
        setIsModalVisible={setIsTagModalVisible}
        tagList={tagList}
        setTagList={setTagList}
      />
    </div>
  );
};

export default Work;