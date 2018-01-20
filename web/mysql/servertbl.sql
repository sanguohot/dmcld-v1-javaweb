/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50703
Source Host           : localhost:3306
Source Database       : simserver_wong

Target Server Type    : MYSQL
Target Server Version : 50703
File Encoding         : 65001

Date: 2015-05-19 17:18:41
*/
SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for `tbl_call_bill`
-- ----------------------------
DROP TABLE IF EXISTS `tbl_call_bill`;
CREATE TABLE `tbl_call_bill` (
  `uuid` int(10) NOT NULL AUTO_INCREMENT COMMENT '流水号',
  `rec_status` int(3) DEFAULT NULL COMMENT '0-null,1-add(web),2-delete(web),3-update(web),11-add(server),12-delete(server),13-update(server)',
  `domain_uuid` int(10) NOT NULL COMMENT '域标识',
  `caller` varchar(15) NOT NULL COMMENT '主叫号码',
  `called` varchar(15) NOT NULL COMMENT '被叫号码',
  `disconnect_cause` int(3) NOT NULL COMMENT '挂断原因码',
  `report_time` datetime DEFAULT NULL COMMENT '话单上报时间',
  `recv_time` datetime DEFAULT NULL COMMENT '话单入库时间',
  `setup_time` datetime NOT NULL COMMENT '收到呼叫请求时间',
  `alert_time` datetime DEFAULT NULL COMMENT '振铃时间',
  `connect_time` datetime NOT NULL COMMENT '接通时间',
  `disconnect_time` datetime NOT NULL COMMENT '挂断时间',
  `session_time` int(5) NOT NULL COMMENT '通话时长（s）',
  `direction` int(3) DEFAULT NULL COMMENT '呼叫方向',
  PRIMARY KEY (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of tbl_call_bill
-- ----------------------------

-- ----------------------------
-- Table structure for `tbl_frequency`
-- ----------------------------
DROP TABLE IF EXISTS `tbl_frequency`;
CREATE TABLE `tbl_frequency` (
  `uuid` int(10) NOT NULL AUTO_INCREMENT,
  `rec_status` int(3) DEFAULT NULL COMMENT '0-null,1-add(web),2-delete(web),3-update(web),11-add(server),12-delete(server),13-update(server)',
  `domain_uuid` int(10) NOT NULL COMMENT '域id',
  `freq_switch` int(3) NOT NULL COMMENT '开关 0：null, 1：开启， 2：关闭',
  `call_num` char(15) NOT NULL COMMENT '呼叫号码',
  `role` int(3) NOT NULL COMMENT '0：null，1：主叫，2：被叫',
  `time_limit` int(10) NOT NULL COMMENT '限制时长（单位：分钟）',
  `max_num` int(10) NOT NULL COMMENT '该段时间内，限制最大呼叫数',
  `result` int(3) DEFAULT NULL COMMENT '对号码处理结果，0：null，1：成功，2：失败',
  `cur_num` int(10) DEFAULT NULL COMMENT '当前限制时段内的呼叫数，话单上报或者web刷新时更新该字段',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `detail_desc` char(255) DEFAULT NULL,
  PRIMARY KEY (`uuid`),
  UNIQUE KEY `unique` (`domain_uuid`,`call_num`,`role`) USING BTREE,
  KEY `domain_uuid` (`domain_uuid`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of tbl_frequency
-- ----------------------------

-- ----------------------------
-- Table structure for `tbl_num`
-- ----------------------------
DROP TABLE IF EXISTS `tbl_num`;
CREATE TABLE `tbl_num` (
  `uuid` int(10) NOT NULL AUTO_INCREMENT,
  `rec_status` int(3) DEFAULT NULL,
  `type` int(3) NOT NULL COMMENT '类型值为0表示特服号码，1表示手机号码，2表示固话号码',
  `domain_uuid` int(10) NOT NULL COMMENT '用户域id',
  `num` varchar(15) NOT NULL COMMENT '处理过后的号码',
  `action` int(3) NOT NULL COMMENT '1为禁呼，2为禁透，3为禁呼禁透，4为录音',
  `create_time` datetime DEFAULT NULL,
  `detail_desc` char(255) DEFAULT NULL,
  PRIMARY KEY (`uuid`),
  UNIQUE KEY `idx1` (`domain_uuid`,`num`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of tbl_num
-- ----------------------------

-- ----------------------------
-- Table structure for `tbl_pmd_authnum_15`
-- ----------------------------
DROP TABLE IF EXISTS `tbl_pmd_authnum_15`;
CREATE TABLE `tbl_pmd_authnum_15` (
  `uuid` int(10) NOT NULL AUTO_INCREMENT,
  `rec_status` int(3) DEFAULT NULL COMMENT '0-null,1-add(web),2-delete(web),3-update(web),11-add(server),12-delete(server),13-update(server)',
  `sys_uuid` int(10) NOT NULL COMMENT '服务器id',
  `serial_no` int(10) NOT NULL,
  `avg_process_time` int(10) DEFAULT NULL COMMENT '平均处理时间',
  `max_process_time` int(10) DEFAULT NULL COMMENT '最大处理时间',
  `total_process` int(10) DEFAULT NULL COMMENT '总处理数',
  `cur_pending_cnt` int(10) DEFAULT NULL COMMENT '当前待处理数',
  `cur_deal_cnt` int(10) DEFAULT NULL COMMENT '已处理数',
  `cur_deal_status1` int(10) DEFAULT NULL COMMENT '禁呼数',
  `cur_deal_status2` int(10) DEFAULT NULL COMMENT '禁透数',
  `cur_deal_status3` int(10) DEFAULT NULL COMMENT '禁呼禁透数',
  `cur_deal_status4` int(10) DEFAULT NULL COMMENT '录音数',
  `generate_time` datetime DEFAULT NULL COMMENT '生成时间',
  PRIMARY KEY (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of tbl_pmd_authnum_15
-- ----------------------------

-- ----------------------------
-- Table structure for `tbl_pmd_authnum_24`
-- ----------------------------
DROP TABLE IF EXISTS `tbl_pmd_authnum_24`;
CREATE TABLE `tbl_pmd_authnum_24` (
  `uuid` int(10) NOT NULL AUTO_INCREMENT,
  `rec_status` int(3) DEFAULT NULL COMMENT '0-null,1-add(web),2-delete(web),3-update(web),11-add(server),12-delete(server),13-update(server)',
  `sys_uuid` int(10) NOT NULL COMMENT '服务器id',
  `serial_no` int(10) NOT NULL,
  `avg_process_time` int(10) DEFAULT NULL,
  `max_process_time` int(10) DEFAULT NULL,
  `total_process` int(10) DEFAULT NULL,
  `cur_pending_cnt` int(10) DEFAULT NULL COMMENT '当前待处理数',
  `cur_deal_cnt` int(10) DEFAULT NULL COMMENT '已处理数',
  `cur_deal_status1` int(10) DEFAULT NULL COMMENT '禁呼数',
  `cur_deal_status2` int(10) DEFAULT NULL COMMENT '禁透数',
  `cur_deal_status3` int(10) DEFAULT NULL COMMENT '禁呼禁透数',
  `cur_deal_status4` int(10) DEFAULT NULL COMMENT '录音数',
  `generate_time` datetime DEFAULT NULL COMMENT '生成时间',
  PRIMARY KEY (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of tbl_pmd_authnum_24
-- ----------------------------

-- ----------------------------
-- Table structure for `tbl_pmd_tape_15`
-- ----------------------------
DROP TABLE IF EXISTS `tbl_pmd_tape_15`;
CREATE TABLE `tbl_pmd_tape_15` (
  `uuid` int(10) NOT NULL AUTO_INCREMENT,
  `rec_status` int(3) DEFAULT NULL COMMENT '0-null,1-add(web),2-delete(web),3-update(web),11-add(server),12-delete(server),13-update(server)',
  `sys_uuid` int(10) NOT NULL COMMENT '服务器id',
  `serial_no` int(10) NOT NULL COMMENT '流水号',
  `generate_time` datetime DEFAULT NULL COMMENT '生成数据的时间',
  `sessions_count` int(10) DEFAULT NULL COMMENT '当前会话数',
  `files_count` int(10) DEFAULT NULL COMMENT '文件数',
  `recordings_size` int(10) DEFAULT NULL COMMENT '录音文件占用空间',
  `loadavg_1m` char(10) DEFAULT NULL COMMENT 'cpu使用率',
  `memoryUtilization` char(10) DEFAULT NULL COMMENT '内存使用率',
  `diskUtilization` char(10) DEFAULT NULL COMMENT '录音磁盘占用率',
  `rx_rate` char(10) DEFAULT NULL COMMENT '网络接收流量',
  `tx_rate` char(10) DEFAULT NULL COMMENT '网络发送流量',
  PRIMARY KEY (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of tbl_pmd_tape_15
-- ----------------------------

-- ----------------------------
-- Table structure for `tbl_pmd_tape_24`
-- ----------------------------
DROP TABLE IF EXISTS `tbl_pmd_tape_24`;
CREATE TABLE `tbl_pmd_tape_24` (
  `uuid` int(10) NOT NULL AUTO_INCREMENT,
  `rec_status` int(3) DEFAULT NULL COMMENT '0-null,1-add(web),2-delete(web),3-update(web),11-add(server),12-delete(server),13-update(server)',
  `sys_uuid` int(10) NOT NULL COMMENT '服务器id',
  `serial_no` int(10) NOT NULL,
  `generate_time` datetime DEFAULT NULL COMMENT '生成PM数据的时间戳, UTC时间',
  `sessions_count` int(10) DEFAULT NULL COMMENT '当前会话数',
  `files_count` int(10) DEFAULT NULL COMMENT '文件数',
  `recordings_size` int(10) DEFAULT NULL COMMENT '录音文件占用空间',
  `loadavg_1m` char(10) DEFAULT NULL COMMENT 'cpu使用率',
  `memoryUtilization` char(10) DEFAULT NULL COMMENT '内存使用率',
  `diskUtilization` char(10) DEFAULT NULL COMMENT '录音磁盘占用率',
  `rx_rate` char(10) DEFAULT NULL COMMENT '网络接收流量',
  `tx_rate` char(10) DEFAULT NULL COMMENT '网络发送流量',
  PRIMARY KEY (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of tbl_pmd_tape_24
-- ----------------------------
