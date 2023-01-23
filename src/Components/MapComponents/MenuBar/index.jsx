import styled from 'styled-components'
import list from '../../../assets/list.png'

const ListIcon = styled.img`
    /* position: absolute; */
    width: 30px;
    /* height: 35px; */
    margin: 10px;
    margin-top: 17px;
    cursor: pointer;
    z-index: 700;
`

const MenuWrapper = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    width: 60px;
    height: 100vh;
    background-color: #f8f8f4;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    /* background-color: orange; */
    z-index: 700;

    box-shadow: ${(props) =>
        props.isSideBarOpened ? '0px 0px 0px gray' : '0px 0px 10px gray'};
    border-right: ${(props) =>
        props.isSideBarOpened ? '.2px solid #a0a0a0' : '0px 0px 10px gray'};
`

const LanguageContainer = styled.div`
    font-family: sans-serif;
    font-size: 13px;
    color: #292929;
    font-weight: 200;
    margin: 10px;
    display: flex;
    justify-content: space-between;
`
const LanguageButton = styled.div`
    margin: 5px;
    user-select: none;

    cursor: pointer;
`

function MenuBar({ isSideBarOpened, setSideBarOpened, setItemsDisplayed }) {
    function handleToggleSideBar() {
        const barState = isSideBarOpened
        setSideBarOpened(!barState)
        setItemsDisplayed(20)
    }
    return (
        <MenuWrapper isSideBarOpened={isSideBarOpened}>
            <ListIcon src={list} onClick={handleToggleSideBar}></ListIcon>
            <LanguageContainer>
                <LanguageButton>EN</LanguageButton>
                <LanguageButton>JP</LanguageButton>
            </LanguageContainer>
        </MenuWrapper>
    )
}

export default MenuBar
