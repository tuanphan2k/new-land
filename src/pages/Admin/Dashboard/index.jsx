import { Row, Col, Card, DatePicker, Input } from 'antd'
import { useEffect } from 'react'
import { Doughnut, Line } from 'react-chartjs-2'
import { useDispatch, useSelector } from 'react-redux'
import { getDataAdmin, postTimeAdmin } from '../../../redux/report.slice'
import { getUserList } from '../../../redux/user.slice'
import './style.scss'

function DashboardPage() {
  const dispatch = useDispatch()
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  const dataList = useSelector(state => state.report)
  const userList = useSelector(state => state.user)

  useEffect(() => {
    dispatch(getDataAdmin({ tokens: userInfo?.token }))
    dispatch(getUserList(userInfo.token))
  }, [])

  const { Search } = Input

  let confirmedCount = 7
  let waitingCount = 2
  let cancelledCount = 10
  let totalRevenue = 123

  // orderList.data.forEach(item => {
  //   if (item.status === 1) {
  //     waitingCount += 1
  //   } else if (item.status === 2) {
  //     confirmedCount += 1
  //   } else {
  //     cancelledCount += 1
  //   }
  //   totalRevenue += parseInt(item.totalPrice)
  // })

  const stateLine = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Revenue',
        fill: true,
        lineTension: 0.5,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: [65, 70, 80, 81, 90]
      }
    ]
  }

  const stateDoughnut = {
    labels: ['Hoàn thành', 'Đang đợi xác nhận', 'Đã huỷ'],
    datasets: [
      {
        label: 'Rainfall',
        backgroundColor: ['#2FDE00', '#C9DE00', '#B21F00'],
        hoverBackgroundColor: ['#175000', '#4B5000', '#501800'],
        data: [12, 1, 20]
      }
    ]
  }

  async function handleFetchData(value) {
    const arr = value?._d?.toString().split(' ')

    if (arr) {
      await dispatch(
        postTimeAdmin({
          body: { month: arr && arr[2], year: arr && arr[3] },
          tokens: userInfo.token
        })
      )
    } else {
      dispatch(getDataAdmin({ tokens: userInfo?.token }))
    }
  }

  return (
    <main className="dashboard-page">
      <p className="dashboard-page__title">Dashboard</p>
      <Row justify="space-around" className="user-page__main--top">
        <div></div>
        <Search
          placeholder="input search text"
          allowClear
          className="user-page__main--search"
          enterButton="Search"
          size="large"
        />
        <div>
          <DatePicker
            size="large"
            picker="month"
            placeholder="Chọn tháng"
            onChange={value => handleFetchData(value)}
          />
        </div>
      </Row>
      <Row gutter={16}>
        <Col span={14} className="dashboard-page__chart">
          <Line
            data={stateLine}
            options={{
              title: {
                display: true,
                text: 'Average Rainfall per month',
                fontSize: 20
              },
              legend: {
                display: true,
                position: 'right'
              }
            }}
          />
        </Col>
        <Col span={10} className="dashboard-page__chart">
          <Row justify="center">
            <Doughnut
              data={stateDoughnut}
              className="dashboard-page__chart--doughnut"
              options={{
                title: {
                  display: true,
                  text: 'Tổng đơn hàng',
                  fontSize: 20
                },
                legend: {
                  display: true,
                  position: 'right'
                }
              }}
            />
          </Row>
        </Col>
      </Row>
      <Row
        gutter={16}
        justify="space-around"
        className="dashboard-page__statistical"
      >
        <Col span={4}>
          <Card
            title="Tổng tiền"
            bordered={true}
            className="dashboard-page__statistical--item"
          >
            {dataList?.data?.total || 0}
          </Card>
        </Col>
        <Col span={4}>
          <Card
            title="Số giao dịch thành công"
            bordered={true}
            className="dashboard-page__statistical--item"
          >
            {dataList?.data?.number || 0}
          </Card>
        </Col>
        <Col span={4}>
          <Card
            title="Số người dùng"
            bordered={true}
            className="dashboard-page__statistical--item"
          >
            {userList?.data?.length}
          </Card>
        </Col>
        <Col span={4}>
          <Card
            title="Số lượt truy cập"
            bordered={true}
            className="dashboard-page__statistical--item"
          >
            41.857
          </Card>
        </Col>
      </Row>
    </main>
  )
}

export default DashboardPage
