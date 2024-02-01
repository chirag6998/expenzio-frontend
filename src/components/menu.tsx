import React from 'react';
import { AppstoreOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { setToken } from '../store/slices/user';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuItem[] = [

  getItem('MENU', 'sub2', <AppstoreOutlined />, [
    getItem('EDIT BUDGET', '1'),
    getItem('ADD NEW EXPENSES', '2'),
    getItem('VIEW/EDIT YOUR EXPENSES', '3'),
    getItem('HOME', '4'),
    getItem('LOGOUT', '5')
  ]),
];

function MenuComponent () {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onClick: MenuProps['onClick'] = (e) => {
    if (e.key === "1") {
      navigate("/editbudget")
    } else if (e.key === "3") {
      navigate("/expenses")
    } else if (e.key === "4") {
      navigate("/home");
    } else if (e.key === "5") {
      Cookies.remove("Expenzio");
      dispatch(setToken(""));
      navigate("/signin")
    }
  };

  return <Menu onClick={onClick} style={{ width: 220 }} mode="vertical" items={items} />
};

export default MenuComponent;