/*
 Navicat Premium Data Transfer

 Source Server         : hihihi
 Source Server Type    : MySQL
 Source Server Version : 80037 (8.0.37)
 Source Host           : localhost:3306
 Source Schema         : vblog

 Target Server Type    : MySQL
 Target Server Version : 80037 (8.0.37)
 File Encoding         : 65001

 Date: 17/10/2024 21:55:58
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for blogs
-- ----------------------------
CREATE DATABASE IF NOT EXISTS `vblog` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */; 
USE `vblog`;

DROP TABLE IF EXISTS `blogs`;
CREATE TABLE `blogs`  (
  `url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of blogs
-- ----------------------------
INSERT INTO `blogs` VALUES ('blog.md');

-- ----------------------------
-- Table structure for lifechips
-- ----------------------------
DROP TABLE IF EXISTS `lifechips`;
CREATE TABLE `lifechips`  (
  `url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `date` datetime NULL DEFAULT NULL,
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of lifechips
-- ----------------------------
INSERT INTO `lifechips` VALUES ('winner.jpg', 'Winner', 'winner！', '2024-10-03 00:00:00', 'photo', '险中求胜，顺风开局，逆风收盘');
INSERT INTO `lifechips` VALUES ('BlueSky.jpg', 'Relax~', '好看，很久没有这么轻松的感觉了', '2024-10-02 00:00:00', 'photo', '蓝天白云，晴朗的阳光');
INSERT INTO `lifechips` VALUES ('zbg.mp4', '秋游', '帅！子博哥太帅了！', '2024-10-02 00:00:00', 'video', NULL);
INSERT INTO `lifechips` VALUES ('baker.jpg', 'Baker ZJS', '嗯哼', '2024-10-03 00:00:00', 'photo', '');
INSERT INTO `lifechips` VALUES ('Enjoy.md', '', NULL, '2024-10-05 00:00:00', 'TXT', NULL);
INSERT INTO `lifechips` VALUES ('sbzjs.mp4', 'en...', '嗯，帕金森', '2024-10-02 00:00:00', 'video', '啧啧啧');

-- ----------------------------
-- Table structure for poetry
-- ----------------------------
DROP TABLE IF EXISTS `poetry`;
CREATE TABLE `poetry`  (
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `writer` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `recipient` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `date` datetime NULL DEFAULT NULL,
  `manuscriptUrl` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of poetry
-- ----------------------------
INSERT INTO `poetry` VALUES (NULL, 'Visier', 'Soul', 'Welcome to world', NULL, NULL);
INSERT INTO `poetry` VALUES (NULL, 'Soul', 'Visier', 'Fuck you world', NULL, NULL);

-- ----------------------------
-- Table structure for recentcomments
-- ----------------------------
DROP TABLE IF EXISTS `recentcomments`;
CREATE TABLE `recentcomments`  (
  `content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `time` datetime NULL DEFAULT NULL,
  `author` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of recentcomments
-- ----------------------------
INSERT INTO `recentcomments` VALUES ('GOOD JOB', '2024-10-12 00:00:00', 'Visier');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `avatarUrl` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `frameUrl` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `brief` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `lover` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `like` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `nick` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `work` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `age` int NULL DEFAULT NULL,
  `school` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('Visier', 'https://avatars.akamai.steamstatic.com/7087fdfb89c501657a8e6e7854c2ada0e0852567_full.jpg', 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/253230/27ef3d62a0e42bf4ac60d426f2f172e1790ec0fd.png', '如果我有张帅照我会放上面的，在此之前我会先挂上好盆友们的丑照', 'X', 'X', 'Visier', '大二狗', 19, NULL);

-- ----------------------------
-- Table structure for visitorapplication
-- ----------------------------
DROP TABLE IF EXISTS `visitorapplication`;
CREATE TABLE `visitorapplication`  (
  `account` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of visitorapplication
-- ----------------------------
INSERT INTO `visitorapplication` VALUES ('visitor', '$2a$10$IBfrUtVunx1Pp4HbSk1.e.UaebkPWFOi4NQyFsiM0UMsdpIi5ahvO');

-- ----------------------------
-- Table structure for visitors
-- ----------------------------
DROP TABLE IF EXISTS `visitors`;
CREATE TABLE `visitors`  (
  `account` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of visitors
-- ----------------------------
INSERT INTO `visitors` VALUES ('visitor', '$2a$10$IBfrUtVunx1Pp4HbSk1.e.UaebkPWFOi4NQyFsiM0UMsdpIi5ahvO');

SET FOREIGN_KEY_CHECKS = 1;
