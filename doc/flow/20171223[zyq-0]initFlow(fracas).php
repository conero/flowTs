<?php

/* @var $db Zon_Db_Abstract*/

//工作流的配置参数
$flowCfg = [
	//表单配置
	'form' => [
		'url' => 'fra5000c#list',
		'args' =>[
			'listid' => ['name'=>'故障流水号', 'map'=>'__flow_pk_id']
		],
		'fields' => [
			'frp_checker' => [
				'name' => '选择核实人员',
				'classify' => 2, //标记为人员字段
				'ctype' => 2,
				'dtype' => ['type'=>'char', 'len'=>'', 'dec'=>'', 'def'=>'', 'min'=>'', 'max'=>''],
				'attr' => [
					'etype' => '_user',
					'notnull' => 1,
					'_user_range' => 2 //核实人员只能为本部门人员
				]
			],

			'frp_check_rpt' => [
				'name' => '故障核实情况',
				'classify' => 1,
				'ctype' => 2,
				'dtype' => ['type'=>'char', 'len'=>'', 'dec'=>'', 'def'=>'', 'min'=>'', 'max'=>''],
				'attr' => [
					'etype' => 'mtext',
					'width' => 340,
					'notnull' => 1,
					'mtext_rows' => 3,
					'prompt' => ''
				]
			],

			'frp_product_model' => [
				'name' => '产品型号',
				'classify' => 1,
				'ctype' => 2,
				'dtype' => ['type'=>'char', 'len'=>'', 'dec'=>'', 'def'=>'', 'min'=>'', 'max'=>''],
				'attr' => [
					'etype' => 'select',
					'notnull' => 1,
					'option' => ['C'=>'C', 'S'=>'S', 'D'=>'D', 'P'=>'P']
				]
			],

			'frp_audit_rpt' => [
				'name' => '故障审查情况',
				'classify' => 1,
				'ctype' => 2,
				'dtype' => ['type'=>'char', 'len'=>'', 'dec'=>'', 'def'=>'', 'min'=>'', 'max'=>''],
				'attr' => [
					'etype' => 'mtext',
					'width' => 340,
					'notnull' => 1,
					'mtext_rows' => 3,
					'prompt' => ''
				]
			],
			
			'run_fracas' => [
				'name' => '运行FRACAS',
				'classify' => 1,
				'ctype' => 2,
				'dtype' => ['type'=>'char', 'len'=>'', 'dec'=>'', 'def'=>'', 'min'=>'', 'max'=>''],
				'attr' => [
					'etype' => 'switch',
					'notnull' => 1,
					'switch' => '1,0'
				]
			],
			

			'fas_stru_id' => [
				'name' => '选择分析单位',
				'classify' => 1,
				'ctype' => 2,
				'dtype' => ['type'=>'char', 'len'=>'', 'dec'=>'', 'def'=>'', 'min'=>'', 'max'=>''],
				'attr' => [
					'etype' => '_stru',
					'notnull' => 1,
					'_stru_range' => 2, //分析单位只能选“分析部门批办”的经办部门
					'_stru_rngval' => 'A1'
				]
			],
			
			'fas_uid' => [
				'name' => '选择分析主办人',
				'classify' => 2, //标记为人员字段
				'ctype' => 2,
				'dtype' => ['type'=>'char', 'len'=>'', 'dec'=>'', 'def'=>'', 'min'=>'', 'max'=>''],
				'attr' => [
					'etype' => '_user',
					'notnull' => 1,
					'_user_range' => 2 //分析人员只能为本部门人员
				]
			],

			'fas_reason_categ' => [
				'name' => '原因分类',
				'classify' => 1,
				'ctype' => 2,
				'dtype' => ['type'=>'char', 'len'=>'', 'dec'=>'', 'def'=>'', 'min'=>'', 'max'=>''],
				'attr' => [
					'etype' => 'checkbox',
					'notnull' => 1,
					'opt_source' => 'fas_reason_categ' //从数据源中获取选项列表
				]
			],

			'fas_reason_other' => [
				'name' => '其他原因分类',
				'classify' => 1,
				'ctype' => 2,
				'dtype' => ['type'=>'char', 'len'=>'30', 'dec'=>'', 'def'=>'', 'min'=>'', 'max'=>''],
				'attr' => [
					'etype' => 'text',
					'notnull' => 0
				]
			],
			
			'fas_failure_categ' => [
				'name' => '故障分类',
				'classify' => 1,
				'ctype' => 2,
				'dtype' => ['type'=>'char', 'len'=>'', 'dec'=>'', 'def'=>'', 'min'=>'', 'max'=>''],
				'attr' => [
					'etype' => 'checkbox',
					'notnull' => 1,
					'opt_source' => 'fas_failure_categ' //从数据源中获取选项列表
				]
			],

			'fas_failure_other' => [
				'name' => '其他故障分类',
				'classify' => 1,
				'ctype' => 2,
				'dtype' => ['type'=>'char', 'len'=>'30', 'dec'=>'', 'def'=>'', 'min'=>'', 'max'=>''],
				'attr' => [
					'etype' => 'text',
					'notnull' => 0
				]
			],

			'fas_implement_adv' => [
				'name' => '实施建议',
				'classify' => 1,
				'ctype' => 2,
				'dtype' => ['type'=>'char', 'len'=>'', 'dec'=>'', 'def'=>'', 'min'=>'', 'max'=>''],
				'attr' => [
					'etype' => 'chkbox',
					'notnull' => 1,
					'opt_source' => 'fas_implement_adv' //从数据源中获取选项列表
				]
			],

			'fas_implement_other' => [
				'name' => '其他实施建议',
				'classify' => 1,
				'ctype' => 2,
				'dtype' => ['type'=>'char', 'len'=>'30', 'dec'=>'', 'def'=>'', 'min'=>'', 'max'=>''],
				'attr' => [
					'etype' => 'text',
					'notnull' => 0
				]
			],

			'fas_reason' => [
				'name' => '故障原因分析',
				'classify' => 1,
				'ctype' => 2,
				'dtype' => ['type'=>'char', 'len'=>'', 'dec'=>'', 'def'=>'', 'min'=>'', 'max'=>''],
				'attr' => [
					'etype' => 'mtext',
					'width' => 340,
					'notnull' => 1,
					'mtext_rows' => 3,
					'prompt' => ''
				]
			],

			'fas_reason_files' => [
				'name' => '原因分析附件',
				'classify' => 1,
				'ctype' => 2,
				'dtype' => ['type'=>'char', 'len'=>'', 'dec'=>'', 'def'=>'', 'min'=>'', 'max'=>''],
				'attr' => [
					'etype' => 'upfile',
					'notnull' => 0,
					'upload_max' => 20, //单个文件最大可上传20M
					'upload_len' => 10, //最大可上传文件个数
					'upload_filetype' => '' //不限制文件类型
				]
			],

			'fas_correct' => [
				'name' => '纠正措施',
				'classify' => 1,
				'ctype' => 2,
				'dtype' => ['type'=>'char', 'len'=>'', 'dec'=>'', 'def'=>'', 'min'=>'', 'max'=>''],
				'attr' => [
					'etype' => 'mtext',
					'width' => 340,
					'notnull' => 1,
					'mtext_rows' => 3,
					'prompt' => ''
				]
			],

			'fas_correct_files' => [
				'name' => '纠正措施附件',
				'classify' => 1,
				'ctype' => 2,
				'dtype' => ['type'=>'char', 'len'=>'', 'dec'=>'', 'def'=>'', 'min'=>'', 'max'=>''],
				'attr' => [
					'etype' => 'upfile',
					'notnull' => 0,
					'upload_max' => 20, //单个文件最大可上传20M
					'upload_len' => 10, //最大可上传文件个数
					'upload_filetype' => '' //不限制文件类型
				]
			],

			'fas_check_require' => [
				'name' => '验证要求',
				'classify' => 1,
				'ctype' => 2,
				'dtype' => ['type'=>'char', 'len'=>'', 'dec'=>'', 'def'=>'', 'min'=>'', 'max'=>''],
				'attr' => [
					'etype' => 'mtext',
					'width' => 340,
					'notnull' => 1,
					'mtext_rows' => 3,
					'prompt' => ''
				]
			],

			'fas_audit_rpt' => [
				'name' => '故障分析审核意见',
				'classify' => 1,
				'ctype' => 2,
				'dtype' => ['type'=>'char', 'len'=>'', 'dec'=>'', 'def'=>'', 'min'=>'', 'max'=>''],
				'attr' => [
					'etype' => 'mtext',
					'width' => 340,
					'notnull' => 1,
					'mtext_rows' => 3,
					'prompt' => ''
				]
			],

			'fca_uid' => [
				'name' => '选择实施主办人',
				'classify' => 2, //标记为人员字段
				'ctype' => 2,
				'dtype' => ['type'=>'char', 'len'=>'', 'dec'=>'', 'def'=>'', 'min'=>'', 'max'=>''],
				'attr' => [
					'etype' => '_user',
					'notnull' => 1,
					'_user_range' => 2 //分析人员只能为本部门人员
				]
			],

			'fca_method' => [
				'name' => '纠正措施实施情况',
				'classify' => 1,
				'ctype' => 2,
				'dtype' => ['type'=>'char', 'len'=>'', 'dec'=>'', 'def'=>'', 'min'=>'', 'max'=>''],
				'attr' => [
					'etype' => 'mtext',
					'label'=> '纠正措施<br/>实施情况',
					'width' => 340,
					'notnull' => 1,
					'mtext_rows' => 3,
					'prompt' => ''
				]
			],

			'fca_method_verify' => [
				'name' => '效果验证情况',
				'classify' => 1,
				'ctype' => 2,
				'dtype' => ['type'=>'char', 'len'=>'', 'dec'=>'', 'def'=>'', 'min'=>'', 'max'=>''],
				'attr' => [
					'etype' => 'mtext',
					'width' => 340,
					'notnull' => 1,
					'mtext_rows' => 3,
					'prompt' => ''
				]
			],

			'fca_lest_rpt' => [
				'name' => '遗留问题',
				'classify' => 1,
				'ctype' => 2,
				'dtype' => ['type'=>'char', 'len'=>'', 'dec'=>'', 'def'=>'', 'min'=>'', 'max'=>''],
				'attr' => [
					'etype' => 'mtext',
					'width' => 340,
					'notnull' => 1,
					'mtext_rows' => 3,
					'prompt' => ''
				]
			],

			'fca_finish_verify' => [
				'name' => '归零检查',
				'classify' => 1,
				'ctype' => 2,
				'dtype' => ['type'=>'char', 'len'=>'', 'dec'=>'', 'def'=>'', 'min'=>'', 'max'=>''],
				'attr' => [
					'etype' => 'mtext',
					'width' => 340,
					'notnull' => 1,
					'mtext_rows' => 3,
					'prompt' => ''
				]
			],

			'fca_audit_rpt' => [
				'name' => '实施审核意见',
				'classify' => 1,
				'ctype' => 2,
				'dtype' => ['type'=>'char', 'len'=>'', 'dec'=>'', 'def'=>'', 'min'=>'', 'max'=>''],
				'attr' => [
					'etype' => 'mtext',
					'width' => 340,
					'notnull' => 1,
					'mtext_rows' => 3,
					'prompt' => ''
				]
			],

			'fca_customer_cms' => [
				'name' => '顾客代表意见',
				'classify' => 1,
				'ctype' => 2,
				'dtype' => ['type'=>'char', 'len'=>'', 'dec'=>'', 'def'=>'', 'min'=>'', 'max'=>''],
				'attr' => [
					'etype' => 'mtext',
					'width' => 340,
					'notnull' => 1,
					'mtext_rows' => 3,
					'prompt' => ''
				]
			],
			
			/* 下列为步骤主办人(在创建步骤时自动生成) */
			'_uid_R1' => ['name'=>'【指定核实人员】主办人', 'classify'=>2, 'ctype'=>3, 'dtype'=>null, 'attr'=>[]],
			'_uid_R2' => ['name'=>'【核实登记】主办人', 'classify'=>2, 'ctype'=>3, 'dtype'=>null, 'attr'=>[]],
			'_uid_R3' => ['name'=>'【核实确认】主办人', 'classify'=>2, 'ctype'=>3, 'dtype'=>null, 'attr'=>[]],
			'_uid_R5' => ['name'=>'【设计所批办】主办人', 'classify'=>2, 'ctype'=>3, 'dtype'=>null, 'attr'=>[]],
			'_uid_R6' => ['name'=>'【质量部批办】主办人', 'classify'=>2, 'ctype'=>3, 'dtype'=>null, 'attr'=>[]],
			'_uid_R7' => ['name'=>'【审查登记】主办人', 'classify'=>2, 'ctype'=>3, 'dtype'=>null, 'attr'=>[]],
			'_uid_R9' => ['name'=>'【审查确认】主办人', 'classify'=>2, 'ctype'=>3, 'dtype'=>null, 'attr'=>[]],
			'_uid_A1' => ['name'=>'【分析部门批办】主办人', 'classify'=>2, 'ctype'=>3, 'dtype'=>null, 'attr'=>[]],
			'_uid_A2' => ['name'=>'【故障分析登记】主办人', 'classify'=>2, 'ctype'=>3, 'dtype'=>null, 'attr'=>[]],
			'_uid_A3' => ['name'=>'【故障分析审查】主办人', 'classify'=>2, 'ctype'=>3, 'dtype'=>null, 'attr'=>[]],
			'_uid_C1' => ['name'=>'【实施单位批办】主办人', 'classify'=>2, 'ctype'=>3, 'dtype'=>null, 'attr'=>[]],
			'_uid_C2' => ['name'=>'【实施情况登记】主办人', 'classify'=>2, 'ctype'=>3, 'dtype'=>null, 'attr'=>[]],
			'_uid_C3' => ['name'=>'【故障归零检查】主办人', 'classify'=>2, 'ctype'=>3, 'dtype'=>null, 'attr'=>[]],
			'_uid_C4' => ['name'=>'【故障归零审查】主办人', 'classify'=>2, 'ctype'=>3, 'dtype'=>null, 'attr'=>[]],
			'_uid_C5' => ['name'=>'【顾客代表确认】主办人', 'classify'=>2, 'ctype'=>3, 'dtype'=>null, 'attr'=>[]]
		]
	],
	
	//数据源配置
	'dataset' => [
		'fas_reason_categ' => [
            'name' => '原因分类',
            'from' => 'fra0001m',
            'where' => 'code=\'failure_categ\'',
            'orderby' => 'order',
			'fields' => [
				"value" => ['name'=>'分类代码', 'fieldsql'=>'value'],
				"text" => ['name'=>'分类名称', 'fieldsql'=>'text'],
			],
            'pk_code' => 'value',
            'pk_desc' => 'text'
        ],

		'fas_failure_categ' => [
            'name' => '故障分类',
            'from' => 'fra0001m',
            'where' => 'code=\'failure_categ\'',
            'orderby' => 'order',
			'fields' => [
				"value" => ['name'=>'分类代码', 'fieldsql'=>'value'],
				"text" => ['name'=>'分类名称', 'fieldsql'=>'text'],
			],
            'pk_code' => 'value',
            'pk_desc' => 'text'
        ],

		'fas_implement_adv' => [
            'name' => '实施建议',
            'from' => 'fra0001m',
            'where' => 'code=\'failure_categ\'',
            'orderby' => 'order',
			'fields' => [
				"value" => ['name'=>'分类代码', 'fieldsql'=>'value'],
				"text" => ['name'=>'分类名称', 'fieldsql'=>'text'],
			],
            'pk_code' => 'value',
            'pk_desc' => 'text'
        ]
	],
	
	//回调配置
	'callback' => [
		'module' => 'flowFrp1000c',
		'args' => [
			'frp_submit_uid' => ['name'=>'指定核实人员的主办人', 'map'=>'_uid_R1'],
			'frp_check_rpt' => ['name'=>'故障核实情况', 'map'=>'frp_check_rpt'],
			'frp_check_uid' => ['name'=>'故障核实人', 'map'=>'_uid_R2'],
			'frp_check_confirm_uid' => ['name'=>'故障核实确认人', 'map'=>'_uid_R3'],
			'frp_audit_super_uid1' => ['name'=>'设计所批办人', 'map'=>'_uid_R5'],
			'frp_audit_super_uid2' => ['name'=>'质量部批办人', 'map'=>'_uid_R6'],
			'frp_audit_rpt' => ['name'=>'故障审查情况', 'map'=>'frp_check_rpt'],
			'frp_audit_uid' => ['name'=>'故障审查人', 'map'=>'_uid_R7'],
			'frp_audit_confirm_uid' => ['name'=>'故障审查确认人', 'map'=>'_uid_R8'],
			'fas_super_uid' => ['name'=>'分析部门批办人', 'map'=>'_uid_A1'],
			'fas_reason_categ' => ['name'=>'原因分类', 'map'=>'fas_reason_categ'],
			'fas_reason_other' => ['name'=>'其他原因分类', 'map'=>'fas_reason_other'],
			'fas_failure_categ' => ['name'=>'故障分类', 'map'=>'fas_failure_categ'],
			'fas_failure_other' => ['name'=>'其他故障分类', 'map'=>'fas_failure_other'],
			'fas_implement_adv' => ['name'=>'实施建议', 'map'=>'fas_implement_adv'],
			'fas_implement_other' => ['name'=>'其他实施建议', 'map'=>'fas_implement_other'],
			'fas_reason' => ['name'=>'故障原因分析', 'map'=>'fas_reason'],
			'fas_reason_files' => ['name'=>'原因分析附件', 'map'=>'fas_reason_files'],
			'fas_correct' => ['name'=>'纠正措施', 'map'=>'fas_correct'],
			'fas_correct_files' => ['name'=>'纠正措施附件', 'map'=>'fas_correct_files'],
			'fas_check_require' => ['name'=>'验证要求', 'map'=>'fas_check_require'],
			'fas_sign_uid' => ['name'=>'故障分析登记人', 'map'=>'_uid_A2'],
			'fas_audit_rpt' => ['name'=>'故障分析审核意见', 'map'=>'fas_audit_rpt'],
			'fas_audit_uid' => ['name'=>'故障分析审核人', 'map'=>'_uid_A3'],
			'fca_super_uid' => ['name'=>'实施部门批办人', 'map'=>'_uid_C1'],
			'fca_method' => ['name'=>'纠正措施实施情况', 'map'=>'fca_method'],
			'fca_method_verify' => ['name'=>'效果验证情况', 'map'=>'fca_method_verify'],
			'fca_lest_rpt' => ['name'=>'遗留问题', 'map'=>'fca_lest_rpt'],
			'fas_sign_uid' => ['name'=>'实施登记人', 'map'=>'_uid_C2'],
			'fca_finish_verify' => ['name'=>'归零检查', 'map'=>'fca_finish_verify'],
			'fca_finish_uid' => ['name'=>'归零检查人', 'map'=>'_uid_C3'],
			'fca_audit_rpt' => ['name'=>'实施审核意见', 'map'=>'fca_audit_rpt'],
			'fca_audit_uid' => ['name'=>'实施审核人', 'map'=>'_uid_C4'],
			'fca_customer_cms' => ['name'=>'顾客代表意见', 'map'=>'fca_customer_cms'],
			'fca_customer_uid' => ['name'=>'顾客代表人员', 'map'=>'_uid_C5']
		]
	],

	//流程步骤配置
	'step' => [
		['code'=>'_start', 'name'=>'故障填报', 'type'=>1, 'prev'=>'', 'next'=>'R1', 'attr'=>[]],

		['code'=>'R1', 'name'=>'指定核实人员', 'type'=>2, 'prev'=>'_start','next'=>'R2', 'attr'=>[
			'col_list' =>['frp_checker'],
			'can_revoke' => 0,
			'auth_list' => null, //经办权限可不设
			'filter_by' => ['type'=>7, 'val'=>'']
		]],

		['code'=>'R2', 'name'=>'核实登记', 'type'=>2, 'prev'=>'R1','next'=>'R3', 'attr'=>[
			'col_list' =>['frp_check_rpt'],
			'can_revoke' => 0,
			'auth_list' => null, //经办权限可不设
			'filter_by' => ['type'=>2, 'val'=>'frp_checker'] //主办人为上一步的字段(frp_checker)
		]],

		['code'=>'R3', 'name'=>'核实确认', 'type'=>2, 'prev'=>'R2','next'=>'R4', 'attr'=>[
			'col_list' =>['frp_product_model'],
			'can_revoke' => 1,
			'auth_list' => null, //授权指定角色
			'filter_by' => ['type'=>1, 'val'=>''] //全部经办人都可做核实确认
		]],

		['code'=>'R4', 'name'=>'是否设计所负责', 'type'=>3, 'prev'=>'R3','next'=>'R5,R6', 'attr'=>[
			'expr_list' => [
				['', '', 'frp_product_model', 'in', ['C', 'S'], '']
			],
			'y_step' => 'R5',
			'n_step' => 'R6'
		]],

		['code'=>'R5', 'name'=>'设计所批办', 'type'=>2, 'prev'=>'R4','next'=>'R7', 'attr'=>[
			'col_list' =>['frp_audit_uid'],
			'can_revoke' => 0,
			'auth_list' => null, //授权相关部门
			'filter_by' => ['type'=>6, 'val'=>''] //主办人为本部门主管
		]],

		['code'=>'R6', 'name'=>'质量部批办', 'type'=>2, 'prev'=>'R4','next'=>'R7', 'attr'=>[
			'col_list' =>['frp_audit_uid'],
			'can_revoke' => 0,
			'auth_list' => null, //授权相关部门
			'filter_by' => ['type'=>6, 'val'=>''] //主办人为本部门主管
		]],

		['code'=>'R7', 'name'=>'审查登记', 'type'=>2, 'prev'=>'R5,R6','next'=>'R8', 'attr'=>[
			'col_list' =>['frp_audit_rpt', 'run_fracas'],
			'can_revoke' => 0,
			'auth_list' => null, //授权相关角色
			'filter_by' => ['type'=>2, 'val'=>'frp_audit_uid'] //主办人为上一步的字段(frp_checker)
		]],

		['code'=>'R8', 'name'=>'是否运行FRACAS', 'type'=>3, 'prev'=>'R7','next'=>'R9,_end', 'attr'=>[
			'expr_list' => [
				['', '', 'run_fracas', '=', '1', '']
			],
			'y_step' => 'R9',
			'n_step' => '_end'
		]],

		['code'=>'R9', 'name'=>'审查确认', 'type'=>2, 'prev'=>'R8','next'=>'A1', 'attr'=>[
			'col_list' =>['fas_stru_id'],
			'can_revoke' => 0,
			'auth_list' => null, //授权相关角色
			'filter_by' => ['type'=>1, 'val'=>''] //全部经办人都可做审查确认
		]],

		['code'=>'A1', 'name'=>'分析部门批办', 'type'=>2, 'prev'=>'R9','next'=>'A2', 'attr'=>[
			'col_list' =>['fas_uid'],
			'can_revoke' => 0,
			'auth_list' => null, //授权相关部门
			'filter_by' => ['type'=>6, 'val'=>''] //主办人为本部门主管
		]],
		['code'=>'A2', 'name'=>'故障分析登记', 'type'=>2, 'prev'=>'A1','next'=>'A3', 'attr'=>[
			'col_list' =>['fas_reason_categ', 'fas_reason_other', 'fas_failure_categ', 'fas_failure_other', 
				'fas_implement_adv', 'fas_implement_other', 'fas_reason', 'fas_reason_files',
				'fas_correct', 'fas_correct_files', 'fas_check_require'],
			'can_revoke' => 0,
			'auth_list' => null, //可不设经办权限
			'filter_by' => ['type'=>2, 'val'=>'fas_uid'] //主办人为上一步的字段(fas_uid)
		]],
		   
		['code'=>'A3', 'name'=>'故障分析审查', 'type'=>2, 'prev'=>'A2','next'=>'C1', 'attr'=>[
			'col_list' =>['fas_audit_rpt'],
			'can_revoke' => 0,
			'auth_list' => null, //可不设经办权限
			'filter_by' => ['type'=>5, 'val'=>'R7'] //主办人为 “故障审查登记”步骤的主办人
		]],

		['code'=>'C1', 'name'=>'实施单位批办', 'type'=>2, 'prev'=>'A3','next'=>'C2', 'attr'=>[
			'col_list' =>['fca_uid'],
			'can_revoke' => 0,
			'auth_list' => null, //授权相关部门
			'filter_by' => ['type'=>6, 'val'=>''] //主办人为本部门主管
		]],

		['code'=>'C2', 'name'=>'实施情况登记', 'type'=>2, 'prev'=>'C1','next'=>'C3', 'attr'=>[
			'col_list' =>['fca_method', 'fca_method_verify', 'fca_lest_rpt'],
			'can_revoke' => 0,
			'auth_list' => null, //可不设经办权限
			'filter_by' => ['type'=>2, 'val'=>'fca_uid'] //主办人为上一步的字段(fca_uid)
		]],

		['code'=>'C3', 'name'=>'故障归零检查', 'type'=>2, 'prev'=>'C2','next'=>'C4', 'attr'=>[
			'col_list' =>['fca_finish_verify'],
			'can_revoke' => 0,
			'auth_list' => null, //授权指定角色
			'filter_by' => ['type'=>7, 'val'=>''] //全部经办人
		]],

		['code'=>'C4', 'name'=>'故障归零审查', 'type'=>2, 'prev'=>'C3','next'=>'C5', 'attr'=>[
			'col_list' =>['fca_audit_rpt'],
			'can_revoke' => 0,
			'auth_list' => null, //可不设经办权限
			'filter_by' => ['type'=>5, 'val'=>'R7'] //主办人为 “故障审查登记”步骤的主办人
		]],
		
		['code'=>'C5', 'name'=>'顾客代表确认', 'type'=>2, 'prev'=>'C4','next'=>'_end', 'attr'=>[
			'col_list' =>['fca_customer_cms'],
			'can_revoke' => 0,
			'auth_list' => null, //授权指定角色
			'filter_by' => ['type'=>1, 'val'=>''] //全部经办人
		]],

		['code'=>'_end', 'name'=>'流程结束', 'type'=>9, 'prev'=>'C5','next'=>'', 'attr'=>[]]
	]
];


$flowCfg = json_encode($flowCfg, JSON_UNESCAPED_UNICODE);

//存在时仅更新流程配置, 反之插入一条新记录
if ($db->inTable('sys_wf1000c', ['flow_id'=>'frp1000c'])) {
	$db->update('sys_wf1010c', ['flow_cfg'=>$flowCfg], ['flow_id'=>'frp1000c', 'ver_no'=>1]);
}
else {
	$db->insert('sys_wf1000c', [
        'flow_id'=>'frp1000c',
        'flow_name'=>'FRACAS业务基础流程',
        'last_ver'=>1
    ]);

    $db->insert('sys_wf1010c', [
        'flow_id'   => 'frp1000c',
        'ver_no'    => 1,
        'flow_cfg'  => $flowCfg,
        'status'    => 2,
        'muser'     => 1,
        'mtime'     => time()
    ]);
}
