import '@testing-library/jest-dom/extend-expect';

const researcher_01 = {
        _id: '000000000000000000000001',
        firstName: "Ewan",
        lastName: "Tempero",
        email: "e.tempero@auckland.ac.nz",
        username: 'ewan',
        password: '$2b$10$CWFxz97D4u2rnjWRSYWDtuKzWwh4vgecDSCoTtytLmilYochCfbSW',
        studyList: [
            "000000000000000000000011",
            "000000000000000000000012"
        ]
}

const researcher_02 = {
    _id: '000000000000000000000002',
    firstName: "David",
    lastName: "Smith",
    email: "davisdsd@example.com",
    username: 'david0021',
    password: '$2b$10$CWFxz97D4u2rnjWRSYWDtuKzWwh4vgecDSCoTtytLmilYochCfbSW',
    studyList: [
        "000000000000000000000011",
        "000000000000000000000012"
    ]
}


const studyList = [
    {
        _id: "000000000000000000000011",
        studyCode: "Study001",
        studyName: "A study about Ice Cream",
        description: "We love ice cream",
        creator: "000000000000000000000001",
        researcherList: [          
            "000000000000000000000001",
            "000000000000000000000002"
        ],
        studyType: "interview",
        participantNum: 50,
        recruitmentStartDate: "2022-11-11T00:00:00.000Z",
        recruitmentCloseDate: "2023-09-11T00:00:00.000Z",
        location: [
          "Room101"
        ],
        isClosed: false,
        surveyLink: "https://example.com/survey001",
        driveLink: "https://drive.google.com/drive/folders/1234567890",
        isAnonymous: false,
        anonymousParticipantNum: ''
    },
    {
        _id: "000000000000000000000012",
        studyCode: "Study002",
        studyName: "Effect of Exercise on Sleep Quality",
        description: "This study aims to investigate the impact of regular exercise on sleep quality.",
        creator: "000000000000000000000002",
        researcherList: [          
            "000000000000000000000001",
            "000000000000000000000002"
        ],
        studyType: "interview",
        participantNum: 100,
        recruitmentStartDate: "2022-10-11T00:00:00.000Z",
        recruitmentCloseDate: "2023-11-11T00:00:00.000Z",
        location: [
          "Room102"
        ],
        isClosed: false,
        surveyLink: "",
        driveLink: "",
        isAnonymous: true,
        anonymousParticipantNum: 50
    }
]

const studyResearcherContext_study01 = {
    studyInfo: {
        _id: "000000000000000000000011",
        studyCode: "Study001",
        studyName: "A study about Ice Cream",
        description: "We love ice cream",
        creator: "000000000000000000000001",
        researcherList: [          
            "000000000000000000000001",
            "000000000000000000000002"
        ],
        studyType: "interview",
        participantNum: 800,
        recruitmentStartDate: "2022-11-11T00:00:00.000Z",
        recruitmentCloseDate: "2023-09-11T00:00:00.000Z",
        location: [
          "Room101"
        ],
        isClosed: false,
        surveyLink: "https://example.com/survey001",
        driveLink: "https://drive.google.com/drive/folders/1234567890",
        isAnonymous: false,
        anonymousParticipantNum: ''
      }
  }

const studyResearcherContext_study02 = {
    studyInfo: {
        _id: "000000000000000000000012",
        studyCode: "Study002",
        studyName: "Effect of Exercise on Sleep Quality",
        description: "This study aims to investigate the impact of regular exercise on sleep quality.",
        creator: "000000000000000000000002",
        researcherList: [          
            "000000000000000000000001",
            "000000000000000000000002"
        ],
        studyType: "interview",
        participantNum: 100,
        recruitmentStartDate: "2022-10-11T00:00:00.000Z",
        recruitmentCloseDate: "2023-11-11T00:00:00.000Z",
        location: [
          "Room102"
        ],
        isClosed: false,
        surveyLink: "",
        driveLink: "",
        isAnonymous: true,
        anonymousParticipantNum: 50
    }
}

const sessionContext = {
    sessions: [
      {
        _id: "000000000000000000000021",
        studyId: "000000000000000000000011",
        sessionCode: "SE1568",
        date: "2023-10-19",
        time: "14:00",
        note: "Take some notes",
        location: "Room 152",
        participantNum: 20,
        participantList: [
            {
                _id: "000000000000000000000031",
                firstName: "David",
                lastName: "Anderson",
                email: "david_anderson@sample.org",
                phoneNum: "",
                tag: [
                    "000000000000000000000041"
                ],
                isWillContact: false,
            }             
        ],
        isArchive: false
    },
    {
        _id: "000000000000000000000022",
        studyId: "000000000000000000000011",
        sessionCode: "SE8758",
        date: "2023-10-28",
        time: "14:00",
        location: "Room 162",
        note: "",
        participantNum: 20,
        participantList: [
            {
              _id: "000000000000000000000031",
              firstName: "David",
              lastName: "Anderson",
              email: "david_anderson@sample.org",
              phoneNum: "+00 379 158 265",
              tag: [
                  "000000000000000000000041"
              ],
              isWillContact: false,
          },
          {
              _id: "000000000000000000000032",
              firstName: "William",
              lastName: "Williams",
              email: "william_williams@mailbox.org",
              phoneNum: "",
              tag: [
                  "000000000000000000000041",
                  "000000000000000000000042"
              ],
              isWillContact: false,
          }
        ],
        isArchive: false
    },
    {
        _id: "000000000000000000000023",
        studyId: "000000000000000000000011",
        sessionCode: "SE2023",
        date: "2023-10-30",
        time: "14:00",
        location: "Room 102",
        participantNum: 20,
        participantList: [
            {
                _id: "000000000000000000000031",
                firstName: "David",
                lastName: "Anderson",
                email: "david_anderson@sample.org",
                phoneNum: "",
                tag: [
                    "000000000000000000000041"
                ],
                isWillContact: false,
            }             
        ],
        isArchive: true,
        note: ""
    },
    ]
  };

  let mockStudyParticipants = [
    {
    _id: "000000000000000000000051",
    studyId: '000000000000000000000011',
    serialNum: 1,
    isActive: true,
    isComplete: false,
    isGift: true,
    isSentGift: false,
    isWIllReceiveReport: false,
    isSentReport: false,
    note: "",
    participantInfo: {
        _id: "000000000000000000000031",
        firstName: "David",
        lastName: "Anderson",
        email: "david_anderson@sample.org",
        phoneNum: "+00 379 158 265",
        isWillContact: true,
        tag: [
            "000000000000000000000041"
        ],
        tagsInfo: [
            "Student"
        ]
    }
},
{
    _id: "000000000000000000000052",
    studyId: '000000000000000000000011',
    serialNum: 2,
    isActive: true,
    isComplete: false,
    isGift: true,
    isSentGift: false,
    isWIllReceiveReport: false,
    isSentReport: false,
    note: "",
    participantInfo: {
        _id: "000000000000000000000032",
        firstName: "William",
        lastName: "Williams",
        email: "william_williams@mailbox.org",
        phoneNum: "",
        isWillContact: false,
        tag: [
            "000000000000000000000041",
            "000000000000000000000042"
        ],
        tagsInfo: [
          "Student",
          "Tag2",
        ]
    }
},
{
  _id: "000000000000000000000053",
  studyId: '000000000000000000000011',
  serialNum: 3,
  isActive: true,
  isComplete: false,
  isGift: true,
  isSentGift: false,
  isWIllReceiveReport: false,
  isSentReport: false,
  note: "",
  participantInfo: {
      _id: "000000000000000000000033",
      firstName: "James",
      lastName: "Liu",
      email: "jameliu@mailbox.org",
      phoneNum: "",
      isWillContact: false,
      tag: [
          "000000000000000000000041"
      ],
      tagsInfo: [
        "Student"
      ]
  }
  }
]

const mockToggleStudyParticipantsProperty = async (updateData) => {
    if (updateData.propertyName === 'isActive') {
        mockStudyParticipants = mockStudyParticipants.filter(participant => !updateData.ids.includes(participant._id));
    } else {
        mockStudyParticipants = mockStudyParticipants.map(participant => 
            updateData.ids.includes(participant._id) 
                ? { ...participant, [updateData.propertyName]: !participant[updateData.propertyName] } 
                : participant
        );
    }
};

  const studyParticipantContext = {
    studyParticipants: mockStudyParticipants,
    tags: [
        {
            _id: "000000000000000000000041",
            tagName: "Student"
        },
        {
            _id: "000000000000000000000042",
            tagName: "Tag2"
        }
    ],
    selectedRows: ['000000000000000000000052'],
    isAnonymous: false,
    loading: false,
    setSelectedRows: null,
    setIsAnonymous: null,
    updateSentStatus: jest.fn(),
    toggleStudyParticipantsProperty: jest.fn()
  }

  const mockDataGridContext = {
    selectRowsByEmails: false,
    inputEmails: '',
    sortModel: [],
    filterModel: { items: [] },
    pageModel: {
        page: 0,
        pageSize: 100
    },
    columnVisibility: {
        note: false,
        delete: false
    }
}

export {
    researcher_01,
    researcher_02,
    studyList,
    studyResearcherContext_study01,
    studyResearcherContext_study02,
    sessionContext,
    studyParticipantContext,
    mockDataGridContext
}