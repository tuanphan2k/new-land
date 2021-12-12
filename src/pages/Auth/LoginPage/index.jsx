import { useState } from 'react'
import { Form, Input, Button, Checkbox, Row, Col, notification } from 'antd'
import { Link } from 'react-router-dom'
import { unwrapResult } from '@reduxjs/toolkit'
import { REGEX } from '../../../constants/validate'
import { useDispatch } from 'react-redux'
import { postLogin } from '../../../redux/auth.slice'
import ReCAPTCHA from 'react-google-recaptcha'
import history from '../../../utils/history'
import './style.scss'

function LoginPage() {
  const dispatch = useDispatch()
  const [isVerified, setIsVerified] = useState(false)

  const onFinish = async values => {
    if (isVerified) {
      try {
        const res = await dispatch(postLogin(values))
        unwrapResult(res)
        notification.success({
          message: 'Đăng nhập thành công'
        })
        if (res.payload.user.account_type === 0) {
          history.push('/admin')
        } else {
          history.push('/')
        }
      } catch (err) {
        notification.warning({
          message: 'Email hoặc mật khẩu không đúng'
        })
      }
    } else {
      notification.warning({
        message: 'Bạn phải xác thực!'
      })
    }
  }

  return (
    <main className="login bg-img">
      <Row justify="center" className="login__main container-1">
        <Col span={12}>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true
            }}
            onFinish={onFinish}
          >
            <p className="login-title">Đăng nhập ngay!</p>
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
                      new Error('Định dạng không phải E-mail!')
                    )
                  }
                })
              ]}
            >
              <Input placeholder="Địa chỉ email" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập vào mật khẩu!'
                }
              ]}
            >
              <Input type="password" placeholder="Mật khẩu" />
            </Form.Item>
            <Form.Item>
              <Form.Item valuePropName="checked" noStyle>
                <Checkbox>Ghi nhớ đăng nhập</Checkbox>
              </Form.Item>

              <Link className="login-form-forgot" to="">
                Quên mật khẩu
              </Link>
            </Form.Item>
            <Row justify="center">
              <ReCAPTCHA
                sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                onChange={() => setIsVerified(!isVerified)}
              />
            </Row>
            <Form.Item>
              <Row>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button my-1"
                  size="large"
                >
                  Đăng nhập
                </Button>
              </Row>
              <Link to="/register" className="login-form-register">
                Đăng ký ngay!
              </Link>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </main>
  )
}

export default LoginPage
