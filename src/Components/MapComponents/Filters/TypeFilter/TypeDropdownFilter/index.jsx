import styled from 'styled-components'
import arrow from '../../../../../assets/down.png'

import { useContext } from 'react'
import { useLanguage } from '../../../../../utils/Hooks/Language'
import { ShopsDataContext } from '../../../../../utils/Context/ShopsDataContext'
import { FiltersMenuContext } from '../../../../../utils/Context/FiltersMenuContext'
import { UserInterfaceContext } from '../../../../../utils/Context/UserInterfaceContext'
import TypeDropdownEntry from '../TypeDropdownEntry'
import layout from '../../../../../utils/Style/Layout'
import colors from '../../../../../utils/Style/Colors'
import font from '../../../../../utils/Style/Font'
import { devices } from '../../../../../utils/Style/Layout'

const TypeDropdownButton = styled.div`
    height: 37px;
    /* line-height: 3px; */
    border-radius: 20px;
    font-size: 16px;
    user-select: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    pointer-events: auto;
    padding-right: 10px;
    padding-left: 10px;
    box-shadow: 0px 0px 10px gray;
    z-index: 500;
    position: relative;
    flex-shrink: 0;
    flex-grow: 1;
    flex-basis: 40%;
    transform-style: preserve-3d;

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
    width: calc(100% - 20px);

    font-size: 13px;
    color: ${colors.primaryText};
    background-color: ${colors.primaryBackground};
    border-radius: ${layout.slightBorderRadius};
    position: absolute;
    padding: 5px;
    top: 27px;
    left: 5px;
    padding-top: 15px;
    display: flex;
    flex-direction: column;
    box-shadow: 0px 0px 10px gray;
    pointer-events: auto;
    transform: translateZ(-10px);
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

    const { currentLanguage } = useLanguage()

    return (
        <TypeDropdownButton onClick={toggleDropdown} type={filteredType.ID}>
            {filteredType[currentLanguage.ID]}
            <ArrowDownIcon
                src={arrow}
                title="Down-arroarrow-downw"
                type={filteredType.ID}
            ></ArrowDownIcon>
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
        </TypeDropdownButton>
    )
}

export default TypeDropdownFilter
