import styled from 'styled-components'
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
    align-items: center;
    justify-content: ${(props) => props.alignItems};

    ${(props) => {
        return (
            props.lastNotFloat ??
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
    margin-right: 8px;
    vertical-align: middle;
`

const Button = styled.button`
    flex: 0 1 auto;
    line-height:12px;
`

const Textarea = styled.textarea``

const Line = styled.div`
    height: 1px;
    background: #ededed;
    margin: 8px 0px;
`

function HomeEditForm() {
    return (
        <EditForm>
            <Item as="div" alignItems="space-between">
                <Checkbox></Checkbox>
                <Checkbox></Checkbox>
                <Text>番茄時鐘</Text>
                <Button>1/10</Button>
            </Item>
            <Line></Line>
            <List>
                <Item>
                    <Button>
                        <Icon src={clockIcon}></Icon>
                    </Button>
                    <Text>番茄鐘</Text>
                    <Button>02/02</Button>
                </Item>
                <Item>
                    <Button>
                        <Icon src={calenderIcon}></Icon>
                    </Button>
                    <Text>預計完成日</Text>
                    <Button>2022/02/02</Button>
                </Item>
                <Item>
                    <Button>
                        <Icon src={fileIcon}></Icon>
                    </Button>
                    <Text>資料夾</Text>
                    <Button>無</Button>
                </Item>
                <Item>
                    <Button>
                        <Icon src={ringIcon}></Icon>
                    </Button>
                    <Text>提醒</Text>
                    <Button>無</Button>
                </Item>
            </List>
            <Line></Line>
            <List>
                <Item>
                    <Checkbox></Checkbox>
                    <Checkbox></Checkbox>
                    <Text>文字內容</Text>
                </Item>
            </List>
            <Line></Line>
            <Textarea placeholder="填寫內容"></Textarea>
            <Line></Line>
            <Item as="div" lastNotFloat={true} alignItems="space-between">
                <Button>
                    <Icon src={viewIcon}></Icon>
                </Button>
                <Text>創建於 2022年12月20日</Text>
                <Button>
                    <Icon src={trashIcon}></Icon>
                </Button>
            </Item>
        </EditForm>
    )
}

export default HomeEditForm
