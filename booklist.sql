/*
Navicat MySQL Data Transfer

Source Server         : bookmanage
Source Server Version : 50622
Source Host           : 106.15.137.203:3306
Source Database       : booklist

Target Server Type    : MYSQL
Target Server Version : 50622
File Encoding         : 65001

Date: 2018-02-10 13:29:35
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for bookAll
-- ----------------------------
DROP TABLE IF EXISTS `bookAll`;
CREATE TABLE `bookAll` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bookname` varchar(255) DEFAULT NULL,
  `auter` varchar(255) DEFAULT NULL,
  `decript` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of bookAll
-- ----------------------------
INSERT INTO `bookAll` VALUES ('3', '水浒传', '不知道', '武松打aaa打老虎');
INSERT INTO `bookAll` VALUES ('4', '西游记', '吴承恩', '你这泼猴');
INSERT INTO `bookAll` VALUES ('10', 'aa', 'aa', 'aa');
INSERT INTO `bookAll` VALUES ('11', 'bbbb', 'bbbb', 'bbb');
INSERT INTO `bookAll` VALUES ('12', 'ccc', 'ccc', 'ccc');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('39', 'leo', 'e10adc3949ba59abbe56e057f20f883e');
