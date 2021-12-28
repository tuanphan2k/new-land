import { Table, Popconfirm, Row, Input, Button } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import './style.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getNewsListByUserID, deleteNews } from '../../../../redux/news.slice'
import history from '../../../../utils/history'

function NewsList() {
  const dispatch = useDispatch()
  const newsList = useSelector(state => state.news)

  const userInfo = JSON.parse(localStorage.getItem('userInfo'))

  useEffect(() => {
    dispatch(
      getNewsListByUserID({ tokens: userInfo.token, user_id: userInfo.id })
    )
  }, [])

  const { Search } = Input

  const tableColumns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'Mã BĐS',
      dataIndex: 'product_id',
      key: 'product_id'
    },
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      key: 'title',
      render: (_, record) => {
        return <h3 style={{ margin: 0 }}>{record.title}</h3>
      }
    },
    {
      title: 'Tuỳ chỉnh',
      dataIndex: 'action',
      key: 'action',
      render: (_, record) => {
        return (
          <Row justify="space-between">
            <EditOutlined
              className="table-icon icon-primary"
              onClick={() => history.push(`/post-news/${record.id}`)}
            />
            <Popconfirm
              title={`Bạn các chắc muốn xoá danh mục này ?`}
              onConfirm={() => handleDeleteProduct(record.id)}
            >
              <DeleteOutlined className="table-icon icon-danger" />
            </Popconfirm>
            <div></div>
          </Row>
        )
      }
    }
  ]

  const handleDeleteProduct = async id => {
    await dispatch(
      deleteNews({
        token: userInfo.token,
        id
      })
    )
    await dispatch(
      getNewsListByUserID({ tokens: userInfo.token, user_id: userInfo.id })
    )
  }

  const dataSource = newsList?.data?.map(item => {
    return {
      ...item,
      key: item.id
    }
  })

  return (
    <main className="user-page">
      <p className="user-page__title">Quản lý bài viết</p>
      <div className="user-page__main">
        <Row justify="space-between" className="user-page__main--top">
          <Button type="primary" onClick={() => history.push('/post-news')}>
            Thêm bài viết
          </Button>
          <Search
            placeholder="input search text"
            allowClear
            className="user-page__main--search"
            enterButton="Search"
            size="large"
          />
          <div></div>
        </Row>
        <Table
          dataSource={dataSource}
          loading={newsList?.loading}
          columns={tableColumns}
          size="middle"
          pagination={{ defaultPageSize: 9 }}
        />
      </div>
    </main>
  )
}

export default NewsList
