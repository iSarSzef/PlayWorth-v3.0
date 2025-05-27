-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Maj 27, 2025 at 10:47 PM
-- Wersja serwera: 10.4.32-MariaDB
-- Wersja PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `playworth`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users`
--

CREATE TABLE `users` (
  `id_u` int(11) NOT NULL,
  `login` varchar(30) DEFAULT NULL,
  `mail` varchar(50) DEFAULT NULL,
  `password_hashed` varchar(255) DEFAULT NULL,
  `saldo` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id_u`, `login`, `mail`, `password_hashed`, `saldo`) VALUES
(1, 'admin', 'playworth777@gmail.com', '$2y$10$1WvaCcLeFW603SnNyV6atOj8swLcHH75sa0C243wvw5QFmUoH9o3a', 99957.75),
(2, 'ric4rdo5', 'ryszardisarspikowski@gmail.com', '$2y$10$lo9v5EqnYPeFBjC9xcyi9OllpoxMdoWhD2sH/cebk./MG.b5tnL3.', 2261.44),
(3, 'sfctrw', 'alpacino@gmail.com', '$2y$10$vQ1xYboFOntkxtv9kOZqke395zW.u7FXgG7XVi2XtOjbJ96J4.tb6', 0.000000000000054567461660326),
(4, 'vanilla', 'supersigiemka@gmail.com', '$2y$10$dgCWqcOMDQjR7ssTd1ccIOMAN7brZnDIjvLqOUbcuCBGvUP..Rz6q', 636.5),
(6, 'test', 'banan@gmail.com', '$2y$10$.TbJDin7OUj0lVitNp/se.te/9FGC2WwXsijrsS5kqHn.DMNu9XyS', 215330),
(7, 'kupadupa', 'kubapoducha@gmail.com', '$2y$10$V9gQPVopvBWq5Bo39T/tfeUsc4kO3PvJhEqtTjPHFFZqE1pOkyW1q', 10904.55);

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_u`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id_u` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
