/**
 * 2018年1月4日 星期四
 * 版本信息
 */
var Cfg = {
    "form": {
        "url": "fra5000c#list",
        "args": {
            "listid": {
                "name": "故障流水号",
                "map": "__flow_pk_id"
            }
        },
        "fields": {
            "frp_checker": {
                "name": "选择核实人员",
                "classify": 2,
                "ctype": 2,
                "dtype": {
                    "type": "char",
                    "len": "",
                    "dec": "",
                    "def": "",
                    "min": "",
                    "max": ""
                },
                "attr": {
                    "etype": "_user",
                    "notnull": 1,
                    "_user_range": 2
                }
            },
            "frp_check_rpt": {
                "name": "故障核实情况",
                "classify": 1,
                "ctype": 2,
                "dtype": {
                    "type": "char",
                    "len": "",
                    "dec": "",
                    "def": "",
                    "min": "",
                    "max": ""
                },
                "attr": {
                    "etype": "mtext",
                    "width": 340,
                    "notnull": 1,
                    "mtext_rows": 3,
                    "prompt": ""
                }
            },
            "frp_product_model": {
                "name": "产品型号",
                "classify": 1,
                "ctype": 2,
                "dtype": {
                    "type": "char",
                    "len": "",
                    "dec": "",
                    "def": "",
                    "min": "",
                    "max": ""
                },
                "attr": {
                    "etype": "radio",
                    "notnull": 1,
                    "option": {
                        "C": "C",
                        "S": "S",
                        "D": "D",
                        "P": "P"
                    }
                }
            },
            "frp_auditor": {
                "name": "选择审查人员",
                "classify": 2,
                "ctype": 2,
                "dtype": {
                    "type": "char",
                    "len": "",
                    "dec": "",
                    "def": "",
                    "min": "",
                    "max": ""
                },
                "attr": {
                    "etype": "_user",
                    "notnull": 1,
                    "_user_range": 4,
                    "_user_rngval": "R7"
                }
            },
            "frp_audit_rpt": {
                "name": "故障审查情况",
                "classify": 1,
                "ctype": 2,
                "dtype": {
                    "type": "char",
                    "len": "",
                    "dec": "",
                    "def": "",
                    "min": "",
                    "max": ""
                },
                "attr": {
                    "etype": "mtext",
                    "width": 340,
                    "notnull": 1,
                    "mtext_rows": 3,
                    "prompt": ""
                }
            },
            "run_fracas": {
                "name": "运行FRACAS",
                "classify": 1,
                "ctype": 2,
                "dtype": {
                    "type": "char",
                    "len": "",
                    "dec": "",
                    "def": "",
                    "min": "",
                    "max": ""
                },
                "attr": {
                    "etype": "switch",
                    "notnull": 1,
                    "switch": "1,0"
                }
            },
            "fas_stru_id": {
                "name": "选择分析单位",
                "classify": 1,
                "ctype": 2,
                "dtype": {
                    "type": "char",
                    "len": "",
                    "dec": "",
                    "def": "",
                    "min": "",
                    "max": ""
                },
                "attr": {
                    "etype": "_stru",
                    "notnull": 0,
                    "_stru_range": 2,
                    "_stru_rngval": "A1"
                }
            },
            "fas_uid": {
                "name": "选择分析主办人",
                "classify": 2,
                "ctype": 2,
                "dtype": {
                    "type": "char",
                    "len": "",
                    "dec": "",
                    "def": "",
                    "min": "",
                    "max": ""
                },
                "attr": {
                    "etype": "_user",
                    "notnull": 1,
                    "_user_range": 2,
                    "_user_rngval": ""
                }
            },
            "fas_reason_categ": {
                "name": "原因分类",
                "classify": 1,
                "ctype": 2,
                "dtype": {
                    "type": "char",
                    "len": "",
                    "dec": "",
                    "def": "",
                    "min": "",
                    "max": ""
                },
                "attr": {
                    "etype": "chkbox",
                    "notnull": 1,
                    "opt_source": "fas_reason_categ"
                }
            },
            "fas_reason_other": {
                "name": "其他原因描述",
                "classify": 1,
                "ctype": 2,
                "dtype": {
                    "type": "char",
                    "len": "30",
                    "dec": "",
                    "def": "",
                    "min": "",
                    "max": ""
                },
                "attr": {
                    "etype": "text",
                    "notnull": 0
                }
            },
            "fas_failure_categ": {
                "name": "故障分类",
                "classify": 1,
                "ctype": 2,
                "dtype": {
                    "type": "char",
                    "len": "",
                    "dec": "",
                    "def": "",
                    "min": "",
                    "max": ""
                },
                "attr": {
                    "etype": "chkbox",
                    "notnull": 1,
                    "opt_source": "fas_failure_categ"
                }
            },
            "fas_failure_other": {
                "name": "其他故障描述",
                "classify": 1,
                "ctype": 2,
                "dtype": {
                    "type": "char",
                    "len": "30",
                    "dec": "",
                    "def": "",
                    "min": "",
                    "max": ""
                },
                "attr": {
                    "etype": "text",
                    "notnull": 0
                }
            },
            "fas_implement_adv": {
                "name": "实施建议",
                "classify": 1,
                "ctype": 2,
                "dtype": {
                    "type": "char",
                    "len": "",
                    "dec": "",
                    "def": "",
                    "min": "",
                    "max": ""
                },
                "attr": {
                    "etype": "chkbox",
                    "notnull": 1,
                    "opt_source": "fas_implement_adv"
                }
            },
            "fas_implement_other": {
                "name": "其他实施建议",
                "classify": 1,
                "ctype": 2,
                "dtype": {
                    "type": "char",
                    "len": "30",
                    "dec": "",
                    "def": "",
                    "min": "",
                    "max": ""
                },
                "attr": {
                    "etype": "text",
                    "notnull": 0
                }
            },
            "fas_reason": {
                "name": "故障原因分析",
                "classify": 1,
                "ctype": 2,
                "dtype": {
                    "type": "char",
                    "len": "",
                    "dec": "",
                    "def": "",
                    "min": "",
                    "max": ""
                },
                "attr": {
                    "etype": "mtext",
                    "width": 340,
                    "notnull": 1,
                    "mtext_rows": 3,
                    "prompt": ""
                }
            },
            "fas_reason_files": {
                "name": "原因分析附件",
                "classify": 1,
                "ctype": 2,
                "dtype": {
                    "type": "char",
                    "len": "",
                    "dec": "",
                    "def": "",
                    "min": "",
                    "max": ""
                },
                "attr": {
                    "etype": "upfile",
                    "notnull": 0,
                    "upload_max": 20,
                    "upload_len": 10,
                    "upload_filetype": ""
                }
            },
            "fas_correct": {
                "name": "纠正措施",
                "classify": 1,
                "ctype": 2,
                "dtype": {
                    "type": "char",
                    "len": "",
                    "dec": "",
                    "def": "",
                    "min": "",
                    "max": ""
                },
                "attr": {
                    "etype": "mtext",
                    "width": 340,
                    "notnull": 1,
                    "mtext_rows": 3,
                    "prompt": ""
                }
            },
            "fas_correct_files": {
                "name": "纠正措施附件",
                "classify": 1,
                "ctype": 2,
                "dtype": {
                    "type": "char",
                    "len": "",
                    "dec": "",
                    "def": "",
                    "min": "",
                    "max": ""
                },
                "attr": {
                    "etype": "upfile",
                    "notnull": 0,
                    "upload_max": 20,
                    "upload_len": 10,
                    "upload_filetype": ""
                }
            },
            "fas_check_require": {
                "name": "验证要求",
                "classify": 1,
                "ctype": 2,
                "dtype": {
                    "type": "char",
                    "len": "",
                    "dec": "",
                    "def": "",
                    "min": "",
                    "max": ""
                },
                "attr": {
                    "etype": "mtext",
                    "width": 340,
                    "notnull": 1,
                    "mtext_rows": 3,
                    "prompt": ""
                }
            },
            "fas_audit_rpt": {
                "name": "故障分析审核意见",
                "classify": 1,
                "ctype": 2,
                "dtype": {
                    "type": "char",
                    "len": "",
                    "dec": "",
                    "def": "",
                    "min": "",
                    "max": ""
                },
                "attr": {
                    "etype": "mtext",
                    "width": 340,
                    "notnull": 1,
                    "mtext_rows": 3,
                    "prompt": ""
                }
            },
            "fca_stru_id": {
                "name": "选择实施单位",
                "classify": 1,
                "ctype": 2,
                "dtype": {
                    "type": "char",
                    "len": "",
                    "dec": "",
                    "def": "",
                    "min": "",
                    "max": ""
                },
                "attr": {
                    "etype": "_stru",
                    "notnull": 1,
                    "_stru_range": 2,
                    "_stru_rngval": "C1"
                }
            },
            "fca_uid": {
                "name": "选择实施主办人",
                "classify": 2,
                "ctype": 2,
                "dtype": {
                    "type": "char",
                    "len": "",
                    "dec": "",
                    "def": "",
                    "min": "",
                    "max": ""
                },
                "attr": {
                    "etype": "_user",
                    "notnull": 1,
                    "_user_range": 2
                }
            },
            "fca_method": {
                "name": "纠正措施实施情况",
                "classify": 1,
                "ctype": 2,
                "dtype": {
                    "type": "char",
                    "len": "",
                    "dec": "",
                    "def": "",
                    "min": "",
                    "max": ""
                },
                "attr": {
                    "etype": "mtext",
                    "label": "纠正措施<br\/>实施情况",
                    "width": 340,
                    "notnull": 1,
                    "mtext_rows": 3,
                    "prompt": ""
                }
            },
            "fca_method_verify": {
                "name": "效果验证情况",
                "classify": 1,
                "ctype": 2,
                "dtype": {
                    "type": "char",
                    "len": "",
                    "dec": "",
                    "def": "",
                    "min": "",
                    "max": ""
                },
                "attr": {
                    "etype": "mtext",
                    "width": 340,
                    "notnull": 1,
                    "mtext_rows": 3,
                    "prompt": ""
                }
            },
            "fca_lest_rpt": {
                "name": "遗留问题",
                "classify": 1,
                "ctype": 2,
                "dtype": {
                    "type": "char",
                    "len": "",
                    "dec": "",
                    "def": "",
                    "min": "",
                    "max": ""
                },
                "attr": {
                    "etype": "mtext",
                    "width": 340,
                    "notnull": 1,
                    "mtext_rows": 3,
                    "prompt": ""
                }
            },
            "fca_finish_verify": {
                "name": "归零检查",
                "classify": 1,
                "ctype": 2,
                "dtype": {
                    "type": "char",
                    "len": "",
                    "dec": "",
                    "def": "",
                    "min": "",
                    "max": ""
                },
                "attr": {
                    "etype": "mtext",
                    "width": 340,
                    "notnull": 1,
                    "mtext_rows": 3,
                    "prompt": ""
                }
            },
            "fca_audit_rpt": {
                "name": "实施审核意见",
                "classify": 1,
                "ctype": 2,
                "dtype": {
                    "type": "char",
                    "len": "",
                    "dec": "",
                    "def": "",
                    "min": "",
                    "max": ""
                },
                "attr": {
                    "etype": "mtext",
                    "width": 340,
                    "notnull": 1,
                    "mtext_rows": 3,
                    "prompt": ""
                }
            },
            "fca_customer_cms": {
                "name": "顾客代表意见",
                "classify": 1,
                "ctype": 2,
                "dtype": {
                    "type": "char",
                    "len": "",
                    "dec": "",
                    "def": "",
                    "min": "",
                    "max": ""
                },
                "attr": {
                    "etype": "mtext",
                    "width": 340,
                    "notnull": 1,
                    "mtext_rows": 3,
                    "prompt": ""
                }
            },
            "_uid_R1": {
                "name": "【指定核实人员】主办人",
                "classify": 2,
                "ctype": 3,
                "dtype": null,
                "attr": []
            },
            "_uid_R2": {
                "name": "【核实登记】主办人",
                "classify": 2,
                "ctype": 3,
                "dtype": null,
                "attr": []
            },
            "_uid_R3": {
                "name": "【核实确认】主办人",
                "classify": 2,
                "ctype": 3,
                "dtype": null,
                "attr": []
            },
            "_uid_R5": {
                "name": "【设计所批办】主办人",
                "classify": 2,
                "ctype": 3,
                "dtype": null,
                "attr": []
            },
            "_uid_R6": {
                "name": "【质量部批办】主办人",
                "classify": 2,
                "ctype": 3,
                "dtype": null,
                "attr": []
            },
            "_uid_R7": {
                "name": "【审查登记】主办人",
                "classify": 2,
                "ctype": 3,
                "dtype": null,
                "attr": []
            },
            "_uid_R9": {
                "name": "【审查确认】主办人",
                "classify": 2,
                "ctype": 3,
                "dtype": null,
                "attr": []
            },
            "_uid_A1": {
                "name": "【分析部门批办】主办人",
                "classify": 2,
                "ctype": 3,
                "dtype": null,
                "attr": []
            },
            "_uid_A2": {
                "name": "【故障分析登记】主办人",
                "classify": 2,
                "ctype": 3,
                "dtype": null,
                "attr": []
            },
            "_uid_A3": {
                "name": "【故障分析审查】主办人",
                "classify": 2,
                "ctype": 3,
                "dtype": null,
                "attr": []
            },
            "_uid_C1": {
                "name": "【实施单位批办】主办人",
                "classify": 2,
                "ctype": 3,
                "dtype": null,
                "attr": []
            },
            "_uid_C2": {
                "name": "【实施情况登记】主办人",
                "classify": 2,
                "ctype": 3,
                "dtype": null,
                "attr": []
            },
            "_uid_C3": {
                "name": "【故障归零检查】主办人",
                "classify": 2,
                "ctype": 3,
                "dtype": null,
                "attr": []
            },
            "_uid_C4": {
                "name": "【故障归零审查】主办人",
                "classify": 2,
                "ctype": 3,
                "dtype": null,
                "attr": []
            },
            "_uid_C5": {
                "name": "【顾客代表确认】主办人",
                "classify": 2,
                "ctype": 3,
                "dtype": null,
                "attr": []
            }
        }
    },
    "dataset": {
        "fas_reason_categ": {
            "name": "原因分类",
            "from": "fra0001m",
            "where": "code='reason_categ'",
            "orderby": "order",
            "fields": {
                "value": {
                    "name": "分类代码",
                    "fieldsql": "value"
                },
                "text": {
                    "name": "分类名称",
                    "fieldsql": "text"
                }
            },
            "pk_code": "value",
            "pk_desc": "text"
        },
        "fas_failure_categ": {
            "name": "故障分类",
            "from": "fra0001m",
            "where": "code='failure_categ'",
            "orderby": "order",
            "fields": {
                "value": {
                    "name": "分类代码",
                    "fieldsql": "value"
                },
                "text": {
                    "name": "分类名称",
                    "fieldsql": "text"
                }
            },
            "pk_code": "value",
            "pk_desc": "text"
        },
        "fas_implement_adv": {
            "name": "实施建议",
            "from": "fra0001m",
            "where": "code='implement_adv'",
            "orderby": "order",
            "fields": {
                "value": {
                    "name": "分类代码",
                    "fieldsql": "value"
                },
                "text": {
                    "name": "分类名称",
                    "fieldsql": "text"
                }
            },
            "pk_code": "value",
            "pk_desc": "text"
        }
    },
    "callback": {
        "module": "flowFrp1000c",
        "args": {
            "frp_submit_uid": {
                "name": "指定核实人员的主办人",
                "map": "_uid_R1"
            },
            "frp_check_rpt": {
                "name": "故障核实情况",
                "map": "frp_check_rpt"
            },
            "frp_check_uid": {
                "name": "故障核实人",
                "map": "_uid_R2"
            },
            "frp_check_confirm_uid": {
                "name": "故障核实确认人",
                "map": "_uid_R3"
            },
            "frp_audit_super_uid1": {
                "name": "设计所批办人",
                "map": "_uid_R5"
            },
            "frp_audit_super_uid2": {
                "name": "质量部批办人",
                "map": "_uid_R6"
            },
            "frp_audit_rpt": {
                "name": "故障审查情况",
                "map": "frp_audit_rpt"
            },
            "frp_audit_uid": {
                "name": "故障审查人",
                "map": "_uid_R7"
            },
            "frp_audit_confirm_uid": {
                "name": "故障审查确认人",
                "map": "_uid_R9"
            },
            "fas_stru_id": {
                "name": "故障分析单位",
                "map": "fas_stru_id"
            },
            "fas_super_uid": {
                "name": "分析部门批办人",
                "map": "_uid_A1"
            },
            "fas_reason_categ": {
                "name": "原因分类",
                "map": "fas_reason_categ"
            },
            "fas_reason_other": {
                "name": "其他原因分类",
                "map": "fas_reason_other"
            },
            "fas_failure_categ": {
                "name": "故障分类",
                "map": "fas_failure_categ"
            },
            "fas_failure_other": {
                "name": "其他故障分类",
                "map": "fas_failure_other"
            },
            "fas_implement_adv": {
                "name": "实施建议",
                "map": "fas_implement_adv"
            },
            "fas_implement_other": {
                "name": "其他实施建议",
                "map": "fas_implement_other"
            },
            "fas_reason": {
                "name": "故障原因分析",
                "map": "fas_reason"
            },
            "fas_reason_files": {
                "name": "原因分析附件",
                "map": "fas_reason_files"
            },
            "fas_correct": {
                "name": "纠正措施",
                "map": "fas_correct"
            },
            "fas_correct_files": {
                "name": "纠正措施附件",
                "map": "fas_correct_files"
            },
            "fas_check_require": {
                "name": "验证要求",
                "map": "fas_check_require"
            },
            "fas_sign_uid": {
                "name": "故障分析登记人",
                "map": "_uid_A2"
            },
            "fas_audit_rpt": {
                "name": "故障分析审核意见",
                "map": "fas_audit_rpt"
            },
            "fas_audit_uid": {
                "name": "故障分析审核人",
                "map": "_uid_A3"
            },
            "fca_stru_id": {
                "name": "故障实施部门",
                "map": "fca_stru_id"
            },
            "fca_super_uid": {
                "name": "实施部门批办人",
                "map": "_uid_C1"
            },
            "fca_method": {
                "name": "纠正措施实施情况",
                "map": "fca_method"
            },
            "fca_method_verify": {
                "name": "效果验证情况",
                "map": "fca_method_verify"
            },
            "fca_lest_rpt": {
                "name": "遗留问题",
                "map": "fca_lest_rpt"
            },
            "fca_sign_uid": {
                "name": "实施登记人",
                "map": "_uid_C2"
            },
            "fca_finish_verify": {
                "name": "归零检查",
                "map": "fca_finish_verify"
            },
            "fca_finish_uid": {
                "name": "归零检查人",
                "map": "_uid_C3"
            },
            "fca_audit_rpt": {
                "name": "实施审核意见",
                "map": "fca_audit_rpt"
            },
            "fca_audit_uid": {
                "name": "实施审核人",
                "map": "_uid_C4"
            },
            "fca_customer_cms": {
                "name": "顾客代表意见",
                "map": "fca_customer_cms"
            },
            "fca_customer_uid": {
                "name": "顾客代表人员",
                "map": "_uid_C5"
            }
        }
    },
    "step": [
        {
            "code": "_start",
            "name": "故障填报",
            "type": 1,
            "prev": "",
            "next": "R1",
            "attr": []
        },
        {
            "code": "R1",
            "name": "指定核实人员",
            "type": 2,
            "prev": "_start",
            "next": "R2",
            "attr": {
                "col_list": [
                    "frp_checker"
                ],
                "can_revoke": 0,
                "auth_list": null,
                "filter_by": {
                    "type": 7,
                    "val": ""
                }
            }
        },
        {
            "code": "R2",
            "name": "核实登记",
            "type": 2,
            "prev": "R1",
            "next": "R3",
            "attr": {
                "col_list": [
                    "frp_check_rpt"
                ],
                "can_revoke": 0,
                "auth_list": null,
                "filter_by": {
                    "type": 2,
                    "val": "frp_checker"
                }
            }
        },
        {
            "code": "R3",
            "name": "核实确认",
            "type": 2,
            "prev": "R2",
            "next": "R4",
            "attr": {
                "col_list": [
                    "frp_product_model"
                ],
                "can_revoke": 1,
                "auth_list": [
                    {
                        "obj_type": 2,
                        "obj_id": "1082"
                    }
                ],
                "filter_by": {
                    "type": 1,
                    "val": ""
                }
            }
        },
        {
            "code": "R4",
            "name": "是否设计所负责",
            "type": 3,
            "prev": "R3",
            "next": "R5,R6",
            "attr": {
                "expr_list": [
                    [
                        "",
                        "",
                        "frp_product_model",
                        "in",
                        [
                            "C",
                            "S"
                        ],
                        ""
                    ]
                ],
                "y_step": "R5",
                "n_step": "R6"
            }
        },
        {
            "code": "R5",
            "name": "设计所批办",
            "type": 2,
            "prev": "R4",
            "next": "R7",
            "attr": {
                "col_list": [
                    "frp_auditor"
                ],
                "can_revoke": 0,
                "auth_list": [
                    {
                        "obj_type": 1,
                        "obj_id": "1030"
                    }
                ],
                "filter_by": {
                    "type": 8,
                    "val": ""
                }
            }
        },
        {
            "code": "R6",
            "name": "质量部批办",
            "type": 2,
            "prev": "R4",
            "next": "R7",
            "attr": {
                "col_list": [
                    "frp_auditor"
                ],
                "can_revoke": 0,
                "auth_list": [
                    {
                        "obj_type": 1,
                        "obj_id": "1025"
                    }
                ],
                "filter_by": {
                    "type": 8,
                    "val": ""
                }
            }
        },
        {
            "code": "R7",
            "name": "审查登记",
            "type": 2,
            "prev": "R5,R6",
            "next": "R8",
            "attr": {
                "col_list": [
                    "frp_audit_rpt",
                    "run_fracas",
                    "fas_stru_id"
                ],
                "can_revoke": 0,
                "auth_list": [
                    {
                        "obj_type": 2,
                        "obj_id": "1083"
                    },
                    {
                        "obj_type": 2,
                        "obj_id": "1086"
                    }
                ],
                "filter_by": {
                    "type": 2,
                    "val": "frp_auditor"
                },
                "data_check": [
                    {
                        "expr_list": [
                            [
                                "",
                                "",
                                "run_fracas",
                                "=",
                                "1",
                                ""
                            ],
                            [
                                "&",
                                "",
                                "fas_stru_id",
                                "n",
                                "",
                                ""
                            ]
                        ],
                        "msg": "需要运行FRACAS时，必须指定【分析部门】"
                    }
                ]
            }
        },
        {
            "code": "R8",
            "name": "是否运行FRACAS",
            "type": 3,
            "prev": "R7",
            "next": "R9,_end",
            "attr": {
                "expr_list": [
                    [
                        "",
                        "",
                        "run_fracas",
                        "=",
                        "1",
                        ""
                    ]
                ],
                "y_step": "R9",
                "n_step": "_end"
            }
        },
        {
            "code": "R9",
            "name": "审查确认",
            "type": 2,
            "prev": "R8",
            "next": "A1",
            "attr": {
                "col_list": null,
                "can_revoke": 1,
                "auth_list": [
                    {
                        "obj_type": 2,
                        "obj_id": "1082"
                    }
                ],
                "filter_by": {
                    "type": 1,
                    "val": ""
                }
            }
        },
        {
            "code": "A1",
            "name": "分析部门批办",
            "type": 2,
            "prev": "R9",
            "next": "A2",
            "attr": {
                "col_list": [
                    "fas_uid"
                ],
                "can_revoke": 0,
                "auth_list": [
                    {
                        "obj_type": 1,
                        "obj_id": "1030"
                    },
                    {
                        "obj_type": 1,
                        "obj_id": "1080"
                    },
                    {
                        "obj_type": 1,
                        "obj_id": "1081"
                    },
                    {
                        "obj_type": 1,
                        "obj_id": "1082"
                    },
                    {
                        "obj_type": 1,
                        "obj_id": "1083"
                    },
                    {
                        "obj_type": 1,
                        "obj_id": "1084"
                    },
                    {
                        "obj_type": 1,
                        "obj_id": "1085"
                    },
                    {
                        "obj_type": 1,
                        "obj_id": "1086"
                    },
                    {
                        "obj_type": 1,
                        "obj_id": "1087"
                    },
                    {
                        "obj_type": 1,
                        "obj_id": "1089"
                    },
                    {
                        "obj_type": 1,
                        "obj_id": "1090"
                    },
                    {
                        "obj_type": 1,
                        "obj_id": "1091"
                    }
                ],
                "filter_by": {
                    "type": 3,
                    "val": "fas_stru_id"
                }
            }
        },
        {
            "code": "A2",
            "name": "故障分析登记",
            "type": 2,
            "prev": "A1",
            "next": "A3",
            "attr": {
                "col_list": [
                    "fas_reason_categ",
                    "fas_reason_other",
                    "fas_failure_categ",
                    "fas_failure_other",
                    "fas_implement_adv",
                    "fas_implement_other",
                    "fas_reason",
                    "fas_reason_files",
                    "fas_correct",
                    "fas_correct_files",
                    "fas_check_require"
                ],
                "can_revoke": 0,
                "auth_list": null,
                "filter_by": {
                    "type": 2,
                    "val": "fas_uid"
                },
                "data_check": [
                    {
                        "expr_list": [
                            [
                                "",
                                "",
                                "fas_reason_categ",
                                "=",
                                "H",
                                ""
                            ],
                            [
                                "&",
                                "",
                                "fas_reason_other",
                                "n",
                                "",
                                ""
                            ]
                        ],
                        "msg": "“原因分类”选择其他时，必须填写【其他原因描述】"
                    },
                    {
                        "expr_list": [
                            [
                                "",
                                "",
                                "fas_failure_categ",
                                "=",
                                "H",
                                ""
                            ],
                            [
                                "&",
                                "",
                                "fas_failure_other",
                                "n",
                                "",
                                ""
                            ]
                        ],
                        "msg": "“故障分类”选择其他时，必须填写【其他故障描述】"
                    },
                    {
                        "expr_list": [
                            [
                                "",
                                "",
                                "fas_implement_adv",
                                "%",
                                "H",
                                ""
                            ],
                            [
                                "&",
                                "",
                                "fas_implement_other",
                                "n",
                                "",
                                ""
                            ]
                        ],
                        "msg": "“实施建议”勾选其他时，必须填写【其他实施建议】"
                    }
                ]
            }
        },
        {
            "code": "A3",
            "name": "故障分析审查",
            "type": 2,
            "prev": "A2",
            "next": "C1",
            "attr": {
                "col_list": [
                    "fas_audit_rpt",
                    "fca_stru_id"
                ],
                "can_revoke": 1,
                "auth_list": null,
                "filter_by": {
                    "type": 5,
                    "val": "R7"
                }
            }
        },
        {
            "code": "C1",
            "name": "实施单位批办",
            "type": 2,
            "prev": "A3",
            "next": "C2",
            "attr": {
                "col_list": [
                    "fca_uid"
                ],
                "can_revoke": 0,
                "auth_list": [
                    {
                        "obj_type": 1,
                        "obj_id": "1030"
                    },
                    {
                        "obj_type": 1,
                        "obj_id": "1080"
                    },
                    {
                        "obj_type": 1,
                        "obj_id": "1081"
                    },
                    {
                        "obj_type": 1,
                        "obj_id": "1082"
                    },
                    {
                        "obj_type": 1,
                        "obj_id": "1083"
                    },
                    {
                        "obj_type": 1,
                        "obj_id": "1084"
                    },
                    {
                        "obj_type": 1,
                        "obj_id": "1085"
                    },
                    {
                        "obj_type": 1,
                        "obj_id": "1086"
                    },
                    {
                        "obj_type": 1,
                        "obj_id": "1087"
                    },
                    {
                        "obj_type": 1,
                        "obj_id": "1089"
                    },
                    {
                        "obj_type": 1,
                        "obj_id": "1090"
                    },
                    {
                        "obj_type": 1,
                        "obj_id": "1091"
                    }
                ],
                "filter_by": {
                    "type": 3,
                    "val": "fca_stru_id"
                }
            }
        },
        {
            "code": "C2",
            "name": "实施情况登记",
            "type": 2,
            "prev": "C1",
            "next": "C3",
            "attr": {
                "col_list": [
                    "fca_method",
                    "fca_method_verify",
                    "fca_lest_rpt"
                ],
                "can_revoke": 0,
                "auth_list": null,
                "filter_by": {
                    "type": 2,
                    "val": "fca_uid"
                }
            }
        },
        {
            "code": "C3",
            "name": "故障归零检查",
            "type": 2,
            "prev": "C2",
            "next": "C4",
            "attr": {
                "col_list": [
                    "fca_finish_verify"
                ],
                "can_revoke": 0,
                "auth_list": [
                    {
                        "obj_type": 2,
                        "obj_id": "1080"
                    }
                ],
                "filter_by": {
                    "type": 7,
                    "val": ""
                }
            }
        },
        {
            "code": "C4",
            "name": "故障归零审查",
            "type": 2,
            "prev": "C3",
            "next": "C5",
            "attr": {
                "col_list": [
                    "fca_audit_rpt"
                ],
                "can_revoke": 0,
                "auth_list": null,
                "filter_by": {
                    "type": 5,
                    "val": "R7"
                }
            }
        },
        {
            "code": "C5",
            "name": "顾客代表确认",
            "type": 2,
            "prev": "C4",
            "next": "_end",
            "attr": {
                "col_list": [
                    "fca_customer_cms"
                ],
                "can_revoke": 0,
                "auth_list": [
                    {
                        "obj_type": 1,
                        "obj_id": "1092"
                    }
                ],
                "filter_by": {
                    "type": 6,
                    "val": ""
                }
            }
        },
        {
            "code": "_end",
            "name": "流程结束",
            "type": 9,
            "prev": "C5",
            "next": "",
            "attr": []
        }
    ]
};




export {Cfg}