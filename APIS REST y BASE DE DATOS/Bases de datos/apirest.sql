-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 21-06-2021 a las 19:45:17
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
-- Base de datos: `apirest`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `citas`
--

CREATE TABLE `citas` (
  `CitaId` int(11) NOT NULL,
  `PacienteId` varchar(45) DEFAULT NULL,
  `Fecha` varchar(45) DEFAULT NULL,
  `HoraInicio` varchar(45) DEFAULT NULL,
  `HoraFIn` varchar(45) DEFAULT NULL,
  `Estado` varchar(45) DEFAULT NULL,
  `Motivo` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `citas`
--

INSERT INTO `citas` (`CitaId`, `PacienteId`, `Fecha`, `HoraInicio`, `HoraFIn`, `Estado`, `Motivo`) VALUES
(1, '1', '2020-06-09', '08:30:00', '09:00:00', 'Confirmada', 'El paciente presenta un leve dolor de espalda'),
(2, '2', '2020-06-10', '08:30:00', '09:00:00', 'Confirmada', 'Dolor en la zona lumbar '),
(3, '3', '2020-06-18', '09:00:00', '09:30:00', 'Confirmada', 'Dolor en el cuello');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pacientes`
--

CREATE TABLE `pacientes` (
  `PacienteId` int(11) NOT NULL,
  `DNI` varchar(45) DEFAULT NULL,
  `Nombre` varchar(150) DEFAULT NULL,
  `Direccion` varchar(45) DEFAULT NULL,
  `CodigoPostal` varchar(45) DEFAULT NULL,
  `Telefono` varchar(45) DEFAULT NULL,
  `Genero` varchar(45) DEFAULT NULL,
  `FechaNacimiento` date DEFAULT NULL,
  `Correo` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `pacientes`
--

INSERT INTO `pacientes` (`PacienteId`, `DNI`, `Nombre`, `Direccion`, `CodigoPostal`, `Telefono`, `Genero`, `FechaNacimiento`, `Correo`) VALUES
(1, 'A000000001', 'Juan Carlos Medina', 'Calle de pruebas 1', '20001', '633281515', 'M', '1989-03-02', 'Paciente1@gmail.com'),
(2, 'B000000002', 'Daniel Rios', 'Calle de pruebas 2', '20002', '633281512', 'M', '1990-05-11', 'Paciente2@gmail.com'),
(3, 'C000000003', 'Marcela Dubon', 'Calle de pruebas 3', '20003', '633281511', 'F', '2000-07-22', 'Paciente3@gmail.com'),
(4, 'D000000004', 'Maria Mendez', 'Calle de pruebas 4', '20004', '633281516', 'F', '1980-01-01', 'Paciente4@gmail.com'),
(5, 'E000000005', 'Zamuel Valladares', 'Calle de pruebas 5', '20006', '633281519', 'M', '1985-12-15', 'Paciente5@gmail.com'),
(6, 'F000000006', 'Angel Rios', 'Calle de pruebas 6', '20005', '633281510', 'M', '1988-11-30', 'Paciente6@gmail.com');

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
(2, 'admin', 'e10adc3949ba59abbe56e057f20f883e', 'Activo'),
(3, 'usuario3@gmail.com', 'e10adc3949ba59abbe56e057f20f883e', 'Activo'),
(4, 'usuario4@gmail.com', 'e10adc3949ba59abbe56e057f20f883e', 'Activo'),
(5, 'usuario5@gmail.com', 'e10adc3949ba59abbe56e057f20f883e', 'Activo'),
(6, 'usuario6@gmail.com', 'e10adc3949ba59abbe56e057f20f883e', 'Activo'),
(7, 'usuario7@gmail.com', 'e10adc3949ba59abbe56e057f20f883e', 'Inactivo'),
(8, 'usuario8@gmail.com', 'e10adc3949ba59abbe56e057f20f883e', 'Inactivo'),
(9, 'usuario9@gmail.com', 'e10adc3949ba59abbe56e057f20f883e', 'Inactivo'),
(10, 'mario', 'mario', 'Activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios_token`
--

CREATE TABLE `usuarios_token` (
  `TokenId` int(11) NOT NULL,
  `UsuarioId` varchar(45) DEFAULT NULL,
  `Token` varchar(45) DEFAULT NULL,
  `Estado` varchar(45) CHARACTER SET armscii8 DEFAULT NULL,
  `Fecha` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios_token`
--

INSERT INTO `usuarios_token` (`TokenId`, `UsuarioId`, `Token`, `Estado`, `Fecha`) VALUES
(1, '1', '86db5e39c7c3c2ed16639b8cf0ef0f42', 'Activo', '2021-04-14 04:58:00'),
(2, '1', '4a8c7ac63156fc04302f8b5568caf749', 'Activo', '2021-04-14 08:02:00'),
(3, '1', '21d14c8c5b07fa736e4d740791cb103b', 'Activo', '2021-04-14 08:04:00'),
(4, '1', '55f577eec26a8951c956eda41b842d78', 'Activo', '2021-04-14 08:09:00'),
(5, '1', '8c38189b911a357cfa2934d223d71eac', 'Activo', '2021-04-14 08:24:00'),
(6, '1', '632a437646b762471f22c39bd3f2f64a', 'Activo', '2021-04-14 08:24:00'),
(7, '1', '6b83f12ec31c25bd5af8ef6255b82453', 'Activo', '2021-04-14 08:37:00'),
(8, '1', '17ade63fedde723e6160fc252274ad9f', 'Activo', '2021-04-14 08:38:00'),
(9, '1', '52212760fcaae3f8fa1f300f930efbdd', 'Activo', '2021-04-14 08:38:00'),
(10, '1', 'e52202ff31bc2fc4e53e40fccc6f4beb', 'Activo', '2021-04-14 08:38:00'),
(11, '1', 'ce9b7b86040c43a27847ce94e0058b7e', 'Activo', '2021-04-14 08:38:00'),
(12, '1', 'c91668322f505871a3b56df1d8050069', 'Activo', '2021-04-14 08:38:00'),
(13, '1', '8efbb86b435dac620987c7ca4815b766', 'Activo', '2021-04-14 08:40:00'),
(14, '1', '27edae63a9449ff0d0ae625385cc1aed', 'Activo', '2021-04-14 08:41:00'),
(15, '1', 'dfb990bc00f123070b44f53c63761c6e', 'Activo', '2021-04-14 08:44:00'),
(16, '1', '98ec556ce5ec6a1c6af0738e3f1e13ae', 'Activo', '2021-04-14 08:44:00'),
(17, '1', 'f436830b2441bdfbd17c6cdf84d2ff5f', 'Activo', '2021-04-14 08:44:00'),
(18, '1', '769143b6add28b1d7eac28aa430d9db1', 'Activo', '2021-04-14 08:44:00'),
(19, '1', '0ff747e93846adb37bf125ac0b82bd21', 'Activo', '2021-04-14 08:44:00'),
(20, '1', '80aa1189874323aad1faab159a5dfa4a', 'Activo', '2021-04-14 08:47:00'),
(21, '1', '47cb1ebdf16fe137fe4982d2da34a7c0', 'Activo', '2021-04-14 08:47:00'),
(22, '1', '40cea1f671214e5f09384e8e09ea54a6', 'Activo', '2021-04-14 08:51:00'),
(23, '2', '4910b3eff833fb2b21ed76296001f31f', 'Activo', '2021-04-14 09:08:00'),
(24, '2', '70f6d5d22b5c3f421e69dffbfcf7f87f', 'Activo', '2021-04-14 09:09:00'),
(25, '2', '4befbe2d9039593cd5586c47ba9db840', 'Activo', '2021-04-14 09:09:00'),
(26, '2', '5724816f42c7bf2624a11c37538f3b22', 'Activo', '2021-04-14 09:18:00'),
(27, '2', '5915718e68fe5d2162c2dc650c60725d', 'Activo', '2021-04-14 19:15:00'),
(28, '2', 'dd54761b8ac976aba272cf0fb974e040', 'Activo', '2021-04-14 20:53:00'),
(29, '2', 'afebe7c12875fdff0b2a73f1b9e5d94a', 'Activo', '2021-04-28 04:23:00'),
(30, '2', '602503076a99c8a3ded22a53b6b6b068', 'Activo', '2021-04-28 04:23:00'),
(31, '2', '9cd5647aa609fe1c8cb9ecdf098e6001', 'Activo', '2021-04-28 05:31:00'),
(32, '2', '68695ef31cdf177faca9bf083c23644c', 'Activo', '2021-04-28 05:31:00'),
(33, '2', '74458528a217e9997bd3a7f2c4776ca1', 'Activo', '2021-04-28 08:21:00'),
(34, '2', 'e2a4c6e41da8de5984e41238cbabc5be', 'Activo', '2021-05-03 19:55:00'),
(35, '2', 'f5e26043492b6c0d95c9dd6f6f753685', 'Activo', '2021-05-04 19:50:00'),
(36, '2', '5052beea6483e2d0739a13714258f607', 'Activo', '2021-05-04 19:50:00'),
(37, '2', '983a384d59b2c17185069f9ad62d1d4c', 'Activo', '2021-05-10 19:56:00'),
(38, '2', '4ddf7391c1393174aa610c1a5d58fe93', 'Activo', '2021-05-10 19:56:00'),
(39, '2', 'd3e5b26019b9c4b6380b9c23d5fa3f8d', 'Activo', '2021-05-23 06:06:00'),
(40, '2', '9893a2001b556e2706a392e080182e25', 'Activo', '2021-05-23 08:56:00'),
(41, '2', '0c8b44cb9d91e6f84092d37ffff1f8f0', 'Activo', '2021-06-13 02:16:00'),
(42, '2', '82ac3d0c04f8894556c58f44fa618ad6', 'Activo', '2021-06-14 07:20:00'),
(43, '2', '53fe24e5dc41c7ef81aaa56641c8122e', 'Activo', '2021-06-15 03:19:00'),
(44, '2', '7f2f021e7cc33e4ec3a6e47792cca2b4', 'Activo', '2021-06-15 03:19:00'),
(45, '2', '005616152159b86c039251e0cc08d16a', 'Activo', '2021-06-20 03:48:00'),
(46, '2', 'e138dcad053d48d3be4e939335281d8b', 'Activo', '2021-06-20 03:48:00');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `citas`
--
ALTER TABLE `citas`
  ADD PRIMARY KEY (`CitaId`);

--
-- Indices de la tabla `pacientes`
--
ALTER TABLE `pacientes`
  ADD PRIMARY KEY (`PacienteId`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`UsuarioId`);

--
-- Indices de la tabla `usuarios_token`
--
ALTER TABLE `usuarios_token`
  ADD PRIMARY KEY (`TokenId`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `citas`
--
ALTER TABLE `citas`
  MODIFY `CitaId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `pacientes`
--
ALTER TABLE `pacientes`
  MODIFY `PacienteId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `UsuarioId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `usuarios_token`
--
ALTER TABLE `usuarios_token`
  MODIFY `TokenId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
