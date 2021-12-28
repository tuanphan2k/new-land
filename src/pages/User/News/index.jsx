import './style.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getNewsList } from '../../../redux/news.slice'
import { useEffect } from 'react'
import history from '../../../utils/history'

function News() {
  const dispatch = useDispatch()

  const newsListData = useSelector(state => state.news)

  useEffect(() => {
    dispatch(getNewsList())
  }, [])

  const newsList = [
    {
      imgUrl:
        'https://cenhomesvn.s3.ap-southeast-1.amazonaws.com/2021/12/1639015679-z300586838608214607595fb737aa0d6e552883858347f.jpg',
      type: 'Bùng nổ chuỗi sự kiện đặc sắc chỉ có tại Hoa Tiên Fest Tour',
      content:
        'Cuối năm vốn sôi động với hàng loạt lễ hội và cũng là lúc nhu cầu du lịch, vui chơi – giải trí của người dân tăng cao, đặc biệt sau thời gian giãn dài cách xã hội. Chuỗi sự kiện Hoa Tiên Fest Tour được tổ chức tại Hoa Tiên Paradise tới đây hứa hẹn sẽ mang đến những trải nghiệm độc đáo, chưa từng có cho du khách.'
    },
    {
      imgUrl:
        'https://cenhomesvn.s3.ap-southeast-1.amazonaws.com/2021/12/1639015679-z300586838608214607595fb737aa0d6e552883858347f.jpg',
      type: 'Đô thị biển “bừng giấc” với siêu phẩm The Sailing Quy Nhơn',
      content:
        'Nếu như Ghềnh Ráng – Tiên Sa hay Kỳ Co – Eo Gió là điểm du lịch nhất định không thể bỏ qua khi tới Quy Nhơn thì The Sailing chính là điểm dừng chân tuyệt vời cho một kỳ nghỉ thiên đường giữa đô thị phồn hoa.'
    },
    {
      imgUrl:
        'https://cenhomesvn.s3.ap-southeast-1.amazonaws.com/2021/12/1638873280-712cen-land-home-now-for-vietnam-stronger-2.jpg',
      type: 'Từ chuyển động Home now" nhìn ra bức tranh thị trường BĐS',
      content:
        'Ngày 22/12/2021 tới, sự kiện tổng kết, bốc thăm trao giải chiến dịch “Home now for Vietnam Stronger” sẽ chính thức diễn ra tại Fastee Club, tầng 3, 54 Lê Văn Lương, Hà Nội.'
    },
    {
      imgUrl:
        'https://cenhomesvn.s3.ap-southeast-1.amazonaws.com/2021/12/1638763924-topic16crepic01.jpg',
      type: 'IPA rót hơn 700 tỷ đồng mua cổ phiếu Cen Land',
      content:
        'Ngày 03/12/2021, Công ty Cổ phần Tập đoàn Đầu tư IPA đã thông qua nghị quyết đầu tư mua cổ phiếu CTCP Bất động sản Thế Kỷ (Cen Land, HoSE: CRE) theo hình thức giao dịch thoả thuận.'
    },
    {
      imgUrl:
        'https://cenhomesvn.s3.ap-southeast-1.amazonaws.com/2021/12/1638763126-can-ho-bac-ninh-parkview-city-1.jpg',
      type: 'Đâu là tọa độ “xuống tiền” của nhà đầu tư thời điểm này?',
      content:
        'Giá cho thuê trung bình căn hộ 1 ngủ từ 12 – 13 triệu/tháng, căn 2 ngủ từ 14 – 16 triệu/tháng với tỷ lệ lấp đầy cao, lợi nhuận cho thuê đạt 12%/năm… Đó là những con số “biết nói” về căn hộ cao cấp tại Bắc Ninh. Thực tế, sức nóng của phân khúc này vẫn không hề suy giảm và dự báo còn tiếp tục gia tăng thời gian tới.'
    },
    {
      imgUrl:
        'https://cenhomesvn.s3.ap-southeast-1.amazonaws.com/2021/12/1638419003-cen-land-the-sailing-quy-nhon-3.jpg',
      type: 'Chiếm sóng đầu tư - BĐS hàng hiệu lên ngôi" tại thị trường Quy Nhơn',
      content:
        'Sở hữu nhiều giá trị vượt trội đến từ vị trí đắc địa, pháp lý minh bạch cùng bộ sưu tập căn hộ hàng hiệu đắt giá được quản lý vận hành bởi Wyndham…The Sailing Quy Nhơn trở thành điểm sáng thu hút sự quan tâm của nhà đầu tư.'
    },
    {
      imgUrl:
        'https://cenhomesvn.s3.ap-southeast-1.amazonaws.com/2021/12/1638326285-112cen-land-home-now-for-vietnam-stronger.jpg',
      type: 'Đòn bẩy nào giúp thị trường bất động sản tăng tốc dịp cuối năm?',
      content:
        'Độ phủ vaccine tăng cao, các hoạt động sản xuất - kinh doanh dần khôi phục cùng tâm lý “mua nhà đón Tết” giúp thị trường bất động sản khởi sắc dịp cuối năm. Bên cạnh đó, thị trường cũng cần những “đòn bẩy” thiết thực để duy trì nhịp độ và sự tăng trưởng bền vững.'
    },
    {
      imgUrl:
        'https://cenhomesvn.s3.ap-southeast-1.amazonaws.com/2021/11/1637376299-2011cen-land-the-sailing-quy-nhon-2.jpg',
      type: ' Đầu tư BĐS nghỉ dưỡng thời kỳ “bình thường mới – Đâu là cửa sáng?',
      content:
        'Được ví như chiếc lò xo bị nén chặt, thị trường BĐS nghỉ dưỡng thời kỳ “bình thường mới” theo nhiều chuyên gia nhận định sẽ có sức bật mạnh mẽ khi dịch bệnh từng bước được kiểm soát.'
    }
  ]

  const categorys = [
    {
      name: 'tin tức NewHome.vn'
    },
    {
      name: 'Điểm tin bất động sản'
    },
    {
      name: 'Chính sách - Quy hoạch'
    },
    {
      name: 'Báo cáo thị trường'
    },
    {
      name: 'Kiến trúc - Phong thuỷ'
    },
    {
      name: 'Chuyền nghề môi giới'
    }
  ]

  function renderNewList() {
    return newsListData?.data?.map(item => {
      return (
        <li
          key={item.id}
          className="item-card"
          onClick={() => history.pushState(`news/${item.id}`)}
        >
          <img src={item.image} alt="" className="item-image" />
          <div className="item-text">
            <h4 className="tag-title">{item.title}</h4>
            <p>{item.description}</p>
            <p className="tag-name">
              Dự án: <span>{item.name_product}</span>
            </p>
          </div>
        </li>
      )
    })
  }

  function renderHotList() {
    return newsList.map((item, index) => {
      return (
        <li key={index} className="bottom-item">
          <img src={`${item.imgUrl}`} alt="" class="bottom-image" />
          <p>{item.type}</p>
        </li>
      )
    })
  }

  function renderCategory() {
    return categorys.map((item, index) => {
      return (
        <li key={index} className="list-item">
          {item.name}
        </li>
      )
    })
  }

  return (
    <div className="news__info container-1">
      <div className="news__info-content">
        <h1 className="heading-title">Tin tức</h1>
        <div className="card">
          <ul className="list-cart">{renderNewList()}</ul>
        </div>
      </div>
      <div className="news__info-category">
        <div className="sider-top">
          <h3 className="title">Danh mục tin tức</h3>
          <ul className="list">{renderCategory()}</ul>
        </div>
        <div className="sider-bottom">
          <h3>Tin tức mới nhất</h3>
          <ul className="bottom-list">{renderHotList()}</ul>
        </div>
      </div>
    </div>
  )
}
export default News
