import styled from 'styled-components'
import arrow from '../../../../../assets/down.png'

import { useContext } from 'react'
import { ShopsDataContext } from '../../../../../utils/Context/ShopsDataContext'
import { FiltersMenuContext } from '../../../../../utils/Context/FiltersMenuContext'
import { UserInterfaceContext } from '../../../../../utils/Context/UserInterfaceContext'
import TypeDropdownEntry from '../TypeDropdownEntry'

const TypeDropdownButton = styled.div`
    height: 37px;
    min-width: 130px;
    line-height: 13px;
    background-color: #f8f8f4;

    z-index: 500;
    border-radius: 20px;
    color: #292929;
    font-family: sans-serif;
    font-size: 13px;
    font-weight: 200;
    user-select: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    padding-right: 10px;
    box-shadow: 0px 0px 10px gray;
    z-index: 500;
    position: relative;
    margin-right: 40px;
    padding-left: 10px;
    background-color: ${(props) =>
        props.type !== 'all' ? '#b2bdca' : '#f8f8f4'};

    text-shadow: ${(props) =>
        props.type !== 'all' ? '-0.1px 0 #fff, 0.1px 0 #fff' : null};

    color: ${(props) => (props.type !== 'all' ? 'white' : '#292929')};
`
const DropdownMenu = styled.div`
    width: 120px;
    height: 124px;
    font-family: sans-serif;
    font-size: 13px;
    color: #292929;
    font-weight: 200;
    background-color: #f8f8f4;
    border-radius: 5px;
    position: absolute;
    padding: 5px;
    padding-top: 15px;
    display: flex;
    flex-direction: column;
    box-shadow: 0px 0px 10px gray;
    transform: translateY(82px) translateX(177px);
`

const ArrowDownIcon = styled.img`
    width: 15px;
    &:hover {
        background-color: #00000015;
    }
    border-radius: 15px;
    padding: 5px;
    margin-left: -5px;
    margin-right: -5px;
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
