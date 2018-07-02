let Schema = {
    users: {
        id              : {type: 'increments', nullable: false, primary: true},
        nm_login        : {type: 'string', maxlength: 50, nullable: false, unique: true},
        ds_pwd          : {type: 'string', maxlength: 255, nullable: false},
        nm_first        : {type: 'string', maxlength: 254, nullable: false},
        nm_last         : {type: 'string', maxlength: 254, nullable: false},
        ds_email        : {type: 'string', maxlength: 100 },
        ds_biography    : {type: 'text', maxlength: 16777215, fieldtype: 'medium', nullable: true},
        img_profile     : {type: 'string', maxlength: 255, nullable: false, defaultTo: 'avatar-default.gif'},
        img_background  : {type: 'text', maxlength: 16777215, fieldtype: 'medium', nullable: true},
        dt_birth        : {type: 'date'},
        created_at      : {type: 'timestamp', nullable: false},
        updated_at      : {type: 'timestamp', nullable: true},
        
    },
    
    projects: {
        id              : {type: 'increments', nullable: false, primary: true},
        cd_user         : {type: 'integer', nullable: false, unsigned: true},
        cd_category     : {type: 'integer', nullable: false, unsigned: true},
        nm_title        : {type: 'string', maxlength: 100, nullable: false, unique: true},
        ds_resume       : {type: 'string', maxlength: 200, nullable: true},
        ds_project      : {type: 'text', maxlength: 16777215, fieldtype: 'medium'},
        vl_meta         : {type: 'decimal', nullable: false},
        vl_collected    : {type: 'decimal', nullable: false, defaultTo: 0.00},
        dt_begin        : {type: 'date', nullable: false},
        dt_end          : {type: 'date', nullable: false},
        img_cover       : {type: 'text', maxlength: 16777215, fieldtype: 'medium', nullable: true},
        img_background  : {type: 'text', maxlength: 16777215, fieldtype: 'medium', nullable: true},
        qt_visitation   : {type: 'integer', nullable: false, defaultTo: 0},
        ic_close        : {type: 'boolean', nullable: false, defaultTo: 'false'},
        created_at      : {type: 'timestamp', nullable: false},
        updated_at      : {type: 'timestamp', nullable: true},
    },
    
    financing: {
        id              : {type: 'increments', nullable: false, primary: true},
        cd_project      : {type: 'integer', nullable: false, unsigned: true},
        cd_user         : {type: 'integer', nullable: false, unsigned: true},
        vl_financing    : {type: 'decimal', nullable: false},
        dt_financing    : {type: 'dateTime', nullable: false},
        dt_payment      : {type: 'dateTime', nullable: false},
        nm_paymethod    : {type: 'specificType', specificType: 'paymethod', nullable: false},
        ic_paid         : {type: 'boolean'},
        created_at      : {type: 'timestamp', nullable: false},
        updated_at      : {type: 'timestamp', nullable: true},
    },
    
    categories: {
        id              : {type: 'increments', nullable: false, primary: true},
        nm_category     : {type: 'string', maxlength: 100, nullable: false},
        ds_category     : {type: 'text', maxlength: 16777215, fieldtype: 'medium', nullable: false},
        img_main        : {type: 'text', maxlength: 16777215, fieldtype: 'medium', nullable: true},
        img_background  : {type: 'text', maxlength: 16777215, fieldtype: 'medium', nullable: true},
        created_at      : {type: 'timestamp', nullable: false},
        updated_at      : {type: 'timestamp', nullable: true},
    },
    
    coauthors: {
        id              : {type: 'increments', nullable: false, primary: true},
        cd_project      : {type: 'integer', nullable: false, unsigned: true},
        cd_author       : {type: 'integer', nullable: false, unsigned: true},
        cd_coauthor     : {type: 'integer', nullable: false, unsigned: true},
        nm_type         : {type: 'string', maxlength: 50, nullable: false},
        created_at      : {type: 'timestamp', nullable: false},
        updated_at      : {type: 'timestamp', nullable: true},
    },
    
    rewards: {
        id              : {type: 'increments', nullable: false, primary: true},
        cd_project      : {type: 'integer', nullable: false, unsigned: true},
        vl_reward       : {type: 'integer', nullable: false},
        ds_reward       : {type: 'text', maxlength: 16777215, fieldtype: 'medium', nullable: true},
        qt_paid         : {type: 'integer', nullable: false, defaultTo: 0},
        created_at      : {type: 'timestamp', nullable: false},
        updated_at      : {type: 'timestamp', nullable: true},
    },
    
    tags: {
        id              : {type: 'increments', nullable: false, primary: true},
        nm_tag          : {type: 'string', nullable: false},
        created_at      : {type: 'timestamp', nullable: false},
        updated_at      : {type: 'timestamp', nullable: true},
    },
    
    comments: {
        id              : {type: 'increments', nullable: false, primary: true},
        cd_user         : {type: 'integer', nullable: false, unsigned: true},
        cd_project      : {type: 'integer', nullable: false, unsigned: true},
        ds_comment      : {type: 'text', maxlength: 16777215, fieldtype: 'medium', nullable: false},
        ic_hold         : {type: 'boolean', nullable: false, defaultTo: 'false'},
        created_at      : {type: 'timestamp', nullable: false},
        updated_at      : {type: 'timestamp', nullable: true},
    },
    
    tags_projects: {
        id              : {type: 'increments', nullable: false, primary: true},
        cd_tag          : {type: 'integer', nullable: false, unsigned: true},
        cd_project      : {type: 'integer', nullable: false, unsigned: true},
        created_at      : {type: 'timestamp', nullable: false},
        updated_at      : {type: 'timestamp', nullable: true},
    }
};

module.exports = Schema;