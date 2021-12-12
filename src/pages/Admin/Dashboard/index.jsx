import { Row, Col, Card } from 'antd'
import { useEffect } from 'react'
import { Doughnut, Line } from 'react-chartjs-2'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
// import { getOrderListAction } from '../../../redux/actions'
import './style.scss'

function DashboardPage() {
  const dispatch = useDispatch()

  // const orderList = useSelector(state => state.orderReducer.orderList)

  useEffect(() => {
    // dispatch(getOrderListAction({}))
  }, [])

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

  return (
    <main className="dashboard-page">
      <p className="dashboard-page__title">Dashboard</p>
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
            title="Tổng doanh thu"
            bordered={true}
            className="dashboard-page__statistical--item"
          >
            123
          </Card>
        </Col>
        <Col span={4}>
          <Card
            title="Số người dùng"
            bordered={true}
            className="dashboard-page__statistical--item"
          >
            5.345
          </Card>
        </Col>
        <Col span={4}>
          <Card
            title="Hôm nay"
            bordered={true}
            className="dashboard-page__statistical--item"
          >
            3.868
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
