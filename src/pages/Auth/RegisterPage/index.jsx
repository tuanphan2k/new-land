import { useState } from 'react'
import { Form, Input, Button, Row, Col, Select, notification } from 'antd'
import { Link } from 'react-router-dom'
import { REGEX } from '../../../constants/validate'
import { useDispatch } from 'react-redux'
import { postRegister } from '../../../redux/auth.slice'
import { unwrapResult } from '@reduxjs/toolkit'
import history from '../../../utils/history'
import ReCAPTCHA from 'react-google-recaptcha'
import './style.scss'

function RegisterPage({ isAdmin, setVisibleDrawer }) {
  const dispatch = useDispatch()
  const [isVerified, setIsVerified] = useState(!isAdmin ? false : true)

  const onFinish = async values => {
    const { email, firstName, lastName, password, account_type } = values
    let name = firstName + ' ' + lastName

    if (isVerified) {
      try {
        const res = await dispatch(
          postRegister({
            email,
            name,
            password,
            password_confirmation: password,
            account_type
          })
        )
        unwrapResult(res)
        notification.success({
          message: 'Đăng ký thành công'
        })
        if (!isAdmin) {
          history.push('/login')
        } else {
          setVisibleDrawer(false)
        }
      } catch (err) {
        notification.warning({
          message: 'Email đã bị trùng'
        })
      }
    } else {
      notification.warning({
        message: 'Bạn phải xác thực!'
      })
    }
  }

  return (
    <main className="register bg-img">
      <Row justify="center" className="register__main container-1">
        <Col span={isAdmin ? 20 : 12}>
          <Form
            name="normal_register"
            className="register-form"
            initialValues={{ account_type: 0 }}
            onFinish={onFinish}
          >
            <p className="register-title">Tạo tài khoản ngay!</p>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập vào Email!'
                },
                () => ({
                  validator(_, value) {
                    if (!value || value.match(REGEX.EMAIL_REGEX)) {
                      return Promise.resolve()
                    }

                    return Promise.reject(
                      new Error('Email không đúng định dạng!')
                    )
                  }
                })
              ]}
            >
              <Input placeholder="Địa chỉ email" />
            </Form.Item>
            <Form.Item>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item name="firstName" noStyle>
                    <Input placeholder="Họ" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="lastName"
                    noStyle
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng nhập vào họ và tên!'
                      }
                    ]}
                  >
                    <Input placeholder="Tên" />
                  </Form.Item>
                </Col>
              </Row>
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Mật khẩu tối thiểu 8 ký tự!',
                  min: 8
                }
              ]}
              hasFeedback
            >
              <Input.Password placeholder="Mật khẩu" />
            </Form.Item>
            <Form.Item
              name="confirm"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập lại mật khẩu!'
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve()
                    }
                    return Promise.reject(
                      new Error(
                        'Mật khẩu xác nhận và mật khẩu không trùng nhau!'
                      )
                    )
                  }
                })
              ]}
            >
              <Input.Password placeholder="Nhập lại mật khẩu" />
            </Form.Item>
            <Form.Item
              name="account_type"
              rules={[
                {
                  required: true,
                  message: 'Bạn không được để trống loại tài khoản!'
                }
              ]}
            >
              <Select
                placeholder="Bạn tạo tài khoản gì"
                defaultValue={isAdmin ? 0 : null}
              >
                {!isAdmin ? (
                  <>
                    <Select.Option value={1}>Người mua </Select.Option>
                    <Select.Option value={2}>Người bán</Select.Option>
                  </>
                ) : (
                  <Select.Option value={0}>Admin</Select.Option>
                )}
              </Select>
            </Form.Item>
            <Row justify="center">
              {!isAdmin ? (
                <ReCAPTCHA
                  sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                  onChange={() => setIsVerified(!isVerified)}
                />
              ) : (
                ''
              )}
            </Row>
            <Form.Item>
              <Row>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="register-form-button my-1"
                  size="large"
                >
                  Đăng ký
                </Button>
              </Row>
              {!isAdmin ? (
                <Link to="/" className="register-form-home">
                  Trở về trang chủ
                </Link>
              ) : (
                ''
              )}
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </main>
  )
}

export default RegisterPage
