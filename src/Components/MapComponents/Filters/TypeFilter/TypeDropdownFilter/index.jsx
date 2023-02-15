import styled from 'styled-components'
import arrow from '../../../../../assets/down.png'

import { useContext } from 'react'
import { ShopsDataContext } from '../../../../../utils/Context/ShopsDataContext'
import { FiltersMenuContext } from '../../../../../utils/Context/FiltersMenuContext'
import { UserInterfaceContext } from '../../../../../utils/Context/UserInterfaceContext'
import TypeDropdownEntry from '../TypeDropdownEntry'
import layout from '../../../../../utils/Style/Layout'
import colors from '../../../../../utils/Style/Colors'
import font from '../../../../../utils/Style/Font'

const TypeDropdownButton = styled.div`
    height: 37px;
    width: calc(((${layout.SideBarWidth} - 30px) / 2) - 40px);
    line-height: 13px;
    border-radius: 20px;
    font-size: ${font.textSize};
    user-select: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    padding-right: 10px;
    padding-left: 10px;
    box-shadow: 0px 0px 10px gray;
    z-index: 500;
    position: relative;
    margin-right: 40px;
    flex-shrink: 0;

    background-color: ${(props) =>
        props.type !== 'all'
            ? colors.activeBackground
            : colors.primaryBackground};

    text-shadow: ${(props) =>
        props.type !== 'all' ? '-0.1px 0 #fff, 0.1px 0 #fff' : null};

    color: ${(props) =>
        props.type !== 'all' ? colors.activeText : colors.primaryText};
`
const DropdownMenu = styled.div`
    width: calc(((${layout.SideBarWidth} - 30px) / 2) - 40px);
    height: 124px;
    font-size: 13px;
    color: ${colors.primaryText};
    background-color: ${colors.primaryBackground};
    border-radius: ${layout.slightBorderRadius};
    position: absolute;
    padding: 5px;
    padding-top: 15px;
    display: flex;
    flex-direction: column;
    box-shadow: 0px 0px 10px gray;
    transform: translateY(82px)
        translateX(calc(((${layout.SideBarWidth} - 30px) / 2) + 20px));
`

const ArrowDownIcon = styled.img`
    width: 15px;
    padding: 5px;
    margin-right: -5px;
    border-radius: 15px;

    &:hover {
        background-color: #00000015;
    }
    filter: ${(props) =>
        props.type !== 'all'
            ? ' drop-shadow(.2px .2px 0px #fff) brightness(0) invert(1) '
            : null};
`

function TypeDropdownFilter() {
    const { filteredType } = useContext(ShopsDataContext)
    const { TypesMenu } = useContext(FiltersMenuContext)
    const { isDropdownOpen, toggleDropdown } = useContext(UserInterfaceContext)

    return (
        <>
            <TypeDropdownButton onClick={toggleDropdown} type={filteredType.ID}>
                {filteredType.ENGLISH}
                <ArrowDownIcon
                    src={arrow}
                    title="Down-arroarrow-downw"
                    type={filteredType.ID}
                ></ArrowDownIcon>
            </TypeDropdownButton>
            {isDropdownOpen && (
                <DropdownMenu>
                    {TypesMenu.map((type, index) => (
                        <TypeDropdownEntry
                            key={index}
                            TYPE={type}
                        ></TypeDropdownEntry>
                    ))}
                </DropdownMenu>
            )}
        </>
    )
}

export default TypeDropdownFilter
