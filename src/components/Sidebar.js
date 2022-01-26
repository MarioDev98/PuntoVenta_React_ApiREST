import React from 'react';
import * as FaIcons from "react-icons/fa";

export const Sidebar = [
    {
     title:'Inicio',
     path: '/inicio',
     icon: <FaIcons.FaHome/>,
     cName: 'nav-text'
    },
    {
        title:'Ventas',
        path: '/ventas',
        icon: <FaIcons.FaHandHoldingUsd/>,
        cName: 'nav-text'
    },
    {
        title:'Compras',
        path: '/compras',
        icon: <FaIcons.FaHands/>,
        cName: 'nav-text'
    },
    
  
    
    {
        title:'Cat. Productos',
        path: '/productos',
        icon: <FaIcons.FaSpellCheck/>,
        cName: 'nav-text'
    },
    {
        title:'Cat. Clientes',
        path: '/cliente',
        icon: <FaIcons.FaUserFriends/>,
        cName: 'nav-text'
    },
    {
        title:'Cat. Proveedores',
        path: '/proveedor',
        icon: <FaIcons.FaUserTie/>,
        cName: 'nav-text'
    },
    {
        title:'Historial Ventas',
        path: '/ganancias',
        icon: <FaIcons.FaPiggyBank/>,
        cName: 'nav-text'
    }
]