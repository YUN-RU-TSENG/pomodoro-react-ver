import { useEffect, useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { useSelector, useDispatch } from 'react-redux'
import {
    updateTask,
    selectTaskById,
    setUpdateSelectTaskId,
    deleteTask,
} from '../../../features/tasks/tasksSlice'
import { breakCountdown } from '../../../features/pomodoroClock/pomodoroClockSlice'

import debounce from '../../../utils/debounceFn'
import dayjs from 'dayjs'

import CommonButton from '../../Common/CommonButton/CommonButton'
import CommonDropdown from '../../Common/CommonDropdown/CommonDropdown'
import CommonPopover from '../../Common/CommonPopover/CommonPopover'
import CommonInput from '../../Common/CommonInput/CommonInput'

import HomeCalender from '../HomeCalender/HomeCalender'
import HomePlayer from '../HomePlayer/HomePlayer'

import styled from 'styled-components'
import AddIcon from '../../../assets/images/add--v1.png'
import clockIcon from '../../../assets/images/retro-alarm-clock.png'
import calenderIcon from '../../../assets/images/calendar--v1.png'
import fileIcon from '../../../assets/images/folder-invoices--v1.png'
import ringIcon from '../../../assets/images/bell--v1.png'
import viewIcon from '../../../assets/images/full-page-view.png'
import trashIcon from '../../../assets/images/trash--v1.png'

const EditForm = styled.section`
    padding: 8px;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    background: #fff;
    box-shadow: 0px 0px 4px #ededed;

    > *:nth-last-child(3) {
        flex: 1 1 auto;
    }
`

const List = styled.ul`
    > *:not(:last-child) {
        margin-bottom: 8px;
    }
`
const Item = styled.li`
    padding: 4px 4px;
    display: flex;
    gap: 0px 8px;
    align-items: center;
    justify-content: ${(props) => props.alignItems};

    ${(props) => {
        return (
            !props.lastNotFloat &&
            `> *:last-child {
                    margin-left: auto;
            }`
        )
    }}
`

const Text = styled.p`
    font-size: 14px;
    light-height: 21px;
`

const Checkbox = styled.input.attrs({ type: 'checkbox' })``

const Icon = styled.img`
    width: 16px;
    vertical-align: middle;
`

const Button = styled.button`
    flex: 0 1 auto;
    line-height: 12px;
`

const SubTaskList = styled.ul`
    padding: 4px 0px;
`

const SubTaskItem = styled.li`
    display: flex;
    align-items: center;
    padding: 2px 10px;
    font-size: 14px;
    light-height: 21px;
    gap: 0px 8px;
`

const AddImg = styled.img`
    width: 24px;
    vertical-align: middle;
`

const Textarea = styled.textarea``

const Line = styled.div`
    height: 1px;
    background: #ededed;
    margin: 8px 0px;
`

const schema = yup.object({
    name: yup.string().required(),
    isFinish: yup.boolean(),
    totalSpendTime: yup.number().min(0),
    cacheTotalSpendTime: yup.number().min(0),
    expectEndDate: yup.string(),
    cacheExpectEndDate: yup.string(),
    mentionDate: yup.string(),
    cacheMentionDate: yup.string(),
    subtasks: yup.array(),
    cacheSubtask: yup.string(),
    folder: yup.string(),
    cacheFolder: yup.string(),
    description: yup.string(),
})

function HomeEditForm() {
    const selectUpdateTask = useSelector(selectTaskById)
    const folders = useSelector((state) => state.folders.folders)

    const dispatch = useDispatch()

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { isDirty },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            name: selectUpdateTask.name,
            isFinish: selectUpdateTask.isFinish,
            totalSpendTime: selectUpdateTask.totalSpendTime,
            cacheTotalSpendTime: selectUpdateTask.totalSpendTime || 0,
            expectEndDate: selectUpdateTask.expectEndDate,
            cacheExpectEndDate: selectUpdateTask.expectEndDate,
            mentionDate: selectUpdateTask.mentionDate,
            cacheMentionDate: selectUpdateTask.mentionDate,
            subtasks: selectUpdateTask.subtasks,
            folder: selectUpdateTask.folder,
            cacheFolder: selectUpdateTask.folder,
            description: selectUpdateTask.description,
        },
    })

    const [isPomodoroModalOpen, setIsPomodoroModalOpen] = useState(false)
    const [isTotalExpectOpen, setIsTotalExpectOpen] = useState(false)
    const [isFolderOpen, setIsFolderOpen] = useState(false)
    const [isMentionDateOpen, setIsMentionDateOpen] = useState(false)

    const debounceUpdateTask = useRef(
        debounce((value) => {
            dispatch(updateTask(value))
        }, 1000)
    ).current

    const submitForm = handleSubmit((value) => {
        const {
            cacheTotalSpendTime,
            cacheExpectEndDate,
            cacheFolder,
            cacheSubtask,
            ...taskData
        } = {
            ...selectUpdateTask,
            ...value,
        }
        debounceUpdateTask(taskData)
    })

    const selectCountdownTaskId = useSelector(
        (state) => state.pomodoroClock.selectCountdownTaskId
    )

    /*eslint-disable react-hooks/exhaustive-deps */
    useEffect(() => {
        if (isDirty) submitForm()
    }, [
        watch('name'),
        watch('isFinish'),
        watch('totalSpendTime'),
        watch('expectEndDate'),
        watch('mentionDate'),
        watch('subtasks'),
        watch('folder'),
        watch('description'),
    ])
    /*eslint-disable react-hooks/exhaustive-deps */

    return (
        <EditForm className="home-edit">
            <Item as="div" alignItems="space-between">
                <Checkbox {...register('isFinish')}></Checkbox>
                <HomePlayer taskId={selectUpdateTask.id}></HomePlayer>
                <CommonInput
                    attributes={{}}
                    errorMessage=""
                    label="name"
                    register={register}
                />
            </Item>
            <Line></Line>
            <List>
                <Item>
                    <Button>
                        <Icon src={clockIcon}></Icon>
                    </Button>
                    <Text>番茄鐘</Text>
                    <CommonPopover
                        text={watch('totalSpendTime') || '0'}
                        isOpen={isPomodoroModalOpen}
                        onClick={() => {
                            setIsPomodoroModalOpen(!isPomodoroModalOpen)
                        }}
                    >
                        <CommonInput
                            attributes={{ type: 'number', min: 0 }}
                            label="cacheTotalSpendTime"
                            register={register}
                        />
                        <CommonButton
                            color="green"
                            onClick={() => {
                                setValue(
                                    'totalSpendTime',
                                    watch('cacheTotalSpendTime')
                                )
                                setIsPomodoroModalOpen(!isPomodoroModalOpen)
                            }}
                            type="block"
                        >
                            確定
                        </CommonButton>
                    </CommonPopover>
                </Item>
                <Item>
                    <Button>
                        <Icon src={calenderIcon}></Icon>
                    </Button>
                    <Text>預計完成日</Text>
                    <CommonPopover
                        text={
                            watch('expectEndDate')
                                ? dayjs(watch('expectEndDate')).format(
                                      'YYYY/MM/DD'
                                  )
                                : '無'
                        }
                        isOpen={isTotalExpectOpen}
                        onClick={() => {
                            setIsTotalExpectOpen(!isTotalExpectOpen)
                        }}
                    >
                        <HomeCalender
                            selectCacheDate={watch('cacheExpectEndDate')}
                            onSelectDataUpdate={(data) => {
                                setValue('cacheExpectEndDate', data)
                            }}
                        />
                        <CommonButton
                            color="green"
                            onClick={() => {
                                setValue(
                                    'expectEndDate',
                                    watch('cacheExpectEndDate')
                                )
                                setIsTotalExpectOpen(!isTotalExpectOpen)
                            }}
                            type="block"
                        >
                            確定
                        </CommonButton>
                    </CommonPopover>
                </Item>
                <Item>
                    <Button>
                        <Icon src={fileIcon}></Icon>
                    </Button>
                    <Text>資料夾</Text>
                    <CommonPopover
                        text={watch('folder') || '無'}
                        isOpen={isFolderOpen}
                        onClick={() => {
                            setIsFolderOpen(!isFolderOpen)
                        }}
                    >
                        <CommonDropdown
                            items={folders.map((item) => item.name)}
                            selectItem={watch('cacheFolder')}
                            updateSelectItem={(data) => {
                                setValue('cacheFolder', data)
                            }}
                        />

                        <CommonButton
                            color="green"
                            onClick={() => {
                                setValue('folder', watch('cacheFolder'))
                                setIsFolderOpen(!isFolderOpen)
                            }}
                            type="block"
                        >
                            確認
                        </CommonButton>
                    </CommonPopover>
                </Item>
                <Item>
                    <Button>
                        <Icon src={ringIcon}></Icon>
                    </Button>
                    <Text>提醒</Text>
                    <CommonPopover
                        text={
                            watch('mentionDate')
                                ? dayjs(watch('mentionDate')).format(
                                      'YYYY/MM/DD'
                                  )
                                : '無'
                        }
                        isOpen={isMentionDateOpen}
                        onClick={() => {
                            setIsMentionDateOpen(!isMentionDateOpen)
                        }}
                    >
                        <HomeCalender
                            selectCacheDate={watch('cacheMentionDate')}
                            onSelectDataUpdate={(data) => {
                                setValue('cacheMentionDate', data)
                            }}
                        />
                        <CommonButton
                            color="green"
                            onClick={() => {
                                setValue(
                                    'mentionDate',
                                    watch('cacheMentionDate')
                                )
                                setIsMentionDateOpen(!isMentionDateOpen)
                            }}
                            type="block"
                        >
                            關閉
                        </CommonButton>
                    </CommonPopover>
                </Item>
            </List>
            <Line></Line>
            <List>
                <SubTaskList>
                    {watch('subtasks').map((item, index) => (
                        <SubTaskItem key={index}>
                            <HomePlayer taskId={selectUpdateTask.id} />
                            {item}
                        </SubTaskItem>
                    ))}
                </SubTaskList>
                <Item>
                    <CommonInput
                        errorMessage=""
                        label="cacheSubtask"
                        register={register}
                        attributes={{ placeholder: '輸入子任務名稱' }}
                    />
                    <Button
                        onClick={() => {
                            if (!watch('cacheSubtask')) return
                            const data = [
                                ...watch('subtasks'),
                                watch('cacheSubtask'),
                            ]
                            setValue('subtasks', data)
                            setValue('cacheSubtask', '')
                        }}
                    >
                        <AddImg src={AddIcon} />
                    </Button>
                </Item>
            </List>
            <Line></Line>
            <Textarea
                placeholder="填寫內容"
                {...register('description')}
            ></Textarea>
            <Line></Line>
            <Item as="div" lastNotFloat={true} alignItems="space-between">
                <Button
                    onClick={() => {
                        dispatch(setUpdateSelectTaskId(null))
                    }}
                >
                    <Icon src={viewIcon}></Icon>
                </Button>
                <Text>
                    創建於{' '}
                    {dayjs(selectUpdateTask.createAt).format('YYYY/MM/DD')} 日
                </Text>
                <Button
                    onClick={() => {
                        dispatch(deleteTask(selectUpdateTask.id))
                        dispatch(setUpdateSelectTaskId(null))
                        if (selectCountdownTaskId === selectUpdateTask.id) {
                            dispatch(breakCountdown())
                        }
                    }}
                >
                    <Icon src={trashIcon}></Icon>
                </Button>
            </Item>
        </EditForm>
    )
}

export default HomeEditForm
