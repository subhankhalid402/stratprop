-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Feb 07, 2021 at 08:44 AM
-- Server version: 8.0.18
-- PHP Version: 7.4.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `startonline`
--

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
CREATE TABLE IF NOT EXISTS `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
)

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 1, 'APP', '419c52809d7a8ea9da1da30519d68278b6864b7021cefd140218e997a49c391a', '[\"*\"]', NULL, '2021-02-01 01:40:44', '2021-02-01 01:40:44'),
(2, 'App\\Models\\User', 1, 'APP', '02eccd1c71981f5a5fe6f8815013a41fb9599a6a89a3fed798ac95f11563c8f5', '[\"*\"]', NULL, '2021-02-01 01:40:51', '2021-02-01 01:40:51'),
(3, 'App\\Models\\User', 1, 'APP', 'eede5bda3a9b0ab0b134b870694b19541aae8355c186c2ff4f05899dc51a8953', '[\"*\"]', NULL, '2021-02-01 01:41:27', '2021-02-01 01:41:27'),
(4, 'App\\Models\\User', 1, 'APP', '27892b1db81c757ec34cb1cb392e5bb4c7d1414d27076362124bf2d0199114cd', '[\"*\"]', NULL, '2021-02-01 01:41:35', '2021-02-01 01:41:35'),
(5, 'App\\Models\\User', 1, 'APP', 'de9240cda5be0e41af71afcc096e76e1a841e9cab7a59658e7ff8d96923c9c0c', '[\"*\"]', '2021-02-01 01:43:14', '2021-02-01 01:42:40', '2021-02-01 01:43:14'),
(6, 'App\\Models\\User', 93, 'APP', 'f6947dab78608ec58f415b71bebe651326b1c08b7c8d062271878b16dfe4e643', '[\"*\"]', NULL, '2021-02-02 01:38:07', '2021-02-02 01:38:07'),
(7, 'App\\Models\\User', 93, 'APP', '3981573fb29213b3246b6657d36b79b40506d2ef5e81814cdab163172f2ace7a', '[\"*\"]', NULL, '2021-02-02 01:41:51', '2021-02-02 01:41:51'),
(8, 'App\\Models\\User', 93, 'APP', 'efc166178e9813d4558fcb96e92d04b646932d193912331fe0c9882f12ad3e64', '[\"*\"]', '2021-02-02 01:48:19', '2021-02-02 01:45:05', '2021-02-02 01:48:19'),
(9, 'App\\Models\\User', 93, 'APP', '47fb320ff85a770faff793a7458a7bb4b26b5c5d7dd9f78dcb952ac0c929522f', '[\"*\"]', '2021-02-02 02:07:26', '2021-02-02 02:07:08', '2021-02-02 02:07:26'),
(10, 'App\\Models\\User', 93, 'APP', 'c4da55330ce73fdb05fb6d60acd8b71f3440eee3b856ec1d68205d5f244d15f6', '[\"*\"]', '2021-02-02 02:40:17', '2021-02-02 02:39:14', '2021-02-02 02:40:17'),
(11, 'App\\Models\\User', 93, 'APP', '6791197db64088281e4ca6f3bddb0f6a73bc14feba4969eaf7cb638273308a7f', '[\"*\"]', '2021-02-07 02:43:39', '2021-02-06 13:57:25', '2021-02-07 02:43:39');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
