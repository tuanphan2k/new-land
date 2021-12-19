import { Form, Input, Button, Row, Col, Select, notification } from 'antd'
import { REGEX } from '../../../../constants/validate'
import { useDispatch } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { addEmployee, getEmployeeList } from '../../../../redux/employee.slice'
import './style.scss'

function FormEmployee({ initialValues }) {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))

  const dispatch = useDispatch()
  const onFinish = async values => {
    const data = {
      ...values,
      bank_account_number: `${values.bank_type} - ${values.bank_account_number}`
    }
    delete data.bank_type

    try {
      const res = await dispatch(
        addEmployee({
          tokens: userInfo.token,
          body: data
        })
      )
      unwrapResult(res)
      notification.success({
        message: res.payload.msg
      })
    } catch (err) {
      notification.warning({
        message: 'Thêm thất bại'
      })
    }

    await dispatch(getEmployeeList(userInfo.token))
  }

  return (
    <main className="register bg-img">
      <Row justify="center" className="register__main container-1">
        <Col span={20}>
          <Form
            name="normal_register"
            className="register-form"
            initialValues={initialValues}
            onFinish={onFinish}
          >
            <p className="register-title">Nhập thông tin nhân viên!</p>
            <Form.Item
              name="full_name"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập vào họ và tên!'
                }
              ]}
            >
              <Input placeholder="Họ và tên" />
            </Form.Item>
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
            <Form.Item
              name="phone_number"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập vào số điện thoại!'
                },
                () => ({
                  validator(_, value) {
                    if (!value || value.match(REGEX.PHONE_NUMBER_REGEX)) {
                      return Promise.resolve()
                    }

                    return Promise.reject(
                      new Error('Số điện thoại không đúng định dạng!')
                    )
                  }
                })
              ]}
            >
              <Input placeholder="Số điện thoại" />
            </Form.Item>
            <Form.Item
              name="bank_type"
              rules={[
                {
                  required: true,
                  message: 'Bạn không được để trống loại tài khoản!'
                }
              ]}
            >
              <Select placeholder="Chọn ngân hàng">
                <Select.Option value="VPB">
                  Việt Nam Thịnh Vượng - VPB{' '}
                </Select.Option>
                <Select.Option value="VCB">
                  Ngoại thương Việt Nam - VCB
                </Select.Option>
                <Select.Option value="TCB">
                  Kỹ Thương Việt Nam - TCB
                </Select.Option>
                <Select.Option value="ACB">
                  Ngân hàng Á Châu - ACB
                </Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="bank_account_number"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập vào số tài khoản!'
                },
                () => ({
                  validator(_, value) {
                    if (!value || value.match(REGEX.PHONE_NUMBER_REGEX)) {
                      return Promise.resolve()
                    }

                    return Promise.reject(
                      new Error('Số tài khoản không đúng định dạng!')
                    )
                  }
                })
              ]}
            >
              <Input placeholder="Số tài khoản" />
            </Form.Item>
            <Form.Item>
              <Row>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="register-form-button my-1"
                  size="large"
                >
                  Hoàn tất
                </Button>
              </Row>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </main>
  )
}

export default FormEmployee
