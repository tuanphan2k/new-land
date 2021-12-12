import './style.scss'
import React, { useState } from 'react'

function ProductInfo() {
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
  const attributes = [
    {
      name: 'Loại hình'
    },
    {
      name: 'Diện tích'
    },
    {
      name: 'Số tầng'
    },
    {
      name: 'Hướng nhà'
    },
    {
      name: 'Số phòng ngủ'
    },
    {
      name: 'Số phòng tắm'
    }
  ]
  return (
    <div className="product-info">
      <div className="product-info__left">
        <div className="basic-info">
          <h1 className="page-title">
            Nhà mặt tiền 3 lầu 67m² Trần Thủ Độ Phú Trung Tân Phú Giá 8.7 tỷ
          </h1>
          <div className="address">
            <p className="location">
              Phường Phú Thạnh, Quận Tân Phú, Thành phố Hồ Chí Minh
            </p>
          </div>
          <h4 className="tab-title">Thông tin mô tả</h4>
          <div className="wrap-description">
            <div className="description">
              Nhà 1 đời chủ chưa qua đầu tư xách vali vào ở vào ở ngay thôi{' '}
              <br />
              Diện tích <br />
              vị trí khu dân trí cao <br />
              kết cấu nhà như mới <br />
            </div>
          </div>
          <h4 className="tab-title">Đặc điểm</h4>
          <div className="block-properties">
            <div className="properties">
              <ul className="list-properties">
                {attributes.map((item, index) => (
                  <li className="properties-item" key={index}>
                    {item.name}:
                  </li>
                ))}
              </ul>
            </div>
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
          <h3 className="title">Mua bán nhà mặt tiền thành phố Hồ Chí Minh</h3>
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
  )
}

export default ProductInfo
