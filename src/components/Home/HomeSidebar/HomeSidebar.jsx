import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { createPortal } from 'react-dom'

import { useSelector, useDispatch } from 'react-redux'
import {
    postFolder,
    isFolderLoading,
} from '../../../features/folder/foldersSlice'
import useToggle from '../../../hook/useToggle'

import { setFilterTask } from '../../../features/tasks/tasksSlice'
import CommonModal from '../../Common/CommonModal/CommonModal'
import CommonInput from '../../Common/CommonInput/CommonInput'
import CommonButton from '../../Common/CommonButton/CommonButton'
import CommonLoading from '../../Common/CommonLoading/CommonLoading'

import * as S from './styles.js'
import sunIcon from '../../../assets/images/sun.png'
import sunsetIcon from '../../../assets/images/external-sunset-3.png'
import calenderNotYetIcon from '../../../assets/images/calendar--v1-1.png'
import calenderFinishIcon from '../../../assets/images/calendar--v1-2.png'
import checkedIcon from '../../../assets/images/checked.png'
import folderIcon from '../../../assets/images/folder-invoices--v1.png'
import addIcon from '../../../assets/images/add--v1-1.png'

function HomeSidebar() {
    const folders = useSelector((state) => state.folders.folders)
    const filterTaskOfTaskStore = useSelector((state) => state.tasks.filterTask)
    const isFolderLoadingOfFolderStore = useSelector(isFolderLoading)
    const dispatch = useDispatch()
    const { isShow, toggleIsShow } = useToggle()

    const schema = yup.object({
        name: yup
            .string()
            .test(
                'is-duplicate-folder-name',
                '${path} name is duplicate',
                (value) => {
                    return folders.every((folder) => {
                        return folder.name !== value
                    })
                }
            )
            .required(),
    })

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
    })

    // 驗證資料狀態，成功驗證後發送並清空表單，關閉 modal
    const onSubmitLogin = handleSubmit(async (formData) => {
        dispatch(postFolder({ ...formData, color: 'null' }))
        toggleIsShow()
        reset()
    })

    return (
        <S.Sidebar>
            <S.SidebarBody>
                <S.SidebarItem
                    isSelect={filterTaskOfTaskStore === 'taskOfToday'}
                    onClick={() => dispatch(setFilterTask('taskOfToday'))}
                >
                    <S.Icon src={sunIcon}></S.Icon>
                    <S.Text>今天</S.Text>
                    <S.Time></S.Time>
                    <S.Quantity></S.Quantity>
                </S.SidebarItem>
                <S.SidebarItem
                    isSelect={filterTaskOfTaskStore === 'taskOfFuture'}
                    onClick={() => dispatch(setFilterTask('taskOfFuture'))}
                >
                    <S.Icon src={sunsetIcon}></S.Icon>
                    <S.Text>稍後</S.Text>
                    <S.Time></S.Time>
                    <S.Quantity></S.Quantity>
                </S.SidebarItem>
                <S.SidebarItem
                    isSelect={filterTaskOfTaskStore === 'taskOfNoExpectTime'}
                    onClick={() =>
                        dispatch(setFilterTask('taskOfNoExpectTime'))
                    }
                >
                    <S.Icon src={calenderNotYetIcon}></S.Icon>
                    <S.Text>尚未安排</S.Text>
                    <S.Time></S.Time>
                    <S.Quantity></S.Quantity>
                </S.SidebarItem>
                <S.SidebarItem
                    isSelect={filterTaskOfTaskStore === 'all'}
                    onClick={() => dispatch(setFilterTask('all'))}
                >
                    <S.Icon src={calenderFinishIcon}></S.Icon>
                    <S.Text>全部</S.Text>
                    <S.Time></S.Time>
                    <S.Quantity></S.Quantity>
                </S.SidebarItem>
                <S.SidebarItem
                    isSelect={filterTaskOfTaskStore === 'taskOfFinish'}
                    onClick={() => dispatch(setFilterTask('taskOfFinish'))}
                >
                    <S.Icon src={checkedIcon}></S.Icon>
                    <S.Text>已完成</S.Text>
                    <S.Time></S.Time>
                    <S.Quantity></S.Quantity>
                </S.SidebarItem>
                <S.Line />
                {folders.map((folder) => (
                    <S.SidebarItem
                        isSelect={filterTaskOfTaskStore === folder.name}
                        key={folder.id}
                        onClick={() => dispatch(setFilterTask(folder.name))}
                    >
                        <S.Icon src={folderIcon}></S.Icon>
                        <S.Text>{folder.name}</S.Text>
                        <S.Time></S.Time>
                        <S.Quantity></S.Quantity>
                    </S.SidebarItem>
                ))}
            </S.SidebarBody>
            <S.SidebarFooter>
                <S.SidebarItem onClick={toggleIsShow}>
                    <S.Icon src={addIcon}></S.Icon>
                    <S.Text>新增資料夾</S.Text>
                </S.SidebarItem>
            </S.SidebarFooter>
            {isShow && (
                <CommonModal
                    title="新增資料夾"
                    onClick={() => {
                        toggleIsShow()
                        reset()
                    }}
                >
                    <form>
                        <CommonInput
                            attributes={{ placeholder: '請出入資料夾名稱' }}
                            errorMessage={errors.name?.message}
                            label="name"
                            register={register}
                            title="資料夾名稱，例如：讀書計畫"
                        />
                        <CommonButton
                            color="green"
                            onClick={onSubmitLogin}
                            type="block"
                        >
                            新增
                        </CommonButton>
                    </form>
                </CommonModal>
            )}
            {isFolderLoadingOfFolderStore &&
                createPortal(<CommonLoading></CommonLoading>, document.body)}
        </S.Sidebar>
    )
}

export default HomeSidebar
