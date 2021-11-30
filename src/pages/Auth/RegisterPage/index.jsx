import { Form, Input, Button, Row, Col, Select } from 'antd'
import { Link } from 'react-router-dom'
import { REGEX } from '../../../constants/validate'
import { useDispatch } from 'react-redux'
import { postRegister } from '../auth.slice'
import './style.scss'

function RegisterPage() {
  const dispatch = useDispatch()

  const onFinish = values => {
    const { email, firstName, lastName, password, account_type } = values
    let name = firstName + ' ' + lastName

    dispatch(
      postRegister({
        email,
        name,
        password,
        password_confirmation: password,
        account_type
      })
    )
  }

  return (
    <main className="register container-1">
      <Row justify="center" className="register__main">
        <Col span={12}>
          <Form
            name="normal_register"
            className="register-form"
            initialValues={{}}
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
            <Form.Item label="Bạn tạo tài khoản gì" name="account_type">
              <Select defaultValue={1}>
                <Select.Option value={1}>Người mua </Select.Option>
                <Select.Option value={2}>Người bán</Select.Option>
              </Select>
            </Form.Item>
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
              <Link to="/" className="register-form-home">
                Trở về trang chủ
              </Link>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </main>
  )
}

export default RegisterPage
