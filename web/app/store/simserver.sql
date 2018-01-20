/*
Navicat MySQL Data Transfer

Source Server         : LocalDMS
Source Server Version : 50141
Source Host           : localhost:3306
Source Database       : simserver

Target Server Type    : MYSQL
Target Server Version : 50141
File Encoding         : 65001

Date: 2012-01-09 20:36:33
*/

SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for `tbl_domain`
-- ----------------------------
DROP TABLE IF EXISTS `tbl_domain`;
CREATE TABLE `tbl_domain` (
  `domain` tinyint(3) unsigned zerofill NOT NULL COMMENT '多管理域定义，此表由系统管理员通过SQL工具手工管理',
  `name` varchar(64) CHARACTER SET utf8 DEFAULT NULL COMMENT '分域名字，一般是托管公司名，缺省记录为dinstar',
  PRIMARY KEY (`domain`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COMMENT='系统域配置管理表，由dinstar手工管理,缺省有一条记录为dinstar technologies';

-- ----------------------------
-- Records of tbl_domain
-- ----------------------------
INSERT INTO `tbl_domain` VALUES ('000', 'Dinstar technologies co.,inc.');

-- ----------------------------
-- Table structure for `tbl_gateway`
-- ----------------------------
DROP TABLE IF EXISTS `tbl_gateway`;
CREATE TABLE `tbl_gateway` (
  `domain` tinyint(3) unsigned zerofill NOT NULL DEFAULT '000' COMMENT '分域标识符',
  `gwid` char(6) CHARACTER SET ascii NOT NULL COMMENT 'dwg硬件唯一标识，标识一台DWG设备',
  `type` int(10) unsigned zerofill DEFAULT NULL COMMENT 'dwg 设备类型 0---2008C  1---2016  2--2032',
  `mac` char(6) CHARACTER SET ascii DEFAULT NULL,
  `name` varchar(64) DEFAULT NULL,
  `desc` varchar(128) DEFAULT NULL COMMENT 'dwg gateway description',
  `roundtrip` smallint(6) unsigned zerofill DEFAULT NULL COMMENT 'dwg与simbank之间的来回时延，单位ms',
  `lostrate` tinyint(4) unsigned zerofill DEFAULT NULL COMMENT 'dwg与simbank之间的丢包率，百分比，0-100',
  `status` tinyint(4) DEFAULT NULL COMMENT 'dwg设备状态 0--offline 1---online 2---linked',
  `ip` char(4) CHARACTER SET ascii DEFAULT NULL COMMENT 'dwg设备的当前公网ip',
  `udpport` smallint(6) unsigned zerofill DEFAULT NULL COMMENT 'dwg设备使用公网UDP端口号,0--65536',
  `privateip` char(4) CHARACTER SET ascii DEFAULT NULL COMMENT 'dwg设备的私网ip,用于可能的本地穿透',
  `zoneid` int(11) unsigned zerofill DEFAULT NULL COMMENT '所属区域id,定义为一个物理（基站）位置',
  `random` char(4) CHARACTER SET ascii DEFAULT NULL COMMENT '服务器产生的随机数，用于挑战认证',
  `password` char(16) CHARACTER SET ascii DEFAULT NULL COMMENT '用于gateway认证注册等消息的加密',
  `encrypt` tinyint(3) unsigned zerofill DEFAULT NULL,
  `createtime` datetime DEFAULT NULL COMMENT 'dwg网关设备的创建时间',
  `updatetime` datetime DEFAULT NULL COMMENT '设备的最近更新时间',
  PRIMARY KEY (`domain`,`gwid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='GATEWAY --- 描述每一台DWG网关的属性';

-- ----------------------------
-- Records of tbl_gateway
-- ----------------------------

-- ----------------------------
-- Table structure for `tbl_gwport`
-- ----------------------------
DROP TABLE IF EXISTS `tbl_gwport`;
CREATE TABLE `tbl_gwport` (
  `domain` tinyint(3) unsigned zerofill NOT NULL DEFAULT '000' COMMENT '域id,分域标识符',
  `gwid` char(6) CHARACTER SET ascii NOT NULL COMMENT 'DWG网关的硬件唯一标识',
  `portno` tinyint(4) unsigned zerofill NOT NULL COMMENT 'DWG无线模块的端口号',
  `portgrpid` int(10) unsigned zerofill DEFAULT NULL COMMENT 'dwg网关的无线模块分组id',
  `status` tinyint(4) DEFAULT NULL COMMENT '无线模块端口状态 0：本地无卡 1：本地有卡未注册 2：本地有卡已注册 3.远程未分配卡 4 远程已分配卡，初始状态 5.远程已分配卡且已注册 ',
  `simid` char(8) CHARACTER SET ascii DEFAULT NULL COMMENT '当前无线模块端口连接的SIM卡ID',
  `simgrpid1` smallint(6) unsigned zerofill DEFAULT NULL COMMENT '无线模块端口分配的远端sim卡组id1',
  `simgrpid2` smallint(6) unsigned zerofill DEFAULT NULL COMMENT '无线模块端口分配的远端sim卡组id2',
  `simgrpid3` smallint(6) unsigned zerofill DEFAULT NULL COMMENT '无线模块端口分配的远端sim卡组id3',
  `acd` smallint(6) DEFAULT NULL COMMENT '端口平均接通市场，秒',
  `asr` tinyint(4) unsigned zerofill DEFAULT NULL COMMENT '端口平均接通率，百分比 0-100',
  `signal` tinyint(4) unsigned zerofill DEFAULT NULL COMMENT '当前无线模块的信号强度，0-31，99 越大信号越强，99表示无基站',
  `ber` tinyint(4) DEFAULT NULL COMMENT '当前无线模块端口的误码率指标 0-10 越大误码越高',
  `error_cnt` smallint(6) DEFAULT NULL COMMENT '端口错误计数，注册，控制超时等',
  `desc` varchar(64) DEFAULT NULL COMMENT '无线端口备注',
  PRIMARY KEY (`domain`,`gwid`,`portno`),
  UNIQUE KEY `gwportid` (`gwid`,`portno`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='GWPORT -- 每个DWG网关的无线模块都有对应一个记录';

-- ----------------------------
-- Records of tbl_gwport
-- ----------------------------

-- ----------------------------
-- Table structure for `tbl_module`
-- ----------------------------
DROP TABLE IF EXISTS `tbl_module`;
CREATE TABLE `tbl_module` (
  `domain` tinyint(4) NOT NULL DEFAULT '0',
  `moduleid` smallint(6) unsigned zerofill NOT NULL COMMENT '模块索引',
  `modulename` varchar(64) CHARACTER SET utf8 DEFAULT NULL COMMENT '模块名',
  `parentid` smallint(6) DEFAULT NULL COMMENT '父模块索引，为空说明是一级模块',
  `desc` varchar(128) CHARACTER SET utf8 DEFAULT NULL COMMENT '用户备注',
  PRIMARY KEY (`domain`,`moduleid`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COMMENT='MODULE :  DMS 系统模块定义表';

-- ----------------------------
-- Records of tbl_module
-- ----------------------------

-- ----------------------------
-- Table structure for `tbl_node`
-- ----------------------------
DROP TABLE IF EXISTS `tbl_node`;
CREATE TABLE `tbl_node` (
  `nodeid` smallint(5) unsigned zerofill NOT NULL AUTO_INCREMENT COMMENT 'ICE/TURN 转发节点id',
  `name` char(64) CHARACTER SET utf8 DEFAULT NULL,
  `status` tinyint(3) unsigned zerofill DEFAULT NULL COMMENT 'node状态 0-初始化 1-正常 2-异常 ',
  `roundtrip` smallint(5) unsigned zerofill DEFAULT NULL COMMENT '时延，单位，ms',
  `lostrate` smallint(5) unsigned zerofill DEFAULT NULL COMMENT '丢包率，百分比 0-100',
  PRIMARY KEY (`nodeid`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COMMENT='NODE 描述ICE/TRUN 节点状态表';

-- ----------------------------
-- Records of tbl_node
-- ----------------------------

-- ----------------------------
-- Table structure for `tbl_roamgrp`
-- ----------------------------
DROP TABLE IF EXISTS `tbl_roamgrp`;
CREATE TABLE `tbl_roamgrp` (
  `domain` tinyint(3) unsigned zerofill NOT NULL DEFAULT '000',
  `roamgrpid` smallint(6) unsigned NOT NULL COMMENT '漫游区域id,自动递增',
  `roamgrpname` varchar(64) DEFAULT NULL COMMENT '漫游组包含多个zone,每个zone包含多个gateway,一般漫游组常常定义为移动运营商的一个本地计费区，例如深圳市，香港',
  PRIMARY KEY (`domain`,`roamgrpid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='包含多个zone的漫游组定义';

-- ----------------------------
-- Records of tbl_roamgrp
-- ----------------------------

-- ----------------------------
-- Table structure for `tbl_simbank`
-- ----------------------------
DROP TABLE IF EXISTS `tbl_simbank`;
CREATE TABLE `tbl_simbank` (
  `bankid` char(6) NOT NULL COMMENT 'simbank uid',
  `domain` tinyint(3) unsigned zerofill NOT NULL DEFAULT '000',
  `bankname` char(32) DEFAULT NULL COMMENT 'bankname',
  `type` int(11) unsigned zerofill NOT NULL COMMENT 'Simbankè®¾å¤‡ç±»åž‹',
  `bankmac` char(6) CHARACTER SET ascii DEFAULT NULL,
  `ip` char(4) CHARACTER SET ascii DEFAULT NULL COMMENT 'simbank public ip address',
  `port` smallint(6) DEFAULT NULL COMMENT 'simbank public udp port',
  `createtime` datetime DEFAULT NULL,
  `desc` varchar(128) DEFAULT NULL COMMENT 'simbank description',
  `random` char(4) CHARACTER SET ascii DEFAULT NULL COMMENT '服务器产生的随机数，用于挑战认证',
  `password` char(16) CHARACTER SET ascii DEFAULT NULL COMMENT '用于simbank认证注册等消息的加密',
  `status` int(11) unsigned zerofill DEFAULT NULL,
  `roundtrip` int(11) DEFAULT NULL,
  `lostrate` int(11) DEFAULT NULL,
  `privateip` char(4) CHARACTER SET ascii DEFAULT NULL,
  `privategw` char(4) CHARACTER SET ascii DEFAULT NULL,
  `lasttime` datetime DEFAULT NULL,
  `encrypt` tinyint(3) unsigned zerofill DEFAULT NULL COMMENT '加密标志 0--不加密 1--加密',
  PRIMARY KEY (`bankid`,`domain`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tbl_simbank
-- ----------------------------

-- ----------------------------
-- Table structure for `tbl_simcard`
-- ----------------------------
DROP TABLE IF EXISTS `tbl_simcard`;
CREATE TABLE `tbl_simcard` (
  `domain` tinyint(3) unsigned zerofill NOT NULL DEFAULT '000',
  `imsi` char(15) CHARACTER SET ascii NOT NULL COMMENT 'SIM卡国际统一标识，用作卡唯一索引，插入SIMBANK时由设备自动获取',
  `status` tinyint(4) NOT NULL DEFAULT '0' COMMENT '当前的SIM卡状态,\r\n0 idle SIM卡未装上SIMBANK\r\n1 ready SIM卡已上SIMBANK，等待分配\r\n2 Pending SIM卡已经分配给SIM模块，但还没被模块加载使用\r\n3 Loading SIM卡正在被模块加载\r\n4 InUse  SIM卡已经注册上运用商网络\r\n5 InCall SIM卡正在工作（通话/短信）\r\n6 Canceled  SIM卡已做废\r\n',
  `icc` char(24) CHARACTER SET ascii DEFAULT NULL COMMENT 'SIM卡上电后设备自动获取,icc是运营商定义信息',
  `bindimei` char(15) CHARACTER SET ascii DEFAULT NULL COMMENT 'human behaving应用时，SIM卡绑定一个模块的IMEI,模拟手机应用',
  `pin1` char(8) CHARACTER SET ascii DEFAULT '' COMMENT 'SIM卡访问密钥，缺省为1234（中国），用户输入配置',
  `pin2` char(8) CHARACTER SET ascii DEFAULT NULL,
  `puk1` char(8) CHARACTER SET ascii DEFAULT NULL COMMENT 'pin1输入错误后的解锁密钥，用户输入',
  `puk2` char(8) CHARACTER SET ascii DEFAULT NULL COMMENT 'pin2输入错误后的解锁密钥，用户输入',
  `prepaid_fee` decimal(10,2) unsigned zerofill DEFAULT NULL COMMENT '初始化预充值金额，多次充值多次累加',
  `cost_fee` decimal(10,2) unsigned zerofill DEFAULT NULL COMMENT '累计消费金额',
  `balance` decimal(10,2) unsigned zerofill NOT NULL DEFAULT '00000000.00' COMMENT '卡余额',
  `moneytype` tinyint(4) unsigned zerofill DEFAULT NULL COMMENT '币种',
  `providerid` int(10) unsigned zerofill DEFAULT NULL COMMENT 'SIM卡对应的移动运营商ID',
  `mobilenum` char(12) CHARACTER SET ascii DEFAULT NULL COMMENT 'SIM卡对应的移动号码，创建时需要人工输入',
  `last_loadtime` datetime DEFAULT NULL COMMENT 'SIM卡被SIMBANK加载的最近一次时间',
  `last_usetime` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT 'SIM卡在SIMBANK最近的一次使用时间',
  `talk_timelong_today` int(10) unsigned zerofill DEFAULT NULL COMMENT '当天通话时长，秒，每天清零，配合SIM卡组每天通话时长限制策略使用',
  `talk_timelong_month` int(10) unsigned zerofill DEFAULT NULL COMMENT '当月通话时长，秒，每月清零，配合SIM卡组每天通话时长限制策略使用',
  `talk_timelong` int(10) unsigned zerofill NOT NULL DEFAULT '0000000000' COMMENT '总通话时长，秒',
  `reg_errors` smallint(6) unsigned zerofill DEFAULT NULL COMMENT 'sim卡注册失败次数，超过卡组最大注册次数后告警不再注册',
  `sms_cnt_today` int(10) unsigned zerofill DEFAULT NULL COMMENT '当天短信数，每天清零，配合SIM卡组每天短信次数限制策略使用',
  `sms_cnt_month` int(10) unsigned zerofill DEFAULT NULL COMMENT '当月短信数，每月清零，配合SIM卡组每月短信次数限制策略使用',
  `sms_cnt` int(10) unsigned zerofill DEFAULT NULL COMMENT '总短信条数',
  `zero_talk_cnt` int(10) unsigned zerofill DEFAULT NULL COMMENT '短通话次数',
  `succ_talk_cnt` int(10) unsigned zerofill DEFAULT NULL COMMENT '成功通话次数',
  `call_cnt` int(10) unsigned zerofill NOT NULL DEFAULT '0000000000' COMMENT '总呼叫次数',
  `force_block` tinyint(3) unsigned zerofill DEFAULT NULL COMMENT 'block标志，锁卡标志，提醒换卡，禁止调度',
  `force_low` tinyint(3) unsigned zerofill DEFAULT NULL COMMENT '低余额告警标志',
  `force_forbidden` tinyint(3) unsigned zerofill DEFAULT NULL COMMENT '禁用标志，管理员输入',
  `force_check` tinyint(3) unsigned zerofill DEFAULT NULL COMMENT '余额检查标志，用于触发SMS/USSD余额检查机制',
  `memo` varchar(128) CHARACTER SET utf8 DEFAULT NULL COMMENT 'SIM卡的特别备注信息',
  `createtime` datetime DEFAULT NULL COMMENT 'SIM卡信息创建时间',
  PRIMARY KEY (`domain`,`imsi`,`balance`,`last_usetime`,`talk_timelong`,`call_cnt`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COMMENT='SIMCARD- SIMCARD的属性表，每张SIM卡都有对应一个记录';

-- ----------------------------
-- Records of tbl_simcard
-- ----------------------------

-- ----------------------------
-- Table structure for `tbl_simgrp`
-- ----------------------------
DROP TABLE IF EXISTS `tbl_simgrp`;
CREATE TABLE `tbl_simgrp` (
  `simgrpid` smallint(6) NOT NULL AUTO_INCREMENT,
  `domain` tinyint(3) unsigned zerofill NOT NULL DEFAULT '000',
  `simgrpname` varchar(64) DEFAULT NULL COMMENT 'sim卡组名',
  `desc` varchar(128) DEFAULT NULL COMMENT 'SIM卡组的用户备注',
  `calls_timelong_cnt` int(11) unsigned zerofill DEFAULT NULL COMMENT '本卡组总的通话时间，秒',
  `sms_cnt` int(11) unsigned zerofill DEFAULT NULL COMMENT '本卡组总的SMS发送条数',
  `in_calls_cnt` int(10) unsigned zerofill DEFAULT NULL COMMENT '本卡组总的接听呼叫数',
  `in_sms_cnt` int(10) unsigned zerofill DEFAULT NULL COMMENT '本卡组总的SMS接收条数',
  `sw_rule` tinyint(4) unsigned zerofill DEFAULT NULL COMMENT '换卡策略，\r\n 1:呼叫时长；2:当天呼叫时长;4:当月呼叫时长，8：消费金额;16:当天消费金额 32：当月消费金额 64：短信条数 128： 当天短信条数 256：当月短信条数 （可以复选）',
  `sel_rule` tinyint(4) DEFAULT NULL COMMENT '选卡策略 0：顺序 1：逆序 2：随机 3：余额最小优先 4：余额最大优先 5：最少呼叫次数优先 6：最少通话时间优先 7：最近未使用优先',
  `talks_th` smallint(6) unsigned zerofill DEFAULT NULL COMMENT '本组换卡策略：通话数上限，次，0不激活',
  `min_duration_th` smallint(5) unsigned zerofill DEFAULT NULL COMMENT '当通话时长小于该值时，不进行扣费，单位秒',
  `timelong_th` smallint(6) unsigned zerofill DEFAULT NULL COMMENT '本组换卡策略：通话时长上限，秒，0不激活',
  `timelong_perday_th` smallint(6) unsigned zerofill DEFAULT NULL COMMENT '本组换卡策略：每天通话时长限制，单位秒，0不限制',
  `timelong_month_th` smallint(5) unsigned zerofill DEFAULT NULL COMMENT '本组换卡策略：每月通话时长限制，单位秒，0不限制',
  `cost_th` decimal(10,2) DEFAULT NULL COMMENT '本组换卡策略：通话费用上限，0不激活',
  `cost_perday_th` decimal(10,2) unsigned zerofill DEFAULT NULL COMMENT '本组换卡策略：每天通话费用上限，0不激活',
  `cost_permonth_th` decimal(10,2) DEFAULT NULL,
  `work_timelong_limit` smallint(6) DEFAULT NULL COMMENT '本组换卡策略：Sim卡工作时间限制,单位秒，0不限制',
  `idle_timelong_limit` smallint(6) DEFAULT NULL COMMENT '本组选卡策略：Sim卡空闲时间限制,单位秒，0不限制',
  `sim_cnt_alert` smallint(6) unsigned zerofill DEFAULT NULL COMMENT '卡组中可用状态的最少sim卡数',
  `priority` tinyint(3) unsigned zerofill DEFAULT NULL COMMENT '卡组优先级，当gwport对应有多个sim卡组时，选择优先级高的卡组; 0为最高优先级',
  `simtype` tinyint(3) unsigned zerofill DEFAULT NULL COMMENT '本卡组的sim卡类型 0--预付费 1--后付费',
  `tariff_type` tinyint(3) unsigned zerofill DEFAULT NULL COMMENT '本卡组计费类型，0--按分钟 1--按秒  2--按6秒',
  `call_tariff_m` decimal(10,2) unsigned zerofill DEFAULT NULL COMMENT '本卡组每分钟通话费用',
  `call_tariff_s` decimal(10,2) unsigned zerofill DEFAULT NULL COMMENT '本卡组每秒钟通话费用',
  `call_tariff_6s` decimal(10,2) unsigned zerofill DEFAULT NULL COMMENT '本卡组每6秒钟通话费用',
  `sms_tariff` decimal(10,2) unsigned zerofill DEFAULT NULL COMMENT '本卡组每条短信的费用',
  `smscnt_th` smallint(5) unsigned zerofill DEFAULT NULL COMMENT '本组换卡策略：短信条数上限，0不激活',
  `smscnt_perday_th` smallint(5) unsigned zerofill DEFAULT NULL COMMENT '本组换卡策略：每天短信条数上限，0不激活',
  `smscnt_month_th` smallint(5) unsigned zerofill DEFAULT NULL COMMENT '本组换卡策略：每月短信条数上限，0不激活',
  `ts_weekday` char(12) DEFAULT NULL COMMENT '卡组有效天,weekday, 0-6分别代表周日到周六',
  `ts_time0` datetime DEFAULT NULL COMMENT '卡组时间段索引,00:00-24:00 time0开始时间',
  `ts_time1` datetime DEFAULT NULL COMMENT '卡组时间段索引,00:00-24:00 time1结束时间',
  `createtime` datetime DEFAULT NULL COMMENT 'sim卡组的创建时间',
  `updatetime` datetime DEFAULT NULL COMMENT 'sim卡组配置的最近更新时间',
  PRIMARY KEY (`simgrpid`,`domain`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='SIMGRP -- sim卡组定义，大部分调度和计费策略基于卡组';

-- ----------------------------
-- Records of tbl_simgrp
-- ----------------------------

-- ----------------------------
-- Table structure for `tbl_simgrp_ts`
-- ----------------------------
DROP TABLE IF EXISTS `tbl_simgrp_ts`;
CREATE TABLE `tbl_simgrp_ts` (
  `tsid` int(11) NOT NULL AUTO_INCREMENT COMMENT '时段索引',
  `domain` tinyint(4) NOT NULL DEFAULT '0',
  `simgrpid` int(11) NOT NULL DEFAULT '0' COMMENT '时段有效时，对应的SIM卡组id',
  `weekday` tinyint(4) unsigned zerofill DEFAULT NULL COMMENT '规则生效天 1-周1 ，7-周日',
  `clock0` datetime DEFAULT NULL COMMENT '规则生效开始时刻',
  `clock1` datetime DEFAULT NULL COMMENT '规则生效结束时刻',
  `createtime` datetime DEFAULT NULL,
  PRIMARY KEY (`tsid`,`domain`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='SIMGRP_TS: Sim卡组有效时段对应表';

-- ----------------------------
-- Records of tbl_simgrp_ts
-- ----------------------------

-- ----------------------------
-- Table structure for `tbl_simport`
-- ----------------------------
DROP TABLE IF EXISTS `tbl_simport`;
CREATE TABLE `tbl_simport` (
  `simid` char(8) CHARACTER SET ascii NOT NULL DEFAULT '',
  `domain` tinyint(3) unsigned zerofill NOT NULL DEFAULT '000',
  `bankid` char(6) CHARACTER SET ascii DEFAULT NULL,
  `portno` tinyint(4) unsigned zerofill DEFAULT NULL COMMENT 'simbank设备SIM卡槽对应的物理端口号，0-127',
  `status` int(10) unsigned zerofill DEFAULT NULL COMMENT '当前的SIM卡状态,\r\n0 idle SIM卡未装上SIMBANK\r\n1 ready SIM卡已上SIMBANK，等待分配\r\n2 Pending SIM卡已经分配给SIM模块，但还没被模块加载使用\r\n3 Loading SIM卡正在被模块加载\r\n4 InUse  SIM卡已经注册上运用商网络\r\n5 InCall SIM卡正在工作（通话/短信）\r\n',
  `simgrpid` int(10) DEFAULT NULL COMMENT 'SIM卡槽所属的卡组索引',
  `imsi` char(15) CHARACTER SET ascii DEFAULT NULL COMMENT '卡槽当前使用的SIM卡IMSI',
  `gwid` char(6) CHARACTER SET ascii DEFAULT NULL COMMENT 'sim卡槽当前连接的dwg网关id',
  `gwportno` tinyint(4) unsigned zerofill DEFAULT NULL COMMENT 'sim卡槽对应的dwg网关的无线模块端口号',
  `last_load` datetime DEFAULT NULL,
  `last_use` datetime DEFAULT NULL COMMENT '上次使用时间',
  `last_unload` datetime DEFAULT NULL,
  `desc` varchar(64) DEFAULT NULL COMMENT '用户备注信息',
  PRIMARY KEY (`simid`,`domain`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='SIMPORT-- SIMBANK的物理端口属性表，每个SIMBANK端口都有对应一个记录';

-- ----------------------------
-- Records of tbl_simport
-- ----------------------------

-- ----------------------------
-- Table structure for `tbl_sysuser`
-- ----------------------------
DROP TABLE IF EXISTS `tbl_sysuser`;
CREATE TABLE `tbl_sysuser` (
  `userid` int(11) NOT NULL AUTO_INCREMENT,
  `domain` tinyint(3) unsigned zerofill NOT NULL DEFAULT '000' COMMENT '系统支持多管理域划分，一个domain就是一个管理域，域管理员创建的用户的domain是继承管理员的。',
  `username` varchar(48) NOT NULL,
  `password` varchar(48) DEFAULT NULL,
  `mobile` char(16) CHARACTER SET ascii DEFAULT NULL COMMENT '移动号码，可用于异常情况下短信告警',
  `email` varchar(64) CHARACTER SET ascii DEFAULT NULL COMMENT 'user emailaddress',
  `status` tinyint(3) unsigned zerofill DEFAULT NULL COMMENT '状态 0--注册中 1--激活 2--冻结',
  `desc` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`userid`,`domain`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='DMS 系统用户数据表';

-- ----------------------------
-- Records of tbl_sysuser
-- ----------------------------
INSERT INTO `tbl_sysuser` VALUES ('1', '000', 'admin', 'admin', null, null, '001', '管理员');
INSERT INTO `tbl_sysuser` VALUES ('2', '000', 'test', 'test', null, null, null, null);

-- ----------------------------
-- Table structure for `tbl_user_right`
-- ----------------------------
DROP TABLE IF EXISTS `tbl_user_right`;
CREATE TABLE `tbl_user_right` (
  `userid` smallint(6) NOT NULL COMMENT '用户id',
  `domain` tinyint(3) unsigned zerofill NOT NULL DEFAULT '000',
  `moduleid` smallint(6) NOT NULL COMMENT '设定权限的模块id',
  `read` tinyint(3) unsigned zerofill DEFAULT NULL COMMENT '指定模块的读权限',
  `update` tinyint(3) unsigned zerofill DEFAULT NULL COMMENT '指定模块的更新权限',
  `create` tinyint(3) unsigned zerofill DEFAULT NULL COMMENT '指定模块的创建权限',
  `delete` tinyint(3) unsigned zerofill DEFAULT NULL COMMENT '指定模块的删除权限',
  PRIMARY KEY (`userid`,`domain`,`moduleid`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COMMENT='USER_RIGHT 用户模块权限定义表，每个模块每个用户都分别有读，写，创建，删除权限';

-- ----------------------------
-- Records of tbl_user_right
-- ----------------------------
INSERT INTO `tbl_user_right` VALUES ('1', '000', '0', '001', '001', '001', '001');

-- ----------------------------
-- Table structure for `tbl_zone`
-- ----------------------------
DROP TABLE IF EXISTS `tbl_zone`;
CREATE TABLE `tbl_zone` (
  `zoneid` smallint(6) NOT NULL AUTO_INCREMENT COMMENT '区域id,自动递增，标致gw所属的一个基站区域',
  `domain` tinyint(3) unsigned zerofill NOT NULL DEFAULT '000',
  `zonename` varchar(64) DEFAULT NULL COMMENT '区域名，常常定义为一个基站范围，例如南山国兴站',
  `roamgrpid` smallint(6) unsigned zerofill DEFAULT NULL COMMENT '本区域所属的漫游组id',
  PRIMARY KEY (`zoneid`,`domain`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='ZONE --DWG 网关区域分组，同一分组一般位于同一基站范围，用于防封杀的模拟漫游';

-- ----------------------------
-- Records of tbl_zone
-- ----------------------------
