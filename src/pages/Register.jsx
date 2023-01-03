import { useState } from 'react'

import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import { register as userRegister } from '../features/user/userSlice'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import styled from 'styled-components'

import CommonForm from '../components/Common/CommonForm/CommonForm.jsx'
import CommonInput from '../components/Common/CommonInput/CommonInput.jsx'
import CommonButton from '../components/Common/CommonButton/CommonButton.jsx'
import CommonModal from '../components/Common/CommonModal/CommonModal.jsx'
import CommonLoading from '../components/Common/CommonLoading/CommonLoading.jsx'

const MainWrapper = styled.div`
    weight: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #f7f7f7;

    > * > *:not(:last-child) {
        margin-bottom: 24px;
    }
`

const Box = styled.div`
    padding: 24px;
    background: #fff;
    border-radius: 4px;
    text-align: center;
    font-size: 16px;
    light-height: 24px;

    > * {
        color: #4ed3a9;
    }
`

const schema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
})

function Register() {
    const userStore = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isModalOpen, setModalOpen] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })

    // 註冊
    const onSubmitRegister = handleSubmit(async ({ email, password }) => {
        await dispatch(userRegister({ email, password }))

        if (!userStore.ErrorOfRegister) return navigate('/')
        else return setModalOpen(true)
    })

    return (
        <MainWrapper>
            <div>
                <CommonForm message="Pomodoro todo 優雅的使用待辦清單以及番茄鐘" title="Register">
                    <CommonInput
                        errorMessage={errors.email?.message}
                        attributes={{ placeholder: '請輸入信箱' }}
                        label="email"
                        register={register}
                    />
                    <CommonInput
                        errorMessage={errors.password?.message}
                        attributes={{ placeholder: '請輸入密碼', type: 'password' }}
                        label="password"
                        register={register}
                    />
                    <CommonButton type="block" color="green" onClick={onSubmitRegister}>
                        Register
                    </CommonButton>
                </CommonForm>
                <Box>
                    已有帳號？ <Link to="/login"> 登入</Link>
                </Box>
            </div>
            {isModalOpen && (
                <CommonModal onClick={() => setModalOpen(false)} title="意外錯誤">
                    <p> {userStore.ErrorOfRegister.message}</p>
                </CommonModal>
            )}
            {userStore.isLoadingRegister && <CommonLoading text="加載中..." />}
        </MainWrapper>
    )
}

export default Register
