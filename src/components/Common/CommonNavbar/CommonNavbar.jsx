import styled from 'styled-components'
import avatarIcon from '../../../assets/images/external-User-users-those-icons-fill-those-icons-3.png'
import graphIcon from '../../../assets/images/combo-chart--v1.png'
import ringIcon from '../../../assets/images/bell--v1.png'
import homeIcon from '../../../assets/images/home-page.png'
import settingIcon from '../../../assets/images/external-setting-essentials-pack-tanah-basah-glyph-tanah-basah.png'
import logoutIcon from '../../../assets/images/exit.png'

const Navbar = styled.nav`
    padding: 4px 24px;
    display: flex;
    box-shadow: 0px 0px 4px #ededed;
    align-items: center;
    background: #fff;
`

const Avatar = styled.div``

const AvatarImg = styled.img`
    vertical-align: middle;
    width: 24px;
    margin-right: 6px;
`

const AvatarText = styled.p`
    display: inline-block;
    vertical-align: middle;
    font-size: 14px;
    light-height: 21px;
    font-weight: 400;
`

const LinkList = styled.div`
    margin-left: auto;
`

const LinkItem = styled.a`
    display: inline-block;
    padding: 4px;
    cursor: pointer;

    &:not(:first-child) {
        margin-left: 4px;
    }
`

const LinkItemImage = styled.img`
    vertical-align: middle;
    width: 24px;
`

function CommonNavbar() {
    return (
        <Navbar>
            <Avatar>
                <AvatarImg src={avatarIcon} />
                <AvatarText>test1@test.com</AvatarText>
            </Avatar>
            <LinkList>
                <LinkItem>
                    <LinkItemImage src={graphIcon} />
                </LinkItem>
                <LinkItem>
                    <LinkItemImage src={ringIcon} />
                </LinkItem>
                <LinkItem>
                    <LinkItemImage src={homeIcon} />
                </LinkItem>
                <LinkItem>
                    <LinkItemImage src={settingIcon} />
                </LinkItem>
                <LinkItem>
                    <LinkItemImage src={logoutIcon} />
                </LinkItem>
            </LinkList>
        </Navbar>
    )
}

export default CommonNavbar
