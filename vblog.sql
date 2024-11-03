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

 Date: 03/11/2024 17:54:30
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for blogs
-- ----------------------------
DROP TABLE IF EXISTS `blogs`;
CREATE TABLE `blogs`  (
  `url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

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
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of lifechips
-- ----------------------------
INSERT INTO `lifechips` VALUES ('winner.jpg', 'Winner', '获胜', '2024-10-03 00:00:00', 'photo', '险中求胜，顺风开局，逆风收盘');
INSERT INTO `lifechips` VALUES ('BlueSky.jpg', 'Relax~', '好看，很久没有这么轻松的感觉了，什么时光定格，我想说的不过如此吧', '2024-10-02 00:00:00', 'photo', '蓝天白云，晴朗的阳光');
INSERT INTO `lifechips` VALUES ('zbg.mp4', '秋游', '帅！子博哥太帅了！', '2024-10-02 00:00:00', 'video', NULL);
INSERT INTO `lifechips` VALUES ('baker.jpg', 'Baker ZJS', '如标题所说', '2024-10-03 00:00:00', 'photo', '');
INSERT INTO `lifechips` VALUES ('yyhjs.jpg', '幽影黄金树', '奇异的光影叠加，层层漫射穿透，投下斑驳金黄的幽影', '2024-10-19 00:00:00', 'photo', NULL);
INSERT INTO `lifechips` VALUES ('mf.jpg', '要用模法打败魔法', '所幸不会挂科，因为专业课不包括该内容', '2024-10-20 00:00:00', 'photo', '听说了吗？哈利波特要重映了，还不赶快去学模法');
INSERT INTO `lifechips` VALUES ('1730605448760-2308894.jpg', 'BEST MEET', '', NULL, NULL, '');

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
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of poetry
-- ----------------------------
INSERT INTO `poetry` VALUES (NULL, 'Visier', 'Soul', 'Welcome to world', NULL, NULL);
INSERT INTO `poetry` VALUES (NULL, 'Soul', 'Visier', 'Fuck you world', NULL, NULL);

-- ----------------------------
-- Table structure for recent
-- ----------------------------
DROP TABLE IF EXISTS `recent`;
CREATE TABLE `recent`  (
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of recent
-- ----------------------------
INSERT INTO `recent` VALUES ('notice', 'Lazy Author, Update Randomly', '2024-11-03 12:23:49', NULL);
INSERT INTO `recent` VALUES ('about', NULL, '2024-11-03 12:54:45', 'about.md');
INSERT INTO `recent` VALUES ('event', '', '2024-11-03 15:42:54', '1730619774271-839469135.md');

-- ----------------------------
-- Table structure for recentcomments
-- ----------------------------
DROP TABLE IF EXISTS `recentcomments`;
CREATE TABLE `recentcomments`  (
  `content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `time` datetime NULL DEFAULT NULL,
  `author` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

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
  `age` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `school` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `id` int NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('小龙', 'https://avatars.akamai.steamstatic.com/7087fdfb89c501657a8e6e7854c2ada0e0852567_full.jpg', 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/253230/27ef3d62a0e42bf4ac60d426f2f172e1790ec0fd.png', '那些奇异的光，广袤清晰的声响，强烈侵袭我的神经的芬芳花香，以及那丰富不可思议的触感，每一次呼吸微微颤动嘴唇翕合。我爱我一切一切的感官，爱这一切一切赋予我的世界，我已经把我所有的深情都给了她', 'X', 'X', 'Visier', '大二狗', '十九', '浙江埋土', 1);

-- ----------------------------
-- Table structure for visitorapplication
-- ----------------------------
DROP TABLE IF EXISTS `visitorapplication`;
CREATE TABLE `visitorapplication`  (
  `account` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of visitorapplication
-- ----------------------------

-- ----------------------------
-- Table structure for visitors
-- ----------------------------
DROP TABLE IF EXISTS `visitors`;
CREATE TABLE `visitors`  (
  `account` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `nick` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of visitors
-- ----------------------------
INSERT INTO `visitors` VALUES ('visitor', '$2a$10$MF2xiuRQo5.AMYzEF4L9ze4eU.Cj0NbZFCu7tgo6koKccW1/qpgxe', 'HaHaHaHaHa');
INSERT INTO `visitors` VALUES ('visitors', '$2a$10$tbRVuzpucW2Y9YHW8pbuVO.LjJBg1cgtRkkTEveFK.Tkt6dHUrbhm', 'HHH');

SET FOREIGN_KEY_CHECKS = 1;
