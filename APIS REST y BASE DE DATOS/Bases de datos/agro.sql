-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 21-06-2021 a las 19:44:44
-- Versión del servidor: 10.4.11-MariaDB
-- Versión de PHP: 7.2.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `agro`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `id` int(11) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `a_paterno` varchar(20) NOT NULL,
  `a_materno` varchar(20) NOT NULL,
  `telefono` varchar(15) NOT NULL,
  `correo` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `compras`
--

CREATE TABLE `compras` (
  `id` int(10) NOT NULL,
  `id_proveedor` int(10) NOT NULL,
  `total` int(20) NOT NULL,
  `nota` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `det_compra`
--

CREATE TABLE `det_compra` (
  `id` int(10) NOT NULL,
  `id_compra` int(10) NOT NULL,
  `id_producto` int(10) NOT NULL,
  `cantidad` int(10) NOT NULL,
  `costo` int(10) NOT NULL,
  `total` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `det_venta`
--

CREATE TABLE `det_venta` (
  `id` int(10) NOT NULL,
  `id_venta` int(10) NOT NULL,
  `id_producto` int(10) NOT NULL,
  `cantidad` int(10) NOT NULL,
  `precio` int(10) NOT NULL,
  `total` int(10) NOT NULL,
  `fecha` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `det_venta`
--

INSERT INTO `det_venta` (`id`, `id_venta`, `id_producto`, `cantidad`, `precio`, `total`, `fecha`) VALUES
(1, 1, 1, 2, 200, 400, '2021-04-12'),
(2, 1, 1, 1, 4, 40, '2021-04-12'),
(3, 2, 1, 2, 200, 400, '2021-04-12'),
(4, 3, 4, 8, 40, 160, '2021-04-12'),
(5, 3, 2, 2, 130, 260, '2021-04-12');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `c_barras` int(10) NOT NULL,
  `costo` int(20) NOT NULL,
  `precio` int(15) NOT NULL,
  `existencia` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `nombre`, `c_barras`, `costo`, `precio`, `existencia`) VALUES
(1, 'Abono', 11111, 120, 200, 10),
(2, 'Pesticida', 22222, 100, 130, 1),
(3, 'Abono Organico', 33333, 122, 344, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proveedores`
--

CREATE TABLE `proveedores` (
  `id` int(11) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `a_paterno` varchar(20) NOT NULL,
  `a_materno` varchar(20) NOT NULL,
  `telefono` varchar(15) NOT NULL,
  `correo` varchar(50) NOT NULL,
  `RFC` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `UsuarioId` int(11) NOT NULL,
  `Usuario` varchar(45) DEFAULT NULL,
  `Password` varchar(45) DEFAULT NULL,
  `Estado` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`UsuarioId`, `Usuario`, `Password`, `Estado`) VALUES
(1, 'usuario1@gmail.com', 'e10adc3949ba59abbe56e057f20f883e', 'Activo'),
(2, 'usuario2@gmail.com', 'e10adc3949ba59abbe56e057f20f883e', 'Activo'),
(3, 'usuario3@gmail.com', 'e10adc3949ba59abbe56e057f20f883e', 'Activo'),
(4, 'usuario4@gmail.com', 'e10adc3949ba59abbe56e057f20f883e', 'Activo'),
(5, 'usuario5@gmail.com', 'e10adc3949ba59abbe56e057f20f883e', 'Activo'),
(6, 'usuario6@gmail.com', 'e10adc3949ba59abbe56e057f20f883e', 'Activo'),
(7, 'usuario7@gmail.com', 'e10adc3949ba59abbe56e057f20f883e', 'Inactivo'),
(8, 'usuario8@gmail.com', 'e10adc3949ba59abbe56e057f20f883e', 'Inactivo'),
(9, 'usuario9@gmail.com', 'e10adc3949ba59abbe56e057f20f883e', 'Inactivo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ventas`
--

CREATE TABLE `ventas` (
  `id` int(10) NOT NULL,
  `total` int(10) NOT NULL,
  `id_cliente` int(10) NOT NULL,
  `fecha` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `ventas`
--

INSERT INTO `ventas` (`id`, `total`, `id_cliente`, `fecha`) VALUES
(1, 200, 0, '2021-04-12'),
(2, 400, 0, '2021-03-10'),
(3, 420, 0, '2021-04-12');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `compras`
--
ALTER TABLE `compras`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `det_compra`
--
ALTER TABLE `det_compra`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `det_venta`
--
ALTER TABLE `det_venta`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `proveedores`
--
ALTER TABLE `proveedores`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`UsuarioId`);

--
-- Indices de la tabla `ventas`
--
ALTER TABLE `ventas`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT de la tabla `compras`
--
ALTER TABLE `compras`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `det_compra`
--
ALTER TABLE `det_compra`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `det_venta`
--
ALTER TABLE `det_venta`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `proveedores`
--
ALTER TABLE `proveedores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `UsuarioId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `ventas`
--
ALTER TABLE `ventas`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
