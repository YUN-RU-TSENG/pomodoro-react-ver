import styled from 'styled-components'
import AddIcon from '../../assets/images/add--v1.png'

const AddTask = styled.div`
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

const Input = styled.input`
    flex: 1 1 auto;
    font-size: 16px;
    light-height: 24px;
    padding: 4px;
`

const Line = styled.div`
    width: 1px;
    background: #cfcfcf;
    height: 20px;
`

const Button = styled.button`
    padding: 4px;
    border-radius: 4px;
`

function HomeAddTask() {
    return (
        <AddTask>
            <Add>
                <AddImg src={AddIcon} />
            </Add>
            <Input />
            <Button>按鈕</Button>
            <Button>按鈕</Button>
            <Line></Line>
            <Button>按鈕</Button>
        </AddTask>
    )
}

export default HomeAddTask
