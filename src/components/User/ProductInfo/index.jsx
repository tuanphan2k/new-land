import './style.scss'
import {
  Row,
  Col,
  Button,
  notification,
  Form,
  Input,
  Comment,
  Avatar,
  Popconfirm
} from 'antd'
import { PhoneOutlined, HeartOutlined, HeartTwoTone } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import {
  addFavorite,
  getFavoriteList,
  deleteFavorite
} from '../../../redux/favorite.slice'
import {
  getCommentList,
  addComment,
  deleteComment
} from '../../../redux/comment.slice'
import history from '../../../utils/history'
import { useEffect } from 'react'
function ProductInfo({ detail, infoDetail }) {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))

  const {
    id,
    city,
    district,
    ward,
    quantity,
    employees,
    description,
    deposit_time,
    deposit_price,
    name,
    price,
    token
  } = detail

  const { imageList, infoList } = infoDetail || {}

  function sliceAdress(address) {
    return address?.split('-')[1]
  }

  const favoriteList = useSelector(state => state.favorite)
  const commentList = useSelector(state => state.comment)
  console.log(commentList)
  const hasProduct = favoriteList?.data?.findIndex(
    item => item.product_id === id
  )

  const [commentForm] = Form.useForm()

  const commnues = [
    {
      name: 'Tân Phú'
    },
    {
      name: 'Phú Hoà Thọ'
    },
    {
      name: 'Tây Thạnh'
    },
    {
      name: 'Phú Thạnh'
    },
    {
      name: 'Tân Sơn Nhì'
    }
  ]
  const districts = [
    {
      name: 'Gò Vấp'
    },
    {
      name: 'Tân Phú'
    },
    {
      name: 'Tân Bình'
    },
    {
      name: 'Bình Thạnh'
    },
    {
      name: 'Bình Tân'
    }
  ]

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCommentList(id))
  }, [id])

  async function handleFavorite() {
    const res = await dispatch(
      addFavorite({
        tokens: token,
        body: {
          product_id: id
        }
      })
    )

    await notification.success({
      message: res.payload.msg
    })

    await dispatch(getFavoriteList({ tokens: token }))
  }

  async function handleDeleteFavorite() {
    const res = await dispatch(
      deleteFavorite({
        tokens: token,
        id: favoriteList?.data[hasProduct]?.id
      })
    )

    await notification.success({
      message: res.payload.msg
    })

    await dispatch(getFavoriteList({ tokens: token }))
  }

  async function handleSubmit() {
    const value = commentForm.getFieldValue()
    const res = await dispatch(
      addComment({ tokens: userInfo.token, body: { product_id: id, ...value } })
    )
    notification.success({ message: res.payload.msg })
    await commentForm.resetFields()
    await dispatch(getCommentList(id))
  }

  async function handleDeleteComment(comemntId) {
    const res = await dispatch(
      deleteComment({
        tokens: userInfo.token,
        id: comemntId
      })
    )

    notification.success({ message: res.payload.msg })
    await dispatch(getCommentList(id))
  }

  return (
    <div className="" style={{ display: 'block' }}>
      <div className="product-info">
        <div className="product-info__left">
          <div className="basic-info">
            <Row justify="space-between">
              <h1 className="page-title">{name}</h1>
              <h2>{parseInt(price).toLocaleString('it-IT')} vnđ</h2>
            </Row>
            <div className="address">
              <p className="location" style={{ fontSize: '1.6rem' }}>
                {`${sliceAdress(ward)} - ${sliceAdress(
                  district
                )} - ${sliceAdress(city)}`}
              </p>
            </div>
            <Row justify="space-between">
              <Col>
                <h4 className="tab-title">Thông tin mô tả</h4>
              </Col>
              <Col>
                <Row>
                  <Button
                    size="large"
                    type="primary"
                    icon={<PhoneOutlined />}
                    onClick={() => history.push(`/order/${id}/${employees}`)}
                  >
                    Liên hệ đặt cọc
                  </Button>
                  <Button
                    style={{ marginLeft: '20px' }}
                    size="large"
                    onClick={() => {
                      if (hasProduct === -1) {
                        return handleFavorite()
                      }

                      return handleDeleteFavorite()
                    }}
                    icon={
                      hasProduct === -1 ? (
                        <HeartOutlined />
                      ) : (
                        <HeartTwoTone twoToneColor="#eb2f96" />
                      )
                    }
                  ></Button>
                </Row>
              </Col>
            </Row>
            <div className="wrap-description" style={{ fontSize: '1.8rem' }}>
              <div className="description">{description}</div>
            </div>
            <h4 className="tab-title">Đặc điểm</h4>
            <div className="block-properties">
              <div className="properties">
                <ul className="list-properties">
                  <Row gutter={48}>
                    <Col span={4}>
                      <li className="properties-item" key="cbd">
                        Số lượng:
                      </li>
                    </Col>
                    <Col span={20}>
                      <li className="properties-item" key="acs">
                        {quantity}
                      </li>
                    </Col>
                  </Row>
                  {infoList?.map((item, index) => (
                    <Row gutter={48}>
                      <Col span={4}>
                        <li className="properties-item" key={index}>
                          {item.title}:
                        </li>
                      </Col>
                      <Col span={20}>
                        <li className="properties-item" key={index}>
                          {item.content}
                        </li>
                      </Col>
                    </Row>
                  ))}
                </ul>
              </div>
            </div>
            <h4 className="tab-title">Bình luận</h4>
            <div className="detail-comment">
              <p>Bạn nghĩ gì về bất động sản này ?</p>
              <div>
                <Form form={commentForm} name="commentForm">
                  <Row style={{ height: '100%' }}>
                    <Col span={14}>
                      <Form.Item
                        name="body"
                        rules={[
                          { required: true, message: 'Nhập vào bình luận!' }
                        ]}
                      >
                        <Input.TextArea placeholder="Viết đánh giá của bạn" />
                      </Form.Item>
                    </Col>
                    <Col span={4}>
                      <Row align="middle" justify="center">
                        <div>
                          <Form.Item>
                            <Button
                              type="primary"
                              style={{ height: '50px' }}
                              htmlType="submit"
                              onClick={() => handleSubmit()}
                            >
                              Viết đánh giá
                            </Button>
                          </Form.Item>
                        </div>
                      </Row>
                    </Col>
                  </Row>
                </Form>
              </div>
              <p>Những bình luận</p>
              <Row>
                <Col span={20}>
                  {commentList?.data?.map(item => (
                    <Row>
                      <Col span={20}>
                        <Comment
                          author={<a>{item.user_name}</a>}
                          avatar={
                            <Avatar
                              src="https://joeschmoe.io/api/v1/random"
                              alt="Han Solo"
                            />
                          }
                          content={<p>{item.body}</p>}
                          datetime={item.created_at}
                        />
                      </Col>
                      <Col span={4}>
                        {userInfo?.id == item.user_id ? (
                          <Popconfirm
                            title="Bạn muốn xoá bình luận này?"
                            onConfirm={() => handleDeleteComment(item.id)}
                            // onCancel={cancel}
                            okText="Yes"
                            cancelText="No"
                          >
                            <a href="#">Xoá</a>
                          </Popconfirm>
                        ) : (
                          ''
                        )}
                      </Col>
                    </Row>
                  ))}
                </Col>
              </Row>
            </div>
          </div>
        </div>
        <div className="product-info__right">
          <div className="item-sidebar">
            <h3 className="title">Mua bán nhà mặt tiền quận Tân Phú</h3>
            <ul className="list">
              {commnues.map((item, index) => (
                <li className="list-item" key={index}>
                  {item.name}
                  <span className="count">624</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="item-sidebar">
            <h3 className="title">
              Mua bán nhà mặt tiền thành phố Hồ Chí Minh
            </h3>
            <ul className="list">
              {districts.map((item, index) => (
                <li className="list-item" key={index}>
                  {item.name}
                  <span className="count">624</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductInfo
