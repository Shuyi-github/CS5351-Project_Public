-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 2017-11-24 08:40:07
-- 服务器版本： 10.1.28-MariaDB
-- PHP Version: 7.1.10

SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sag`
--
CREATE DATABASE IF NOT EXISTS `sag` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE sag;

-- --------------------------------------------------------

--
-- 表的结构 `ads`
--

DROP TABLE IF EXISTS `ads`;
CREATE TABLE IF NOT EXISTS `ads` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `FromCampaign` int(11) NOT NULL,
  `Type` int(1) NOT NULL,
  `Cost` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID` (`ID`)
) ;

--
-- 转存表中的数据 `ads`
--

INSERT INTO `ads` (`ID`, `FromCampaign`, `Type`, `Cost`) VALUES
(1, 1, 1, 2000),
(2, 1, 2, 1500),
(3, 2, 1, 2200),
(4, 3, 3, 4000),
(5, 4, 3, 4200),
(6, 5, 1, 3000),
(7, 6, 1, 2500),
(8, 7, 1, 1900),
(9, 8, 1, 4500),
(10, 9, 3, 4700),
(11, 10, 1, 2700),
(12, 10, 3, 3800),
(13, 11, 1, 2100),
(14, 11, 3, 2700),
(15, 12, 3, 3100),
(16, 2, 1, 988),
(17, 2, 1, 998);

-- --------------------------------------------------------

--
-- 表的结构 `authorization`
--

DROP TABLE IF EXISTS `authorization`;
CREATE TABLE IF NOT EXISTS `authorization` (
  `RoleID` int(11) NOT NULL AUTO_INCREMENT,
  `RoleName` varchar(63) NOT NULL,
  `Privilege` int(11) NOT NULL,
  PRIMARY KEY (`RoleID`)
) ;

--
-- 转存表中的数据 `authorization`
--

INSERT INTO `authorization` (`RoleID`, `RoleName`, `Privilege`) VALUES
(0, 'SENIOR MANAGER', 511),
(1, 'MANAGER', 127),
(2, 'CREATIVE STAFF', 35),
(3, 'PURCHASING ASSISSTANT', 19),
(4, 'COMPANY ACCOUNTANT', 7);

-- --------------------------------------------------------

--
-- 表的结构 `campaign`
--

DROP TABLE IF EXISTS `campaign`;
CREATE TABLE IF NOT EXISTS `campaign` (
  `CampaignID` int(11) NOT NULL AUTO_INCREMENT,
  `OwnerClient` int(11) NOT NULL,
  `Title` varchar(63) NOT NULL,
  `StartDate` int(11) DEFAULT NULL,
  `EndDate` int(11) DEFAULT NULL,
  `Status` int(11) NOT NULL,
  `EstimateCost` int(11) DEFAULT NULL,
  `MaterialCost` int(11) DEFAULT NULL,
  `AssignedTeam` int(11) NOT NULL,
  `SerProdCost` int(11) DEFAULT NULL,
  `OtherCost` int(11) DEFAULT NULL,
  `ContactPerson` int(11) DEFAULT NULL,
  PRIMARY KEY (`CampaignID`)
) ;

--
-- 转存表中的数据 `campaign`
--

INSERT INTO `campaign` (`CampaignID`, `OwnerClient`, `Title`, `StartDate`, `EndDate`, `Status`, `EstimateCost`, `MaterialCost`, `AssignedTeam`, `SerProdCost`, `OtherCost`, `ContactPerson`) VALUES
(1, 1, 'BLACK FRIDAY', 1483398000, 1484866800, 0, 0, 23000, 1, 90000, 0, 0),
(2, 2, 'PARIMARY SCHOOL ADMISSION', 1510478013, 1510478023, 0, 11000, 5000, 2, 8000, 1000, 11),
(3, 3, 'INTRODUCE UNIVERSAL BEVERAGES', 1510478073, 1510478083, 2, 100000, NULL, 3, NULL, NULL, 10),
(4, 3, 'PROMOTE UNIVERSAL MILK PRODUCTS', 1, 1, 2, 0, 1000, 4, 1888, 0, 0),
(5, 2, 'HIGH SCHOOL ADMISSIONS', NULL, NULL, 0, 0, 8000, 5, 6500, 0, 0),
(6, 4, 'SALE ON BAKERY ITEMS', 1605135600, 943916400, 2, 0, 200, 5, 200, 0, 0),
(7, 4, 'CUSTOMIZED CAKES FOR EVENTS', 1510478846, 1510478864, 0, NULL, 7000, 7, 9000, NULL, 19),
(8, 6, 'MEMBERSHIP OPEN', 1510478930, NULL, 2, 17000, 15000, 8, NULL, 100, 20),
(9, 6, 'NEW INTERNATIONAL CUISINES', 1510478981, 1510478993, 2, 12000, NULL, 9, NULL, NULL, 16),
(10, 5, '15% OFF ON SELECTED STOCK', 1510479115, 1510479124, 0, 100000, 78000, 10, 11000, 900, 13),
(11, 7, 'NEW DESTINATIONS WORLDWIDE', 1510479400, NULL, 2, 110000, NULL, 11, NULL, NULL, 17),
(12, 7, 'MEMBERSHIP DISCOUNT', 1510479462, NULL, 2, NULL, NULL, 12, NULL, NULL, NULL),
(13, 5, 'NEW COLLECTION LAUNCHED', 0, 1510479554, 0, 99000, 64000, 12, 7500, 1500, 9),
(14, 6, '10% DISCOUNT ON CHINESE CUISINES', 1510479601, 1510479611, 0, 15000, 8700, 14, 7400, 1000, 17),
(15, 3, 'FAMILY DAY PROMO', NULL, NULL, 2, NULL, NULL, 6, NULL, NULL, NULL),
(17, 2, 'AAA BEST AD', 943916400, 943916400, 0, 0, 0, 17, 0, 0, 0),
(18, 5, 'A new', 943916400, 943916400, 0, 0, 0, 18, 0, 0, 0);

-- --------------------------------------------------------

--
-- 表的结构 `campnote`
--

DROP TABLE IF EXISTS `campnote`;
CREATE TABLE IF NOT EXISTS `campnote` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `FromCampaign` int(11) NOT NULL,
  `Poster` int(11) NOT NULL,
  `Note` text NOT NULL,
  `Time` timestamp NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID` (`ID`)
) ;

--
-- 转存表中的数据 `campnote`
--

INSERT INTO `campnote` (`ID`, `FromCampaign`, `Poster`, `Note`, `Time`) VALUES
(1, 1, 1, 'Hey guys just a heads up - we are starting this soon and let\'s have a quick meeting next Monday morning', '2017-11-12 12:37:13'),
(4, 1, 15, 'Sounds good :)', '2017-11-12 12:37:38'),
(6, 1, 15, 'test', '2017-11-12 12:41:56'),
(7, 4, 14, 'I have a cool idea!', '2017-11-21 03:17:13'),
(9, 1, 14, 'hahahaha', '2017-11-21 04:47:22'),
(10, 5, 9, 'hahahahahha', '2017-11-21 06:18:34'),
(13, 1, 1, 'I\'m your manager!', '2017-11-21 12:51:44'),
(14, 1, 1, 'A wiki (/ˈwɪki/ (About this sound listen) WIK-ee) is a website on which users collaboratively modify content and structure directly from the web browser. In a typical wiki, text is written using a simplified markup language and often edited with the help of a rich-text editor.[1]\nA wiki is run using wiki software, otherwise known as a wiki engine. A wiki engine is a type of content management system, but it differs from most other such systems, including blog software, in that the content is created without any defined owner or leader, and wikis have little implicit structure, allowing structure to emerge according to the needs of the users.[2] There are dozens of different wiki engines in use, both standalone and part of other software, such as bug tracking systems. Some wiki engines are open source, whereas others are proprietary. Some permit control over different functions (levels of access); for example, editing rights may permit changing, adding or removing material. Others may permit access without enforcing access control. Other rules may be imposed to organize content.\nThe online encyclopedia project Wikipedia is by far the most popular wiki-based website, and is one of the most widely viewed sites of any kind in the world, having been ranked in the top ten since 2007.[3] Wikipedia is not a single wiki but rather a collection of hundreds of wikis, one for each language. There are tens of thousands of other wikis in use, both public and private, including wikis functioning as knowledge management resources, notetaking tools, community websites and intranets. The English-language Wikipedia has the largest collection of articles; as of September 2016, it had over five million articles. Ward Cunningham, the developer of the first wiki software, WikiWikiWeb, originally described it as \"the simplest online database that could possibly work\".[4] \"Wiki\" (pronounced [ˈwiki][note 1]) is a Hawaiian word meaning \"quick\".[5][6][7]', '2017-11-21 12:54:13'),
(15, 1, 14, 'a new note', '2017-11-21 13:36:41');

-- --------------------------------------------------------

--
-- 表的结构 `client`
--

DROP TABLE IF EXISTS `client`;
CREATE TABLE IF NOT EXISTS `client` (
  `ClientID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(127) NOT NULL,
  `Phone` varchar(31) DEFAULT NULL,
  `Address` varchar(255) DEFAULT NULL,
  `ContactPerson` varchar(127) NOT NULL,
  PRIMARY KEY (`ClientID`)
) ;

--
-- 转存表中的数据 `client`
--

INSERT INTO `client` (`ClientID`, `Name`, `Phone`, `Address`, `ContactPerson`) VALUES
(1, 'EMPORIUM MALL', '52225123', '1 MEITIN ROAD, SHATIN', 'ALEX ROBERTS'),
(2, 'THE CONVENT SCHOOL', '+852 123 6547', 'UNIT 333, 58 CARDILL CRES.', 'JUSTIN TONKS'),
(3, 'UNIVERSAL INDUSTRIES LTD.', '(086)123-32145671', '9 AWESOME COURT', 'RACHEL BERT'),
(4, 'KITCHEN CUISINE BAKERY', NULL, NULL, 'REBECCA ABENI'),
(5, 'CITY JEWELERS', '33322585467 EXT.3325', '200 UNIVERSITY AVE, HONG KONG', 'LARRY SAYCO'),
(6, 'HIGHLAND COUNTRY RESTAURANT', NULL, NULL, 'ASHLEY COBB'),
(7, 'SERENE AIR', '(+852)521-6547#3252', NULL, 'KIMMY LIN'),
(16, 'CS5351 TEAM EJ', NULL, NULL, 'SHUYI TANG');

-- --------------------------------------------------------

--
-- 表的结构 `members`
--

DROP TABLE IF EXISTS `members`;
CREATE TABLE IF NOT EXISTS `members` (
  `FromTeam` int(11) NOT NULL,
  `StaffType` int(1) NOT NULL,
  `StaffID` int(11) NOT NULL,
  `Hours` int(11) DEFAULT NULL,
  PRIMARY KEY (`FromTeam`,`StaffID`)
) ;

--
-- 转存表中的数据 `members`
--

INSERT INTO `members` (`FromTeam`, `StaffType`, `StaffID`, `Hours`) VALUES
(1, 2, 1, 0),
(1, 2, 14, 90),
(1, 3, 15, 90),
(2, 2, 11, 80),
(2, 3, 12, 80),
(3, 2, 10, 0),
(4, 2, 14, 0),
(4, 3, 15, 0),
(5, 2, 1, 0),
(5, 3, 9, 95),
(5, 2, 17, 72),
(6, 3, 12, 0),
(6, 2, 18, 0),
(7, 3, 12, 97),
(7, 2, 19, 73),
(8, 3, 15, 0),
(8, 2, 20, 0),
(9, 3, 15, 0),
(9, 2, 21, 0),
(10, 3, 9, 90),
(10, 5, 13, 75),
(11, 3, 9, 0),
(11, 2, 17, 0),
(13, 3, 9, 74),
(13, 2, 17, 88),
(13, 2, 21, 68),
(14, 3, 15, 95),
(14, 2, 17, 72),
(14, 2, 20, 78),
(16, 2, 1, NULL),
(18, 2, 11, 30),
(18, 2, 17, 50);

-- --------------------------------------------------------

--
-- 表的结构 `staff`
--

DROP TABLE IF EXISTS `staff`;
CREATE TABLE IF NOT EXISTS `staff` (
  `StaffID` int(11) NOT NULL AUTO_INCREMENT,
  `FirstName` varchar(31) NOT NULL,
  `LastName` varchar(31) NOT NULL,
  `Phone` varchar(31) DEFAULT NULL,
  `Email` varchar(63) DEFAULT NULL,
  `Password` varchar(32) NOT NULL,
  `Payrate` int(11) NOT NULL,
  `Role` int(11) NOT NULL,
  PRIMARY KEY (`StaffID`),
  UNIQUE KEY `UserName` (`Email`)
) ;

--
-- 转存表中的数据 `staff`
--

INSERT INTO `staff` (`StaffID`, `FirstName`, `LastName`, `Phone`, `Email`, `Password`, `Payrate`, `Role`) VALUES
(1, 'ALBERT', 'MANN', '512145877', 'AMANN@SAG.COM', 'eee71d654b9c20275620bf0f1f5ba24a', 600, 1),
(2, 'PAUL', 'SIMON', '2215487', 'PSIMON@SAG.COM', 'bd9bf4b655c738c28282613fa9863407', 1000, 1),
(3, 'TAO', 'LANG', '+86-010-110', 'TLANG@SAG.COM', '78bc2c15677cfe91f4d3df48e76346df', 900, 1),
(4, 'CINDY', 'GREEN', '222222222', 'CGREEN@SAG.COM', 'd1152999ddea6b986dadc785495d25d1', 900, 1),
(5, 'MARCUS', 'KOLE', NULL, 'MKOLE@SAG.COM', 'b7848665165631e681fb3a22a780f95e', 950, 1),
(6, 'JOSEPH', 'SMITH', '+852(123)332-4578', 'JSMITH@SAG.COM', '16a99340250b1949d5989cddac7bfd38', 1000, 1),
(7, 'JACKIE', 'LIN', NULL, 'JLIN@SAG.COM', 'b8163b82da22e55e471b86bdf261c74c', 1100, 1),
(8, 'MARK', 'JOHNSON', '53130987 EXT.3121', 'MJOHNSON@SAG.COM', '14f217c68c609d8ca4b7449a798b73de', 1200, 1),
(9, 'STUART', 'ROOT', NULL, 'SROOT@SAG.COM', '0f027f76eff0a59842e77d18a07bb4a2', 500, 3),
(10, 'BEN', 'ALASTAIR', NULL, 'BALASTAIR@SAG.COM', '8210ba264cdb810ec9bb481002fa4292', 550, 2),
(11, 'JULIA', 'MOOR', '22299987651', 'JMOOR@SAG.COM', '74186fe0ba8ffeebf64733e276e2724f', 600, 2),
(12, 'ANTONI', 'BELL', NULL, 'ABELL@SAG.COM', 'ea2b6d69083478bb540646350da5a108', 400, 3),
(13, 'AN', 'CHAO', NULL, 'ACHAO@SAG.COM', '2c6e5637005739826bbfc64cbb163077', 450, 2),
(14, 'JI', 'HENG', NULL, 'JHENG@SAG.COM', '5146b7ed812f272a38e33f5db25fcac7', 500, 2),
(15, 'JASON', 'ROY', NULL, 'JROY@SAG.COM', '9eb6690520aafff104a786ff01810564', 650, 3),
(16, 'CHRIS', 'THOMSON', '19234112', 'CTHOMSON@SAG.COM', 'b886457e8b25c56af23e6bb9f665d552', 600, 2),
(17, 'ALI', 'KHAN', NULL, 'AKHAN@SAG.COM', '4dc6a2dfea85e00c8d7c355b1c8c487b', 500, 2),
(18, 'DAVID', 'MILLER', '88328876', 'DMILLER@SAG.COM', '559e5aed4c27b78246aaa22683e3e7d5', 550, 2),
(19, 'SILVIA', 'STONE', NULL, 'SSTONE@SAG.COM', '5b619ab9ad6e05c6eea4a1857ed1d974', 600, 2),
(20, 'RAJ', 'SHARMA', NULL, 'RSHARMA@SAG.COM', '7a83498776ae3aae2ccd78712ee1a4fa', 550, 2),
(21, 'ROSS', 'BUTTLER', '+86(0766)2718273', 'RBUTTLER@SAG.COM', '58cb6e41fb663bd3398e20463ad91f06', 650, 4),
(22, 'JINGYANG', 'CAO', '55964037', 'GRANDMASTER@SAG.COM', 'ec2d63132169ad879ebf0eaf01958162', 666, 0),
(23, 'PENGPENG', 'FAN', '65249377', 'ANOTHERGRANDMASTER@SAG.COM', '42007ed9461135171bac7937dc73ae3d', 666, 0),
(24, 'ADMIN', 'SAG', NULL, 'ADMIN@SAG.COM', '73acd9a5972130b75066c82595a1fae3', 0, 0);

-- --------------------------------------------------------

--
-- 表的结构 `team`
--

DROP TABLE IF EXISTS `team`;
CREATE TABLE IF NOT EXISTS `team` (
  `TeamID` int(11) NOT NULL AUTO_INCREMENT,
  `Manager` int(11) NOT NULL,
  PRIMARY KEY (`TeamID`)
) ;

--
-- 转存表中的数据 `team`
--

INSERT INTO `team` (`TeamID`, `Manager`) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 2),
(6, 5),
(7, 5),
(8, 6),
(9, 6),
(10, 1),
(11, 7),
(12, 8),
(13, 6),
(14, 2),
(15, 14),
(17, 1),
(18, 1);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
