import './style.scss'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import 'jodit'
import 'jodit/build/jodit.min.css'
import JoditEditor from 'jodit-react'
import './style.scss'
import { Form, Col, Row, Input, Select, Button, notification } from 'antd'
import { getProductList } from '../../../redux/product.slice'
import { getNewsDetail, editNews } from '../../../redux/news.slice'
import { addNews } from '../../../redux/news.slice'
import history from '../../../utils/history'
import { useLocation } from 'react-router'
import Loading from '../../../components/User/Loading'

const copyStringToClipboard = function (str) {
  var el = document.createElement('textarea')
  el.value = str
  el.setAttribute('readonly', '')
  el.style = { position: 'absolute', left: '-9999px' }
  document.body.appendChild(el)
  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)
}

const facilityMergeFields = [
  'FacilityNumber',
  'FacilityName',
  'Address',
  'MapCategory',
  'Latitude',
  'Longitude',
  'ReceivingPlant',
  'TrunkLine',
  'SiteElevation'
]
const inspectionMergeFields = ['InspectionCompleteDate', 'InspectionEventType']
const createOptionGroupElement = (mergeFields, optionGrouplabel) => {
  let optionGroupElement = document.createElement('optgroup')
  optionGroupElement.setAttribute('label', optionGrouplabel)
  for (let index = 0; index < mergeFields.length; index++) {
    let optionElement = document.createElement('option')
    optionElement.setAttribute('class', 'merge-field-select-option')
    optionElement.setAttribute('value', mergeFields[index])
    optionElement.text = mergeFields[index]
    optionGroupElement.appendChild(optionElement)
  }
  return optionGroupElement
}
const buttons = [
  'undo',
  'redo',
  '|',
  'bold',
  'strikethrough',
  'underline',
  'italic',
  '|',
  'superscript',
  'subscript',
  '|',
  'align',
  '|',
  'ul',
  'ol',
  'outdent',
  'indent',
  '|',
  'font',
  'fontsize',
  'brush',
  'paragraph',
  '|',
  'image',
  'link',
  'table',
  '|',
  'hr',
  'eraser',
  'copyformat',
  '|',
  'fullsize',
  'selectall',
  'print',
  '|',
  'source',
  '|',
  {
    name: 'insertMergeField',
    tooltip: 'Insert Merge Field',
    iconURL: 'images/merge.png',
    popup: (editor, current, self, close) => {
      function onSelected(e) {
        let mergeField = e.target.value
        if (mergeField) {
          editor.selection.insertNode(
            editor.create.inside.fromHTML('{{' + mergeField + '}}')
          )
        }
      }
      let divElement = editor.create.div('merge-field-popup')

      let labelElement = document.createElement('label')
      labelElement.setAttribute('class', 'merge-field-label')
      labelElement.text = 'Merge field: '
      divElement.appendChild(labelElement)

      let selectElement = document.createElement('select')
      selectElement.setAttribute('class', 'merge-field-select')
      selectElement.appendChild(
        createOptionGroupElement(facilityMergeFields, 'Facility')
      )
      selectElement.appendChild(
        createOptionGroupElement(inspectionMergeFields, 'Inspection')
      )
      selectElement.onchange = onSelected
      divElement.appendChild(selectElement)

      return divElement
    }
  },
  {
    name: 'copyContent',
    tooltip: 'Copy HTML to Clipboard',
    iconURL: 'images/copy.png',
    exec: function (editor) {
      let html = editor.value
      copyStringToClipboard(html)
    }
  }
]

const editorConfig = {
  readonly: false,
  toolbar: true,
  spellcheck: true,
  language: 'en',
  toolbarButtonSize: 'medium',
  toolbarAdaptive: false,
  showCharsCounter: true,
  showWordsCounter: true,
  showXPathInStatusbar: false,
  askBeforePasteHTML: true,
  askBeforePasteFromWord: true,
  //defaultActionOnPaste: "insert_clear_html",
  buttons: buttons,
  uploader: {
    insertImageAsBase64URI: true
  },
  width: 1400,
  height: 842
}

function NewsPage() {
  const [data, setData] = useState(null)
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  const dispatch = useDispatch()
  const { pathname } = useLocation()
  const newsId = parseInt(pathname.split('/')[2])

  const [newForm] = Form.useForm()

  useEffect(() => {
    dispatch(getProductList({ tokens: userInfo.token, user_id: userInfo.id }))
  }, [])

  useEffect(() => {
    if (newsId) {
      async function fetchNewsDetail() {
        const res = await dispatch(getNewsDetail(newsId))
        setData(res.payload[0])
      }
      fetchNewsDetail()
    }
  }, [])

  const productList = useSelector(state => state.product)

  async function onFinish() {
    const formData = newForm.getFieldValue()

    try {
      if (newsId) {
        await dispatch(
          editNews({
            id: newsId,
            tokens: userInfo.token,
            body: { ...formData, content: data?.content }
          })
        )

        await notification.success({
          message: 'Cập nhật tin thành công'
        })
      } else {
        await dispatch(
          addNews({
            tokens: userInfo.token,
            body: { ...formData, content: data?.content }
          })
        )

        await notification.success({
          message: 'Đăng tin thành công'
        })
      }

      await history.push('/seller/news')
    } catch (err) {}
  }

  if (newsId && !data?.content) {
    return <Loading />
  }

  return (
    <div className="post-news">
      <Row className="post-news__form" justify="center" align="middle">
        <Col span={22} className="post-news__form--content">
          <Form
            name="newForm"
            form={newForm}
            layout="vertical"
            initialValues={{
              product_id: data?.product_id,
              title: data?.title,
              description: data?.description
            }}
          >
            <h2>Viết bài cho sản phẩm</h2>
            <Form.Item label="Tiêu đề" name="title" required>
              <Input placeholder="Tiêu đề của bài viết" />
            </Form.Item>
            <Form.Item label="Mô tả" name="description" required>
              <Input.TextArea
                style={{ height: 120 }}
                placeholder="Tóm tắt nội dung bài viết"
              />
            </Form.Item>
            <Row>
              <Col span={8}>
                <Form.Item label="Sản phẩm" name="product_id" required>
                  <Select placeholder="Sản phẩm muốn viết bài">
                    {productList.data?.map(item => (
                      <Select.Option key={item.id} value={item.id}>
                        {item.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
      <div>
        <div style={{ maxWidth: editorConfig.width, margin: '0 auto' }}>
          <JoditEditor
            value={data?.content || ''}
            config={editorConfig}
            onChange={value => setData({ ...data, content: value })}
          />
        </div>
      </div>
      <Row className="post-news__btn" justify="center">
        <Button type="primary" onClick={() => onFinish()}>
          Hoàn tất
        </Button>
      </Row>
    </div>
  )
}

export default NewsPage
