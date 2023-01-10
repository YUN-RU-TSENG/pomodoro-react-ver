import { createPortal } from 'react-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
    deleteTask,
    setUpdateSelectTaskId,
    isTaskLoading,
    filterTask,
} from '../../../features/tasks/tasksSlice'

import dayjs from 'dayjs'

import CommonLoading from '../../Common/CommonLoading/CommonLoading'
import HomePlayer from '../../Home/HomePlayer/HomePlayer'

import styled from 'styled-components'
import trashIcon from '../../../assets/images/trash--v1.png'

const List = styled.ul`
    position: relative;

    > *:not(:last-child) {
        margin-bottom: 8px;
    }
`

const Icon = styled.img`
    width: 16px;
    margin-right: 8px;
    vertical-align: middle;
`

const Button = styled.button`
    line-height: 12px;
`

const Item = styled.li`
    padding: 8px;
    border-radius: 4px;
    display: flex;
    gap: 0px 12px;
    background: #fff;
    box-shadow: 0px 0px 4px #ededed;
    align-items: center;
    cursor: pointer;
`

const Text = styled.p`
    font-size: 14px;
    light-height: 21px;
`

const Date = styled.p`
    font-size: 14px;
    light-height: 21px;
    margin-left: auto;
`

const PositionLoading = styled(CommonLoading)`
    position: absolute;
`

function HomeList() {
    const tasksStoreTasks = useSelector(filterTask)
    const tasksStoreIsLoadingTask = useSelector(isTaskLoading)

    const dispatch = useDispatch()

    const itemElements = tasksStoreTasks.map((item) => (
        <Item
            key={item.id}
            onClick={() => dispatch(setUpdateSelectTaskId(item.id))}
        >
            <HomePlayer taskId={item.id}></HomePlayer>
            <Text>{item.name}</Text>
            <Date>{dayjs(item.createAt).format('YYYY/MM/DD')}</Date>
            <Button
                onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    dispatch(deleteTask(item.id))
                    dispatch(setUpdateSelectTaskId(null))
                }}
            >
                <Icon src={trashIcon}></Icon>
            </Button>
        </Item>
    ))

    return (
        <List className="home-list">
            {itemElements}
            {tasksStoreIsLoadingTask &&
                createPortal(<PositionLoading />, document.body)}
        </List>
    )
}

HomeList.propTypes = {}

HomeList.defaultProps = {}

export default HomeList

/**
 * 當在 HomeList 以及 HomeEdit 組件內編輯時（由添加的 className 判定是否在元素內），不會自動關閉，在其他部分點擊會關閉面板
 */
// useEffect(() => {
//     const handler = (e) =>
//         ((e, onSelectTaskChange) => {
//             const isInTaskList = !!e.target.closest('.home-list')
//             const isInTaskEditor = !!e.target.closest('.home-edit')

//             if (!isInTaskList && !isInTaskEditor) onSelectTaskChange(null)
//         })(e, onSelectTaskChange)

//     document.addEventListener('click', handler)
//     return () => document.removeEventListener('click', handler)
// }, [])
