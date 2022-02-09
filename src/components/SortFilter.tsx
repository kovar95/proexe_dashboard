import React from 'react';
import { useDispatch } from 'react-redux';
import { sortUsers } from '../store/ActionCreators';
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import useToggle from '../hooks/useToggle';

const SortFilter = () => {
  const [isSortButtonOpened, toggleSortButton] = useToggle();
  const dispatch = useDispatch();

  const onSortUsers = (sortIndex: number) => {
    dispatch(sortUsers(sortIndex));
  };

  return (
    <ButtonDropdown isOpen={isSortButtonOpened} toggle={toggleSortButton}>
      <DropdownToggle caret>Sort users</DropdownToggle>
      <DropdownMenu>
        <DropdownItem onClick={() => onSortUsers(-1)}>Ascending</DropdownItem>
        <DropdownItem onClick={() => onSortUsers(1)}>Descending</DropdownItem>
      </DropdownMenu>
    </ButtonDropdown>
  );
};

export default SortFilter;
