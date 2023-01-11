import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { useSelector, useDispatch } from 'react-redux'
import { postTask } from '../../../features/tasks/tasksSlice'
import { useState } from 'react'
import { covertPomodoroQuantityToSecond } from '../../../utils/covertBetweenSecondAndPomodoro'

import styled from 'styled-components'
import AddIcon from '../../../assets/images/add--v1.png'

import CommonInput from '../../Common/CommonInput/CommonInput'
import CommonPopover from '../../Common/CommonPopover/CommonPopover'
import CommonButton from '../../Common/CommonButton/CommonButton'
import CommonDropdown from '../../Common/CommonDropdown/CommonDropdown'

const AddTask = styled.form`
    padding: 8px;
    border-radius: 4px;
    display: flex;
    background: #fff;
    box-shadow: 0px 0px 4px #ededed;
    margin-bottom: 24px;
    align-items: center;

    > *:not(:first-child) {
        margin-left: 8px;
    }
`

const Add = styled.button`
    flex: 0 1 auto;
`

const AddImg = styled.img`
    width: 24px;
    vertical-align: middle;
`

const Input = styled(CommonInput)`
    flex: 1 1 auto;
    font-size: 16px;
    light-height: 24px;
    padding: 4px;
    width: auto;

    input {
        text-align: left;
    }
`

const Line = styled.div`
    width: 1px;
    background: #cfcfcf;
    height: 20px;
`

const schema = yup.object({
    name: yup.string().required(),
    totalExpectTime: yup.number().min(0),
    folder: yup.string(),
})

function HomeAddTask() {
    const [isTotalExpectTimePopoverOpen, setIsTotalExpectTimePopoverOpen] =
        useState(false)
    const [isFolderPopoverOpen, setIsFolderPopoverOpen] = useState(false)
    const folders = useSelector((state) => state.folders.folders)
    const pomodoroOfPomodoroSettingStore = useSelector(
        (state) => state.pomodoroSetting.pomodoroSetting.pomodoro
    )

    const dispatch = useDispatch()

    const { register, handleSubmit, setValue, watch, reset } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            name: '',
            totalExpectTime: 0,
            folder: '',
        },
    })

    const onSubmit = handleSubmit((formData) => {
        dispatch(
            postTask({
                ...formData,
                totalExpectTime: covertPomodoroQuantityToSecond(
                    pomodoroOfPomodoroSettingStore,
                    formData.totalExpectTime
                ),
            })
        )
        reset()
    })

    return (
        <AddTask>
            <Add onClick={onSubmit} type="submit">
                <AddImg src={AddIcon} />
            </Add>
            <Input
                attributes={{ placeholder: '輸入任務名稱' }}
                label="name"
                register={register}
            />
            <CommonPopover
                text={watch('totalExpectTime') || 'pomodoro'}
                isOpen={isTotalExpectTimePopoverOpen}
                onClick={() =>
                    setIsTotalExpectTimePopoverOpen(
                        !isTotalExpectTimePopoverOpen
                    )
                }
            >
                <CommonInput
                    label="totalExpectTime"
                    register={register}
                    attributes={{
                        type: 'number',
                        min: 0,
                        placeholder: '輸入任務番茄數量',
                    }}
                />
                <CommonButton
                    color="green"
                    onClick={() =>
                        setIsTotalExpectTimePopoverOpen(
                            !isTotalExpectTimePopoverOpen
                        )
                    }
                    type="block"
                >
                    關閉
                </CommonButton>
            </CommonPopover>
            <Line></Line>
            <CommonPopover
                text={watch('folder') || 'folder'}
                isOpen={isFolderPopoverOpen}
                onClick={() => setIsFolderPopoverOpen(!isFolderPopoverOpen)}
            >
                <CommonDropdown
                    items={folders.map((item) => item.name)}
                    selectItem={watch('folder')}
                    updateSelectItem={(value) => setValue('folder', value)}
                />
                <CommonButton
                    color="green"
                    onClick={() => setIsFolderPopoverOpen(!isFolderPopoverOpen)}
                    type="block"
                >
                    關閉
                </CommonButton>
            </CommonPopover>
        </AddTask>
    )
}

HomeAddTask.propTypes = {}

HomeAddTask.defaultProps = {}

export default HomeAddTask
