export const Config = {
    defaultAppConfiguraiton: {
        logo: {
            name: "Logo Name",
            key: "logo_name",
            description: "logo_name",
            value: "GRC&A",
            boolValue: true
        },
        passwordLength: {
            name: "Password Length",
            key: "password_length",
            description: "password_length",
            value: 12,
            boolValue: true
        },
        passwordMinLength: {
            name: "Password Min Length",
            key: "password_min_length",
            description: "password_min_length",
            value: 6,
            boolValue: true
        },
        passwordMaxLength: {
            name: "Password Max Length",
            key: "password_max_length",
            description: "password_max_length",
            value: 12,
            boolValue: true
        },
        passwordNumericLength: {
            name: "Password Numeric Length",
            key: "password_numeric_length",
            description: "password_numeric_length",
            value: 3,
            boolValue: true
        },
        passwordAphabetUpperCaseLength: {
            name: "Password Alphabet Uppercase Length",
            key: "password_alphabet_uppercase_length",
            description: "password_alphabet_uppercase_length",
            value: 3,
            boolValue: true
        },
        passwordAphabetLowerCaseLength: {
            name: "Password Alphabet Lowercase Length",
            key: "password_alphabet_lowercase_length",
            description: "password_alphabet_lowercase_length",
            value: 3,
            boolValue: true
        },
        passwordSpecialCharacterLength: {
            name: "Password Special Character Length",
            key: "password_special_character_length",
            description: "password_special_character_length",
            value: 3,
            boolValue: true
        },
        passwordResection: {
            name: "Password Resection",
            key: "password_resection",
            description: "password_resection",
            value: 1,
            boolValue: true
        },
        passwordHistory: {
            name: "Password History",
            key: "password_history",
            description: "password_history",
            value: 1,
            boolValue: true
        },
        passwordChangeFrequency: {
            name: "Password Change Frequency",
            key: "password_change_frequency",
            description: "password_change_frequency",
            value: 1,
            boolValue: true
        },
        passwordForceToChangeInFirstLogin: {
            name: "Password Force To Change In First Login",
            key: "password_force_to_change_in_first_login",
            description: "password_force_to_change_in_first_login",
            value: 1,
            boolValue: true
        },
        noOfInvalidLogin: {
            name: "No Of Invalid Login",
            key: "no_of_invalid_login",
            description: "no_of_invalid_login",
            value: 5,
            boolValue: true
        },
        sessionTimeOut: {
            name: "Session TimeOut",
            key: "session_timeOut",
            description: "",
            value: 3600,
            boolValue: true
        },   // (in second ): 5,
        noOfConcurrentUserSession: {
            name: "No Of Concurrent User Session",
            key: "no_of_concurrent_user_session",
            description: "no_of_concurrent_user_session",
            value: 1,
            boolValue: true
        },

    },
    departmentHeadKey: "test",
    genericTooltip: {
        image: "Recommended dimensions of image are HXX x WXX",
        imageThumbnail: "Recommended dimensions of thumbnail are HXX x WXX",
        thumbnail: "Recommended dimensions of thumbnail are HXX x WXX",
        thumbnailImage: "Recommended dimensions of image are HXX x WXX"
    },
    pattern: {
        name: {
            regex: null,
            tooltip: null,
            maxLength: 40
        },
        code: {
            regex: null,
            tooltip: null,
            maxLength: 40
        },
        key: {
            regex: null,
            tooltip: null,
            maxLength: 40
        },
        description: {
            regex: null,
            tooltip: null,
            maxLength: 4000
        },
        icon: {
            regex: null,
            tooltip: null,
            maxLength: 40
        },
        pageUrl: {
            regex: null,
            tooltip: null,
            maxLength: 200
        },
        fName: {
            regex: null,
            tooltip: null,
            maxLength: 40
        },
        lName: {
            regex: null,
            tooltip: null,
            maxLength: 40
        },
        userName: {
            regex: null,
            tooltip: null,
            maxLength: 40
        },
        empCode: {
            // regex: /^(?=.*\d)(?=.*[a-zA-Z])([a-zA-Z0-9])+$/,
            // regex: /^([a-zA-Z0-9])+$/,
            // tooltip: 'Pattern e.g "AAaa11122"'
            regex: null,
            tooltip: null,
            maxLength: 50
        },
        email: {
            // regex: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            regex: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/,
            tooltip: 'Pattern e.g "example@test.com"',
            maxLength: 50
        },
        password: {
            regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[\w~@#$%^&*+=`|{}:;!.?\"()\[\]-]{6,20}$/,
            tooltip: 'Password should be min 8 digit , max 20 digit and combination of alphanumberic and specified special characters (!@#$%^&*_+) with 1 uppercase letter, 1 lowercase letter and  1 numeric character'
        },
        cnic: {
            regex: /^\(?([0-9]{5})\)?[-. ]?([0-9]{7})[-. ]?([0-9]{1})$/,
            tooltip: 'Pattern e.g "42101-1234567-7"',
            maxLength: 15
        },
        mobileNo: {
            // regex: /^\(?([0-9]{4})\)?[-. ]?([0-9]{7})$/,
            // tooltip: 'Pattern e.g "0347-1234567"',
            // maxLength: 12
            regex: null,
            tooltip: null,
            maxLength: 20
        },
        phoneNo: {
            // regex: /^\(?([0-9]{3})\)?[-. ]?([0-9]{8})$/,
            // tooltip: 'Pattern e.g "021-12345678"',
            // maxLength: 12
            regex: null,
            tooltip: null,
            maxLength: 20
        },
        website: {
            regex: /^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/,
            tooltip: "Eg. www.t.com || http://www.t.com || https://www.t.com",
            maxLength: 100
        },
        youtube: {
            regex: /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/,
            tooltip: "Eg. www.t.com || http://www.t.com || https://www.t.com",
            maxLength: 100
        },
        number: {
            regex: /^[0-9]+$/,
            tooltip: 'Accept only number 0-9',
            // maxValue: 2147483647,
            maxValue: 999999999,
            maxLength: 9
        },
        date: {
            regex: null,
            tooltip: null,
            maxValue: "9999-12-31"
            // maxLength: "9999-12-31"
        },

        onlyAcceptNumber: {
            regex: /^[0-9]+$/,
            tooltip: 'Accept only number 0-9'
        },
        genericOne: {
            regex: /^[A-Za-z\u00C0-\u00ff]+((-| |')[A-Za-z\u00C0-\u00ff]+)*$/,
            tooltip: null,
            maxLength: 40
        },
        genericTwo: {
            regex: /^[A-Za-z\u00C0-\u00ff]+([0-9][A-Za-z\u00C0-\u00ff]*)?((-| |')*[A-Za-z0-9\u00C0-\u00ff]+)*$/,
            tooltip: null,
            maxLength: 100
        },
        genericThree: {
            regex: /[^a-zA-Z0-9-@._ ]/g,
            tooltip: null,
            maxLength: 200
        },
        genericFour: {
            regex: null,
            tooltip: null,
            maxLength: 500
        },
        genericFive: {
            regex: null,
            tooltip: null,
            maxLength: 1000
        },
        genericSix: {
            regex: null,
            tooltip: null,
            maxLength: 4000
        },
        taxNumber: {
            regex: /^[0-9]{8}/,
            tooltip: 'Pattern e.g "Accept only number 0-9"',
            maxLength: 8
        }
    },
    ngxEditorConfig: {
        "editable": true,
        "spellcheck": true,
        "charCounterMax": 5000,
        "maxlength": "12",
        "height": "auto",
        "minHeight": "10",
        "width": "auto",
        "minWidth": "0",
        "translate": "yes",
        "enableToolbar": true,
        "showToolbar": true,
        "placeholder": "Enter text here...",
        "imageEndPoint": "",
        "toolbar": [
            ["bold", "italic", "underline", "strikeThrough", "superscript", "subscript"],
            // ["fontName", "fontSize", "color"],
            // ["justifyLeft", "justifyCenter", "justifyRight", "justifyFull", "indent", "outdent"],
            ["cut", "copy", "delete", "removeFormat", "undo", "redo"],
            ["paragraph", "blockquote", "removeBlockquote", "horizontalLine", "orderedList", "unorderedList"],
            // ["link", "unlink", "image", "video"]
        ]
    },
    areaTypeList: [
        {
            id: 1,
            name: "Generic",
            code: "generic",
        },
        {
            id: 2,
            name: "Procedure",
            code: "procedure",
        },
        {
            id: 3,
            name: "Memorandum",
            code: "memorandum",
        },
        {
            id: 4,
            name: "Draft Observation",
            code: "draft_observation",
        },
        {
            id: 5,
            name: "Observation",
            code: "observation",
        }

    ],
    timeType: [
        {
            id: 1,
            name: "Second",
            code: "sec",
        },
        {
            id: 2,
            name: "Minute",
            code: "min",
        },
        // {
        //     id: 3,
        //     name: "Hour",
        //     code: "hour",
        // }

    ],
    timeTypeVo: [
        {
            id: 1,
            name: "Minute",
            code: "min",
        },
        {
            id: 2,
            name: "Hour",
            code: "hour",
        }

    ],
    days: [
        {
            id: 1,
            name: "Monday",
            code: "monday",
        },
        {
            id: 2,
            name: "Tuesday",
            code: "tuesday",
        },
        {
            id: 3,
            name: "Wednesday",
            code: "wednesday",
        },
        {
            id: 4,
            name: "Thursday",
            code: "thursday",
        },
        {
            id: 5,
            name: "Friday",
            code: "friday",
        },
        {
            id: 6,
            name: "Saturday",
            code: "saturday",
        },
        {
            id: 7,
            name: "Sunday",
            code: "sunday",
        }
    ],
    msg: {
        permissionPop: "Sorry, You dont have permission",
        permission: "Dont have permission"
    },
    allowedUploadSizeInByte: {
        image: 2000000,     // 2mb
        doc: 10000000,      // 10mb
        video: 10000000     // 10mb
    },
    dimensionCheck: {
        causeLogo: false,
        causeBanner: true,
        scrollingItem: true,
    },
    allowedGenericImageDimension: {
        minWidth: 0,
        maxWidth: 400,
        minHeight: 0,
        maxHeight: 225
    },
    allowedGenericThumbnailDimension: {
        minWidth: 0,
        maxWidth: 80,
        minHeight: 0,
        maxHeight: 55
    },
    allowedImageExt: [
        {
            id: 1,
            name: "Jpg",
            ext: ".jpg",
            type: "image/jpeg"
        },
        {
            id: 2,
            name: "Jpeg",
            ext: ".jpeg",
            type: "image/jpeg"
        },
        {
            id: 3,
            name: "Png",
            ext: ".png",
            type: "image/png"
        },
        {
            id: 4,
            name: "Gif",
            ext: ".gif",
            type: "image/gif"
        },
        {
            id: 5,
            name: "Svg",
            ext: ".svg",
            type: "image/svg+xml"
        },
        // {
        //     id: 5,
        //     name: "Tif",
        //     ext: ".tif"
        // },
        // {
        //     id: 6,
        //     name: "Tiff",
        //     ext: ".tiff"
        // }
    ],
    allowedImageType: [
        {
            id: 1,
            name: "image/jpeg",
            type: "image/jpeg"
        },
        {
            id: 2,
            name: "image/png",
            type: "image/png"
        },
        {
            id: 3,
            name: "image/gif",
            type: "image/gif"
        },
        {
            id: 4,
            name: "image/svg+xml",
            type: "image/svg+xml"
        },
        // {
        //     id: 5,
        //     name: "image/tiff",
        //     type: "image/tiff"
        // }
    ],
    allowedDocExt: [
        {
            id: 1,
            name: "PDF",
            ext: ".pdf",
            type: "application/pdf"
        },
        {
            id: 2,
            name: "Xlsx",
            ext: ".xlsx",
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        },
        {
            id: 3,
            name: "Xls",
            ext: ".xls",
            type: "application/vnd.ms-excel"
        },
        {
            id: 4,
            name: "Xlsb",
            ext: ".xlsb",
            type: "application/vnd.ms-excel.sheet.binary.macroEnabled.12"
        },
        {
            id: 5,
            name: "Xlsm",
            ext: ".xlsm",
            type: "application/vnd.ms-excel.sheet.macroEnabled.12"
        },
        {
            id: 6,
            name: "Doc",
            ext: ".doc",
            type: "application/msword"
        },
        {
            id: 7,
            name: "Docx",
            ext: ".docx",
            type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        },
        {
            id: 8,
            name: "Docs",
            ext: ".docs",
            type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        },
        {
            id: 9,
            name: "Txt",
            ext: ".txt",
            type: "text/plain"
        }
    ],
    allowedDocType: [
        {
            id: 1,
            name: "application/pdf",
            type: "application/pdf"
        },
        {
            id: 2,
            name: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        },
        {
            id: 3,
            name: "application/vnd.ms-excel",
            type: "application/vnd.ms-excel"
        },
        {
            id: 4,
            name: "application/vnd.ms-excel.sheet.binary.macroEnabled.12",
            type: "application/vnd.ms-excel.sheet.binary.macroEnabled.12"
        },
        {
            id: 5,
            name: "application/vnd.ms-excel.sheet.macroEnabled.12",
            type: "application/vnd.ms-excel.sheet.macroEnabled.12"
        },
        {
            id: 6,
            name: "application/msword",
            type: "application/msword"
        },
        {
            id: 7,
            name: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        },
        {
            id: 8,
            name: "text/plain",
            type: "text/plain"
        },
    ],
    allowedVideoExt: [
        {
            id: 1,
            name: "MP4",
            ext: ".mp4",
            type: "video/mp4"
        },
        {
            id: 2,
            name: "MOV",
            ext: ".mov",
            type: "video/quicktime"
        },
        {
            id: 3,
            name: "FLV",
            ext: ".flv",
            type: "video/x-flv"
        }
        // {
        //     id: 4,
        //     name: "3gp",
        //     ext: ".3gp"
        // },
        // {
        //     id: 5,
        //     name: "ts",
        //     ext: ".ts"
        // },
    ],
    allowedVideoType: [
        {
            id: 1,
            name: "video/mp4",
            type: "video/mp4"
        },
        {
            id: 2,
            name: "video/quicktime",
            type: "video/quicktime"
        },
        {
            id: 3,
            name: "video/x-flv",
            type: "video/x-flv"
        }
        // {
        //     id: 4,
        //     name: "video/3gpp",
        //     type: "video/3gpp"
        // },
        // {
        //     id: 5,
        //     name: "video/MP2T",
        //     type: "video/MP2T"
        // }
    ],

    iconTypeList: [
        {
            id: 1,
            name: "Custom Icon",
            code: "custom-icon",
            fontFamily: "BTF-Icon-Fonts",
            prefix: "none"
        },
        {
            id: 2,
            name: "FA Solid Icon",
            code: "fa-solid-icon",
            fontFamily: "FontAwesomeSolid",
            prefix: "fas"
        },
        {
            id: 3,
            name: "FA Regular Icon",
            code: "fa-regular-icon",
            fontFamily: "FontAwesomeRegular",
            prefix: "far"
        },
        {
            id: 4,
            name: "FA Brand Icon",
            code: "fa-brand-icon",
            fontFamily: "FontAwesomeBrands",
            prefix: "fab"
        }
    ],
    icons: {
        evaIcons: [],

        ionicons: [
            'ionic', 'arrow-right-b', 'arrow-down-b', 'arrow-left-b', 'arrow-up-c', 'arrow-right-c',
            'arrow-down-c', 'arrow-left-c', 'arrow-return-right', 'arrow-return-left', 'arrow-swap',
            'arrow-shrink', 'arrow-expand', 'arrow-move', 'arrow-resize', 'chevron-up',
            'chevron-right', 'chevron-down', 'chevron-left', 'navicon-round', 'navicon',
            'drag', 'log-in', 'log-out', 'checkmark-round', 'checkmark', 'checkmark-circled',
            'close-round', 'plus-round', 'minus-round', 'information', 'help',
            'backspace-outline', 'help-buoy', 'asterisk', 'alert', 'alert-circled',
            'refresh', 'loop', 'shuffle', 'home', 'search', 'flag', 'star',
            'heart', 'heart-broken', 'gear-a', 'gear-b', 'toggle-filled', 'toggle',
            'settings', 'wrench', 'hammer', 'edit', 'trash-a', 'trash-b',
            'document', 'document-text', 'clipboard', 'scissors', 'funnel',
            'bookmark', 'email', 'email-unread', 'folder', 'filing', 'archive',
            'reply', 'reply-all', 'forward',
        ],

        fontAwesome: [
            'adjust', 'anchor', 'archive', 'chart-area', 'arrows-alt', 'arrows-alt-h',
            'arrows-alt-v', 'asterisk', 'at', 'car', 'ban', 'university',
            'chart-bar', 'barcode', 'bars', 'bed', 'beer',
            'bell', 'bell-slash', 'bicycle', 'binoculars',
            'birthday-cake', 'bolt', 'bomb', 'book', 'bookmark',
            'briefcase', 'bug', 'building', 'bullhorn',
        ],

        fontAwesomeRegular: ['chart-bar', 'bell', 'bell-slash', 'bookmark', 'building'],
    }
    ,
    auditRequirementDetails: {
        min: 1,
        max: 50
    },
    docmentSources: {
        draftObervationWoringPaper: "draftObervation/workingPaper",
    },
    prefix: {
        caseNumber: "CN-",
        riskAssessmentNumber: "RAN-",
        kriAssessmentNumber: "KAN-",
        controlAssessmentNumber: "CAN-",
        gapAssessmentNumber: "GAN-",
        incidentNumber: "IN-",
        incidentClassificationNumber: "ICN-",
        incidentPocNumber: "ININIO-",
        incidentFinancialDetailNumber: "IFDN-",
        incidentRecoveryNumber: "IRecN-",
        incidentRiskNumber: "IRN-",
        circulationNumber: "CirN-",
        // criteriaNumber: "Crt-",
        criteriaNumber: "",
        procedureNumber: "Pd-",
    },
    optionList: [
        {
            id: 1,
            name: "No",
            value: false,
            boolValue: 1
        },
        {
            id: 2,
            name: "Yes",
            value: true,
            boolValue: 0
        }
    ],
    optionList1: [
        {
            id: 1,
            name: "High",
            value: "High"
        },
        {
            id: 2,
            name: "Medium",
            value: "Medium"
        },
        {
            id: 3,
            name: "Low",
            value: "Low"
        }
    ],
    riskAssessmentParts: [
        {
            id: 1,
            key: "A",
            priority: 1,
            weightage: 40
        },
        {
            id: 2,
            key: "B",
            priority: 2,
            weightage: 60
        }
    ],
    auditReportType: [
        {
            id: 1,
            name: "Audit Universe Report",
            url: "audit-universe",
            key: "audit-universe"
        },
        {
            id: 2,
            name: "Audit Reoccurring Report",
            url: "reoccurring",
            key: "audit-reoccurring"
        },
        {
            id: 3,
            name: "Audit Timeline Breached Report",
            url: "audit-timeline-breached",
            key: "audit-timeline-breached"
        },
        {
            id: 4,
            name: "Audit Surprise Report",
            url: "surprise",
            key: "audit-surprise"
        },
        {
            id: 5,
            name: "Previous Audit Report",
            url: "previous-audit",
            key: "previous-audit"
        },
        {
            id: 6,
            name: "Audit Action Plan Report",
            url: "action-plan-report",
            key: "action-plan-report"
        },
        {
            id: 7,
            name: "Audit Open Observation Report",
            url: "open-observations-report",
            key: "open-observations-report"
        },
    ],
    auditAgeingTier: [
        {
            id: 1,
            name: "Within 30",
            key: "within_30",
            // color: "green"
            // color: "#85d885"
            color: "rgb(112 173 71)"
        },
        {
            id: 2,
            name: "Above 30",
            key: "above_30",
            // color: "yellow"
            color: "rgb(254 199 44)"
        },
        {
            id: 3,
            name: "Above 60",
            key: "above_60",
            // color: "blue"
            color: "rgb(105 161 220)"
        },
        {
            id: 4,
            name: "Above 90",
            key: "above_90",
            // color: "orange"
            color: "rgb(237 125 49)"
        }
    ],
    monthNames: [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ],
    heatMapValue: [
        {
            id: 1,
            min: 0,
            max: 100000,
            name: "0 - 100000",
            color: "#5af802"
        },
        {
            id: 2,
            min: 100000,
            max: 500000,
            name: "100001 - 500000",
            color: "#ffff00"
        },
        {
            id: 3,
            min: 500000,
            max: 1000000,
            name: "500001 - 1000000",
            color: "#ffc000"
        },
        {
            id: 4,
            min: 1000000,
            max: 3000000,
            name: "1000001 - 3000000",
            color: "#d22700e3"
        },
        {
            id: 5,
            min: 3000000,
            max: "onword",
            name: "3000001 - onword",
            color: "#d20000"
        },
    ],
    byPassRoles: ["super_admin"],

};
