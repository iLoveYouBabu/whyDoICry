/* Fictional game adaptation. All characters are unnamed. */
(() => {
  'use strict';
  const STORY_VERSION = 5;
  const START_NODE = 'prologue';
  const FLAG_RULES = {
  "inspected": [
    "cups",
    "weather"
  ],
  "approach": [
    "lake",
    "village"
  ],
  "honest": [
    true,
    false
  ],
  "research": [
    true,
    false
  ],
  "contact": [
    true,
    false
  ],
  "recorded": [
    true,
    false
  ],
  "future": [
    true,
    false
  ],
  "rendezvous": [
    "lake",
    "cabin",
    "unspecified"
  ],
  "free": [
    true,
    false
  ],
  "departure": [
    "call",
    "message",
    "stay"
  ],
  "winterTruth": [
    true,
    false
  ],
  "prepared": [
    true,
    false
  ],
  "route": [
    "a",
    "b"
  ],
  "bTaste": [
    "ask",
    "remember"
  ],
  "bConfessed": [
    true,
    false
  ],
  "bCommitted": [
    true,
    false
  ],
  "bPromise": [
    true,
    false
  ],
  "bParting": [
    true,
    false
  ]
};
  const SCENES = {
  "prologue": {
    "chapter": "01",
    "title": "빌려 온 휴가",
    "place": "출발 전날 · 카페",
    "date": "2026. 09. 28",
    "art": "b-friends",
    "lines": [
      {
        "text": "친구는 내가 자주 고르는 자리에 먼저 앉아 있었다. 내 앞에도 커피가 한 잔 놓여 있었다."
      },
      {
        "speaker": "친구",
        "text": "이번에는 정말 쉬다 와. 산장 비워 뒀으니까."
      },
      {
        "text": "우리는 작년에 알게 되었다. 알게 된 지 얼마 안 됐는데도, 오래 본 사람 같은 순간이 있었다."
      },
      {
        "speaker": "나",
        "text": "세 달 전에 샀다면서. 너부터 더 자주 가야 하는 거 아니야?"
      },
      {
        "speaker": "친구",
        "text": "나는 다녀왔어. 이제 네 차례지."
      },
      {
        "text": "친구가 작은 열쇠를 밀어 주었다. 손을 떼기까지 잠깐 시간이 걸렸다."
      },
      {
        "speaker": "친구",
        "text": "산장 옆 터널로 가면 호수가 나와. 도착하면 연락하고."
      },
      {
        "speaker": "나",
        "text": "돌아오면 커피 살게."
      },
      {
        "text": "그 말에 친구가 웃었다. 고개를 숙인 뒤에야, 나도 따라 웃었다.",
        "memory": "friend_key"
      }
    ],
    "next": "arrival"
  },
  "arrival": {
    "chapter": "01",
    "title": "낯선 인사",
    "place": "공항 · 도착장",
    "date": "2026. 09. 29",
    "art": "airport",
    "lines": [
      {
        "text": "늦은 휴가였다.\n여름이 다 지난 뒤에야 며칠을 비웠다."
      },
      {
        "text": "도착장 문이 열렸다. 캐리어 바퀴가 바닥의 이음새를 넘을 때마다 짧은 소리가 났다."
      },
      {
        "text": "마중 나온 사람들 사이에 여자가 서 있었다.\n나를 보더니, 그대로 울기 시작했다.",
        "art": "airport-her"
      },
      {
        "text": "누군가 내 뒤에 있는 줄 알았다. 돌아보았지만 모르는 사람들뿐이었다."
      },
      {
        "speaker": "나",
        "text": "혹시 저를 아세요?"
      },
      {
        "speaker": "그녀",
        "text": "아직이요."
      },
      {
        "text": "울면서 웃는 얼굴이었다. 내가 듣기에는 너무 오래 걸릴 대답 같아서, 더 묻지 못했다.",
        "memory": "airport"
      },
      {
        "speaker": "그녀",
        "text": "휴가 오셨어요?"
      },
      {
        "speaker": "나",
        "text": "네. 친구 산장에 며칠 있으려고요."
      },
      {
        "text": "그녀는 이미 알고 있는 말을 다시 확인하는 사람처럼 고개를 끄덕였다. 그리고 길을 비켜 주었다."
      },
      {
        "speaker": "그녀",
        "text": "잘 다녀와요."
      },
      {
        "text": "도착장에서 듣기에는 조금 이상한 인사였다. 나는 한 번 뒤를 돌아보았다."
      }
    ],
    "next": "cabin"
  },
  "cabin": {
    "chapter": "01",
    "title": "남아 있는 것",
    "place": "산 중턱 · 산장",
    "date": "2026. 09. 29",
    "art": "cabin",
    "lines": [
      {
        "text": "친구가 세 달 전에 샀다는 산장이었다. 며칠 묵는 대신, 오래 닫아 둔 창문을 열어 주기로 했다.",
        "memory": "key"
      },
      {
        "text": "나무 냄새가 났다. 식탁에는 컵 두 개가 나란히 놓여 있었다. 혼자 쓰기에는 의자가 하나 남았다."
      },
      {
        "text": "짐을 풀다가 창밖을 보았다. 숲 뒤로 오래된 터널이 보였다. 그 너머가 호수라고 했다."
      }
    ],
    "prompt": "밤이 오기 전, 무엇을 살펴볼까.",
    "choices": [
      {
        "id": "cups",
        "text": "식탁의 컵과 남겨진 흔적을 본다.",
        "next": "cups",
        "set": {
          "inspected": "cups"
        }
      },
      {
        "id": "weather",
        "text": "날씨와 호수로 가는 길을 확인한다.",
        "next": "weather",
        "set": {
          "inspected": "weather"
        }
      }
    ]
  },
  "cups": {
    "chapter": "01",
    "title": "두 사람의 자리",
    "place": "산장 · 식탁",
    "date": "2026. 09. 29",
    "art": "cabin",
    "lines": [
      {
        "text": "컵 하나의 손잡이에 작은 흠집이 있었다. 다른 하나는 닳은 자리가 달랐다. 오래 함께 쓰던 물건 같았다."
      },
      {
        "text": "의자를 당겼다가 다시 밀어 넣었다. 전 주인이 돌아오면, 자기 자리부터 알아볼 것 같았다."
      }
    ],
    "next": "first_storm"
  },
  "weather": {
    "chapter": "01",
    "title": "예보에 없는 비",
    "place": "산장 · 창가",
    "date": "2026. 09. 29",
    "art": "cabin",
    "lines": [
      {
        "text": "예보에는 밤새 맑음이라고 되어 있었다. 지도를 확대해 터널과 호수, 마을로 내려가는 길을 확인했다."
      },
      {
        "text": "길은 단순했다. 터널을 건너면 호수. 돌아오면 산장. 길을 잃을 일은 없어 보였다."
      }
    ],
    "next": "first_storm"
  },
  "first_storm": {
    "chapter": "02",
    "title": "건너편",
    "place": "호수로 가는 터널",
    "date": "2026. 09. 29 · 23:47",
    "art": "tunnel-night",
    "lines": [
      {
        "text": "밤 열한 시를 넘기자 비가 쏟아졌다. 창밖에서 무언가 떨어지는 소리가 나, 뒤편을 살피러 나갔다."
      },
      {
        "text": "비를 피하려 터널 안으로 들어섰다. 반대편에 희미한 빛이 있었다. 발소리가 앞뒤로 한 번씩 돌아왔다."
      },
      {
        "text": "분명 끝까지 걸었는데.\n출구 너머에는 방금 떠나온 숲이 있었다."
      },
      {
        "text": "다시 걸어도 숲이었다. 휴대폰에는 신호가 없었다. 젖은 채 산장으로 돌아왔다."
      },
      {
        "text": "열어 둔 창문이 닫혀 있었다. 컵은 하나였고, 의자에는 처음 보는 가디건이 놓여 있었다."
      },
      {
        "text": "다음 날 아침, 신호가 돌아왔다.\n2023년 9월 30일.\n전원을 껐다 켜도 날짜는 바뀌지 않았다.",
        "memory": "date",
        "place": "산장",
        "date": "2023. 09. 30",
        "art": "cabin"
      }
    ],
    "mood": "storm",
    "next": "first_path"
  },
  "first_path": {
    "chapter": "02",
    "title": "세 해 전의 아침",
    "place": "산장 앞 · 갈림길",
    "date": "2023. 09. 30",
    "art": "crossroads",
    "lines": [
      {
        "text": "비는 그쳤다. 터널 쪽에서 고양이 우는 소리가 들렸다. 반대편 길은 버스가 다니는 마을로 이어졌다."
      },
      {
        "text": "공항에서 보았던 얼굴이 자꾸 떠올랐다.\n아직이라는 말의 앞에는 무엇이 있었을까."
      }
    ],
    "prompt": "어느 길로 갈까.",
    "choices": [
      {
        "id": "first-lake",
        "text": "터널 너머 호수로 간다.",
        "next": "meeting",
        "set": {
          "approach": "lake"
        }
      },
      {
        "id": "first-village",
        "text": "마을로 내려가 날짜부터 확인한다.",
        "next": "village",
        "set": {
          "approach": "village"
        }
      }
    ]
  },
  "village": {
    "chapter": "02",
    "title": "돌아갈 수 있는 길",
    "place": "마을 · 정류장",
    "date": "2023. 09. 30",
    "art": "bus-stop",
    "lines": [
      {
        "text": "가게의 달력도, 버스 안내판도 같은 해를 가리켰다. 휴대폰만 고장 난 것이 아니었다."
      },
      {
        "text": "버스가 들어왔다. 올라타면 이 산을 떠날 수 있었다. 돌아갈 방법을 찾는 일도 그만둘 수 있을 것 같았다."
      },
      {
        "text": "그때 공항에서 받았던 눈빛이 떠올랐다. 누군가 기다리고 있다는 감각이, 이상할 만큼 선명했다."
      }
    ],
    "prompt": "아직 산장으로 돌아갈 수 있다.",
    "choices": [
      {
        "id": "village-return",
        "text": "산장으로 돌아가 주인을 기다린다.",
        "next": "meeting_home",
        "set": {}
      },
      {
        "id": "village-leave",
        "text": "버스를 타고 이곳을 완전히 떠난다.",
        "next": "leave_warning",
        "set": {}
      }
    ]
  },
  "leave_warning": {
    "chapter": "02",
    "title": "사라지는 출발점",
    "place": "마을 밖 · 버스",
    "date": "2023. 09. 30",
    "art": "bus-inside",
    "lines": [
      {
        "text": "표에 찍힌 도착지 글자가 사라졌다. 창밖의 산이 같은 위치에서 움직이지 않았다."
      },
      {
        "text": "공항에서 찍은 사진을 열었다. 도착장 문이 하얗게 비어 있었다. 무언가 이미 있었던 일을 지우고 있었다."
      },
      {
        "text": "처음으로 알 것 같았다.\n그녀를 만나지 않으면, 나를 기다리던 그녀도 있을 수 없다."
      }
    ],
    "mood": "fracture",
    "prompt": "문이 닫히기 전, 마지막으로 결정한다.",
    "choices": [
      {
        "id": "bus-back",
        "text": "버스에서 내려 산장으로 돌아간다.",
        "next": "meeting_home",
        "set": {}
      },
      {
        "id": "bus-final",
        "text": "돌아가지 않는다. 이 만남을 포기한다.",
        "next": "collapse_meeting",
        "set": {}
      }
    ]
  },
  "meeting_home": {
    "chapter": "03",
    "title": "다른 길의 첫 만남",
    "place": "산장 · 현관",
    "date": "2023. 09. 30",
    "art": "cabin-winter",
    "lines": [
      {
        "text": "산장 앞에서 여자를 만났다. 한 손에는 고양이 밥그릇, 다른 손에는 열쇠가 있었다."
      },
      {
        "speaker": "그녀",
        "text": "어젯밤 여기서 주무셨어요? 이 집 주인인데요."
      },
      {
        "text": "공항의 여자였다. 나는 대답 대신 얼굴만 바라보았다. 그녀는 잠깐 난처하게 웃었다."
      },
      {
        "speaker": "그녀",
        "text": "밥그릇 놓으러 가는 길이에요. 무슨 사정인지, 걸으면서 말해 줄래요?"
      }
    ],
    "next": "meeting"
  },
  "meeting": {
    "chapter": "03",
    "title": "아직 모르는 사람",
    "place": "터널 너머 · 호수",
    "date": "2023. 09. 30",
    "art": "lake-meeting",
    "lines": [
      {
        "flag": "approach",
        "equals": "village",
        "yes": "나란히 호숫가에 도착했다. 여자가 고양이 옆에 쪼그려 앉았다. 공항에서와 달리, 울고 있지 않았다.",
        "no": "호숫가에 여자가 쪼그려 앉아 고양이에게 밥을 주고 있었다. 공항에서와 달리, 울고 있지 않았다."
      },
      {
        "speaker": "나",
        "text": "저 아세요?"
      },
      {
        "speaker": "그녀",
        "text": "……알아야 해요?"
      },
      {
        "text": "너무 멀쩡한 대답이라 할 말을 잃었다. 공항 이야기를 하자, 어제는 하루 종일 마을에 있었다고 했다."
      },
      {
        "speaker": "그녀",
        "text": "어제 제 생일이었거든요. 집에서 케이크 먹었어요. 혼자."
      },
      {
        "text": "9월 29일. 내가 이곳에 도착한 날이었다.\n그녀는 내 얼굴이 안 좋다며 무슨 일이냐고 물었다.",
        "memory": "birthday"
      }
    ],
    "prompt": "어디서부터 말해야 할까.",
    "choices": [
      {
        "id": "truth",
        "text": "2026년에서 왔다고 말한다.",
        "next": "honest",
        "set": {
          "honest": true
        }
      },
      {
        "id": "reserved",
        "text": "돌아갈 길을 잃었다고만 말한다.",
        "next": "reserved",
        "set": {
          "honest": false
        }
      }
    ]
  },
  "honest": {
    "chapter": "03",
    "title": "믿기 어려운 이야기",
    "place": "호숫가",
    "date": "2023. 09. 30",
    "art": "lake-meeting",
    "lines": [
      {
        "speaker": "나",
        "text": "저, 2026년에서 왔어요."
      },
      {
        "text": "입 밖으로 꺼내니 더욱 말이 안 됐다. 그녀는 웃지 않고 사진의 날짜를 한참 넘겨 보았다."
      },
      {
        "speaker": "그녀",
        "text": "믿는지는 아직 모르겠어요. 갈 데가 없는 건 맞죠?"
      },
      {
        "text": "그녀는 당분간 빈방을 쓰라고 했다. 대신 다음부터는 문을 두드려 달라고 했다. 처음으로 조금 웃을 수 있었다."
      }
    ],
    "next": "autumn"
  },
  "reserved": {
    "chapter": "03",
    "title": "말할 수 있는 만큼",
    "place": "호숫가",
    "date": "2023. 09. 30",
    "art": "lake-meeting",
    "lines": [
      {
        "speaker": "나",
        "text": "어쩌다 보니, 돌아갈 수가 없게 됐어요."
      },
      {
        "speaker": "그녀",
        "text": "사정은 나중에 들어도 돼요. 일단 밥은 먹었어요?"
      },
      {
        "text": "함께 산장으로 돌아왔다. 식탁에 컵이 하나 더 놓였다. 나는 언젠가 사실대로 말하기로 했다."
      }
    ],
    "next": "autumn"
  },
  "autumn": {
    "chapter": "03",
    "title": "돌아갈 길과 살아갈 날",
    "place": "산장 · 가을",
    "date": "2023. 11. 04",
    "art": "cabin",
    "lines": [
      {
        "text": "터널을 셀 수 없이 오갔다. 비가 오는 날에도, 밤 열한 시에도. 숲을 지나면 매번 호수가 나왔다."
      },
      {
        "flag": "honest",
        "yes": "그녀는 가끔 함께 걸어 주었다. 아무 일도 일어나지 않으면, 돌아오는 길에 장을 보았다.",
        "no": "그녀는 내가 왜 터널을 오가는지 물었다. 돌아갈 길을 찾는다는 말만 되풀이했다. 아직 꺼내지 못한 이야기가 남아 있었다."
      },
      {
        "speaker": "그녀",
        "text": "오늘은 쉬어도 되잖아요. 돌아가는 방법 말고, 여기 있는 방법도 조금은 알아야죠."
      }
    ],
    "prompt": "오늘 하루를 어떻게 보낼까.",
    "choices": [
      {
        "id": "research",
        "text": "함께 그날의 비와 터널을 조사한다.",
        "next": "research",
        "set": {
          "research": true
        }
      },
      {
        "id": "ordinary",
        "text": "오늘은 마을에 장을 보러 간다.",
        "next": "ordinary",
        "set": {
          "research": false
        }
      }
    ]
  },
  "research": {
    "chapter": "03",
    "title": "한 시간의 틈",
    "place": "터널 앞",
    "date": "2023. 11. 04",
    "art": "lake-empty",
    "lines": [
      {
        "text": "날짜와 시간을 나란히 적었다. 9월 29일. 열한 시를 넘긴 밤. 예보에 없던 폭풍우. 그날만 출구가 달랐다.",
        "memory": "tunnel"
      },
      {
        "speaker": "그녀",
        "text": "또 그런 비가 와야 하는 걸까?"
      },
      {
        "speaker": "나",
        "text": "모르겠어. 오지 않았으면 좋겠다는 생각도 해."
      },
      {
        "text": "그녀는 대답 대신 내 손에서 젖은 수첩을 받아 들었다. 돌아오는 길은 나란히 걸었다."
      }
    ],
    "next": "friend_meeting"
  },
  "ordinary": {
    "chapter": "03",
    "title": "저녁의 목록",
    "place": "산장 · 부엌",
    "date": "2023. 11. 04",
    "art": "cabin",
    "lines": [
      {
        "text": "고양이 밥, 우유, 장갑 한 켤레. 그녀가 적은 장보기 목록에는 오늘 저녁의 내가 자연스럽게 들어 있었다.",
        "memory": "ordinary"
      },
      {
        "text": "돌아가는 길에 내일 먹을 빵도 샀다. 그 작은 일이 무섭고 좋았다."
      }
    ],
    "next": "friend_meeting"
  },
  "winter": {
    "chapter": "04",
    "title": "손을 놓지 않는 법",
    "place": "산장 · 첫 번째 겨울",
    "date": "2023. 12. 17",
    "art": "cabin-winter",
    "lines": [
      {
        "text": "젖은 장작은 잘 타지 않는다는 것. 저녁 여섯 시면 가게 문이 닫힌다는 것. 그녀가 오기 전에 물을 끓이는 일."
      },
      {
        "text": "돌아가는 방법을 찾는 동안, 여기서 사는 방법부터 배웠다."
      },
      {
        "text": "벽난로 앞에서 밤을 새운 날, 그녀가 내 어깨에 기대 잠들었다. 장작이 툭 내려앉았다."
      },
      {
        "speaker": "그녀",
        "text": "우리 이제 말 놓을까."
      },
      {
        "text": "아침에는 계단에 얼음이 얼었다. 미끄러지는 그녀의 손을 붙잡았다. 계단을 다 내려온 뒤에도 놓지 않았다."
      },
      {
        "speaker": "그녀",
        "text": "돌아갈 길을 찾으면, 떠나기 전에 말해 줄 거지?"
      }
    ],
    "prompt": "붙잡은 손이 조금 차가웠다.",
    "choices": [
      {
        "id": "contact",
        "text": "혼자 결정하고 사라지지는 않을게.",
        "next": "winter_after",
        "set": {
          "contact": true
        }
      },
      {
        "id": "hesitate",
        "text": "그때 어떻게 될지, 아직은 잘 모르겠어.",
        "next": "winter_after",
        "set": {
          "contact": false
        }
      }
    ]
  },
  "winter_after": {
    "chapter": "04",
    "title": "남겨 두는 말",
    "place": "산장 · 계단",
    "date": "2023. 12. 17",
    "art": "cabin-winter",
    "lines": [
      {
        "flag": "contact",
        "yes": "그녀가 손을 한 번 더 꼭 쥐었다. “무서워도 같이 듣고 싶어. 나도 여기 있으니까.”",
        "no": "그녀는 고개를 끄덕였다. “모르겠다고 말하는 건 괜찮아. 나만 모르게 하지는 말아 줘.”"
      },
      {
        "text": "함께 살고 있어도, 저절로 알게 되는 이야기는 없었다. 그날 밤 그녀가 공항에서 처음 나를 보았다는 말의 앞뒤를 물었다."
      }
    ],
    "next": "winter_truth"
  },
  "winter_truth": {
    "chapter": "04",
    "title": "다 말하지 못한 밤",
    "place": "산장",
    "date": "2023. 12. 17",
    "art": "cabin-winter",
    "lines": [
      {
        "text": "2026년의 공항, 예보에 없던 폭풍우, 세 해 전의 아침. 내게는 하나로 이어진 일이었다."
      },
      {
        "text": "돌아갈 길을 함께 생각하려면, 그녀에게도 처음부터 들려주어야 했다."
      }
    ],
    "prompt": "그녀에게 어디까지 이야기할까.",
    "choices": [
      {
        "id": "winter-open",
        "text": "처음부터 전부 이야기하고, 질문에 답한다.",
        "next": "winter_answer",
        "set": {
          "winterTruth": true
        }
      },
      {
        "id": "winter-close",
        "text": "이미 말한 것 이상은 꺼내지 않는다.",
        "next": "winter_answer",
        "set": {
          "winterTruth": false
        }
      }
    ]
  },
  "winter_answer": {
    "chapter": "04",
    "title": "서로 아는 만큼",
    "place": "산장",
    "date": "2023. 12. 17",
    "art": "cabin-winter",
    "lines": [
      {
        "flag": "winterTruth",
        "yes": "그녀는 끝까지 들었다. 믿기 어려운 대목은 다시 물었다. 처음에 말하지 못했던 것까지, 이번에는 함께 아는 일이 되었다.",
        "no": "새로운 말은 하지 못했다. 처음부터 털어놓았던 이야기라면 남아 있겠지만, 숨긴 사정까지 그녀가 알아줄 수는 없었다."
      },
      {
        "text": "그녀가 말했다. “모르는 걸 안다고 하지는 않을게. 그러니까 너도, 내가 다 안다고 생각하지는 말아 줘.”"
      }
    ],
    "next": "spring"
  },
  "spring": {
    "chapter": "04",
    "title": "끝나지 않은 노래",
    "place": "산장 · 열린 창문",
    "date": "2024. 04. 18",
    "art": "guitar-spring",
    "lines": [
      {
        "text": "봄이 되자 호수의 고양이가 산장까지 따라왔다. 의자 하나를 차지하고 잠들었다. 우리는 바닥에 나란히 앉았다."
      },
      {
        "text": "그녀는 기타의 같은 마디를 몇 번이고 반복했다. 꼭 같은 곳에서 멈췄다."
      },
      {
        "speaker": "나",
        "text": "그다음은?"
      },
      {
        "speaker": "그녀",
        "text": "아직 못 만들었어. 끝을 먼저 알면 재미없잖아."
      },
      {
        "text": "바람에 커튼 끝이 그녀의 팔에 닿았다. 나는 휴대폰을 집어 들었다."
      }
    ],
    "prompt": "이 오후를 어떻게 남길까.",
    "choices": [
      {
        "id": "record",
        "text": "괜찮다면, 이 노래 녹음해도 돼?",
        "next": "record",
        "set": {
          "recorded": true
        }
      },
      {
        "id": "listen",
        "text": "휴대폰을 내려놓고 곁에서 듣는다.",
        "next": "listen",
        "set": {
          "recorded": false
        }
      }
    ]
  },
  "record": {
    "chapter": "04",
    "title": "열여덟 초",
    "place": "산장 · 오후",
    "date": "2024. 04. 18",
    "art": "guitar-spring",
    "lines": [
      {
        "speaker": "그녀",
        "text": "실수해도 안 지우기야."
      },
      {
        "text": "녹음 버튼을 눌렀다. 기타 소리보다 먼저 웃음이 들어갔다. 마지막 마디는 여전히 비어 있었다.",
        "memory": "song"
      },
      {
        "speaker": "나",
        "text": "나머지는 다음에 녹음하자."
      }
    ],
    "next": "summer"
  },
  "listen": {
    "chapter": "04",
    "title": "기억에만 남는 소리",
    "place": "산장 · 오후",
    "date": "2024. 04. 18",
    "art": "guitar-spring",
    "lines": [
      {
        "text": "화면을 뒤집어 놓았다. 그녀는 다시 처음부터 연주했다. 나는 틀린 음까지 전부 외우고 싶었다.",
        "memory": "listening"
      },
      {
        "speaker": "그녀",
        "text": "다음에는 끝까지 들려줄게."
      }
    ],
    "next": "summer"
  },
  "summer": {
    "chapter": "04",
    "title": "여기 있잖아",
    "place": "호숫가 · 여름비",
    "date": "2024. 08. 03",
    "art": "lake-rain",
    "lines": [
      {
        "text": "우산 하나를 나눠 썼다. 내 쪽 어깨가 자꾸 젖었다. 그녀는 우산을 가운데로 밀고 내 팔에 가까이 붙었다."
      },
      {
        "speaker": "나",
        "text": "가끔 네가 사라질까 봐 무서워."
      },
      {
        "speaker": "그녀",
        "text": "여기 있잖아."
      },
      {
        "text": "그녀가 나를 안았다. 빗소리 사이에서 공항의 울던 얼굴이 겹쳤다. 이번에는 그 기억을 혼자 가지고 있고 싶지 않았다."
      }
    ],
    "prompt": "공항에서 보았던 그녀를 이야기할까.",
    "choices": [
      {
        "id": "future",
        "text": "2026년 공항에서 네가 울고 있었어.",
        "next": "future_truth",
        "set": {
          "future": true
        }
      },
      {
        "id": "future-later",
        "text": "그날 만났다는 사실만 말한다.",
        "next": "future_reserved",
        "set": {
          "future": false
        }
      }
    ]
  },
  "future_truth": {
    "chapter": "04",
    "title": "눈물의 앞쪽",
    "place": "호숫가",
    "date": "2024. 08. 03",
    "art": "lake-rain",
    "lines": [
      {
        "speaker": "그녀",
        "text": "왜 울었대?"
      },
      {
        "speaker": "나",
        "text": "몰라. 그때의 나는 널 처음 보니까."
      },
      {
        "text": "그녀는 오래 호수를 보았다. 아직 겪지 않은 이별을 미리 건네준 것 같아서 미안했다."
      },
      {
        "speaker": "그녀",
        "text": "그 눈물이 꼭 슬퍼서였다고 정하지는 말자."
      }
    ],
    "next": "rendezvous"
  },
  "future_reserved": {
    "chapter": "04",
    "title": "말하지 못한 표정",
    "place": "호숫가",
    "date": "2024. 08. 03",
    "art": "lake-rain",
    "lines": [
      {
        "speaker": "나",
        "text": "2026년 9월 29일. 공항 도착장에서 너를 만났어. 너는 나를 알고 있는 것 같았어."
      },
      {
        "text": "눈물 이야기는 삼켰다. 그녀는 그 날짜를 한 번 더 입 안에서 굴렸다."
      },
      {
        "speaker": "그녀",
        "text": "그날의 나는, 지금보다 너를 더 오래 알고 있겠네."
      }
    ],
    "next": "rendezvous"
  },
  "rendezvous": {
    "chapter": "04",
    "title": "서로를 찾는 장소",
    "place": "호수로 이어지는 길",
    "date": "2024. 08. 03",
    "art": "lake-rain",
    "lines": [
      {
        "speaker": "그녀",
        "text": "혹시 서로를 못 찾게 되면, 어디로 가면 될까?"
      },
      {
        "text": "늦어지면 전화를 하면 된다고 말하려다가 멈췄다. 서로 다른 해에는 신호가 닿지 않았다."
      }
    ],
    "prompt": "두 사람이 기억할 장소를 정한다.",
    "choices": [
      {
        "id": "promise-lake",
        "text": "처음 만난 호수에서 만나자.",
        "next": "promise_lake",
        "set": {
          "rendezvous": "lake"
        }
      },
      {
        "id": "promise-cabin",
        "text": "산장에 불을 켜 줘. 그곳으로 갈게.",
        "next": "promise_cabin",
        "set": {
          "rendezvous": "cabin"
        }
      },
      {
        "id": "promise-later",
        "text": "지금은 정하지 말자. 돌아오면 찾을 수 있을 거야.",
        "next": "promise_unclear",
        "set": {
          "rendezvous": "unspecified"
        }
      }
    ]
  },
  "promise_lake": {
    "chapter": "04",
    "title": "늦는 대로",
    "place": "호숫가",
    "date": "2024. 08. 03",
    "art": "lake-rain",
    "lines": [
      {
        "text": "호수에서 만나. 늦어지면 늦는 대로.\n그녀는 잊지 않겠다며 우산 손잡이를 내 손 위로 꼭 쥐었다.",
        "memory": "lake"
      }
    ],
    "next": "birthday"
  },
  "promise_cabin": {
    "chapter": "04",
    "title": "켜 둔 불",
    "place": "산장으로 가는 길",
    "date": "2024. 08. 03",
    "art": "lake-rain",
    "lines": [
      {
        "text": "산장으로 와. 문 앞에서 기다릴게.\n그녀는 그다음에 둘이 같이 호수에 가자고 덧붙였다.",
        "memory": "cabin"
      }
    ],
    "next": "birthday"
  },
  "promise_unclear": {
    "chapter": "04",
    "title": "정하지 않은 자리",
    "place": "산장",
    "date": "2024. 08. 03",
    "art": "lake-rain",
    "lines": [
      {
        "text": "그녀는 호수와 산장 쪽을 번갈아 보았다."
      },
      {
        "text": "“못 찾으면 내가 다른 쪽으로 갈게. 그런데 둘 다 움직이면 또 엇갈리지 않을까.”"
      },
      {
        "text": "괜찮을 거라는 말만 했다. 어디에 남을지는 정하지 않았다."
      }
    ],
    "next": "birthday"
  },
  "birthday": {
    "chapter": "05",
    "title": "촛불 하나",
    "place": "산장 · 두 번째 생일",
    "date": "2024. 09. 29",
    "art": "birthday",
    "lines": [
      {
        "text": "일 년이 지났다. 올해는 케이크를 둘이 먹었다. 그녀가 불을 끄기 전에 내가 먼저 숨을 들이마셔, 둘 다 웃었다."
      },
      {
        "speaker": "그녀",
        "text": "작년에는 네가 올 줄 몰랐는데."
      },
      {
        "text": "창문 너머로 바람이 세졌다. 예보는 맑음이었다. 나는 포크를 내려놓았다."
      },
      {
        "speaker": "그녀",
        "text": "만약 네가 돌아가면, 나는 어떻게 하면 좋겠어?"
      }
    ],
    "prompt": "그녀의 시간에 무엇을 부탁할까.",
    "choices": [
      {
        "id": "wait-for-me",
        "text": "돌아올게. 나를 기다려 줬으면 해.",
        "next": "birthday_after",
        "set": {
          "free": false
        }
      },
      {
        "id": "your-days",
        "text": "기다려도, 떠나도 돼. 네 하루를 살아 줘.",
        "next": "birthday_after",
        "set": {
          "free": true
        }
      }
    ]
  },
  "birthday_after": {
    "chapter": "05",
    "title": "대답을 남기는 밤",
    "place": "산장 · 식탁",
    "date": "2024. 09. 29",
    "art": "birthday",
    "lines": [
      {
        "flag": "free",
        "yes": "그녀는 한참 뒤 웃었다. “기다리는 것도 내가 고르는 거면 좋겠어. 네 말 때문에 버티는 게 아니라.”",
        "no": "그녀는 촛농을 손끝으로 떼었다. “기다리고 싶어. 그렇지만 얼마나 오래인지는, 나도 아직 모르겠어.”"
      },
      {
        "flag": "free",
        "yes": "기다리겠다는 확답 대신, 서로의 내일을 돌려주었다.",
        "no": "나는 고개를 끄덕였다. 사랑한다는 말로 끝이 없는 약속을 받아 내고 싶지는 않았다.",
        "memoryIf": {
          "flag": "free",
          "equals": true,
          "id": "tomorrow"
        }
      }
    ],
    "next": "birthday_plan"
  },
  "birthday_plan": {
    "chapter": "05",
    "title": "촛불이 꺼진 뒤",
    "place": "산장",
    "date": "2024. 09. 29",
    "art": "birthday",
    "lines": [
      {
        "text": "그녀가 접시를 치우며 물었다. “만날 곳이랑, 기다릴 시간. 우리 둘이 같은 걸 알고 있는 거 맞지?”"
      },
      {
        "text": "길을 알아도 장소를 모를 수 있었다. 장소를 알아도 언제까지 기다릴지 다를 수 있었다."
      },
      {
        "text": "오늘 밤이 오기 전에, 미뤄 두었던 이야기 하나를 마저 나눌 수 있었다."
      }
    ],
    "prompt": "남은 시간에 무엇을 확인할까.",
    "choices": [
      {
        "id": "prepare-return",
        "text": "수첩을 함께 펴고 폭풍우와 자정까지의 시간을 확인한다.",
        "next": "birthday_ready",
        "set": {
          "prepared": true
        }
      },
      {
        "id": "prepare-place",
        "text": "서로 찾지 못하면 호수에서 기다리기로 확실히 정한다.",
        "next": "birthday_place",
        "set": {
          "rendezvous": "lake"
        }
      },
      {
        "id": "enjoy-birthday",
        "text": "오늘은 생일 이야기만 하자.",
        "next": "birthday_quiet",
        "set": {}
      }
    ]
  },
  "birthday_ready": {
    "chapter": "05",
    "title": "함께 펴 둔 수첩",
    "place": "산장",
    "date": "2024. 09. 29",
    "art": "birthday",
    "lines": [
      {
        "text": "9월 29일, 예보에 없던 폭풍우, 열한 시부터 자정. 그녀가 수첩 끝에 적었다. “늦어져도 자정을 넘겨 기다리기.”"
      },
      {
        "text": "정확히 어느 해로 돌아갈지는 알 수 없었다. 그래도 서로 다른 시간에 포기하지 않도록, 알고 있는 단서는 함께 남겼다."
      }
    ],
    "next": "birthday_night"
  },
  "birthday_place": {
    "chapter": "05",
    "title": "호수라는 대답",
    "place": "산장",
    "date": "2024. 09. 29",
    "art": "birthday",
    "lines": [
      {
        "text": "“호수에서 만나자. 서로 못 찾겠다고 움직이지 말고.” 그녀가 같은 말을 따라 했다. 산장을 생각하고 있었다면, 오늘의 약속으로 바꾸기로 했다.",
        "memory": "lake"
      }
    ],
    "next": "birthday_night"
  },
  "birthday_quiet": {
    "chapter": "05",
    "title": "오늘의 촛불",
    "place": "산장",
    "date": "2024. 09. 29",
    "art": "birthday",
    "lines": [
      {
        "text": "남은 케이크를 잘랐다. 함께 보낸 날을 이야기했다. 미리 나눈 준비와 약속은 남았지만, 비워 둔 대답까지 채워지지는 않았다."
      }
    ],
    "next": "birthday_night"
  },
  "birthday_night": {
    "chapter": "05",
    "title": "예보에 없는 밤",
    "place": "산장",
    "date": "2024. 09. 29",
    "art": "birthday",
    "lines": [
      {
        "text": "밤 열한 시가 되자 비가 유리창을 때렸다. 작년과 같은, 예보에 없던 폭풍우였다."
      }
    ],
    "next": "storm"
  },
  "storm": {
    "chapter": "05",
    "title": "다시 열린 길",
    "place": "산장 · 현관",
    "date": "2024. 09. 29 · 23:12",
    "art": "cabin",
    "lines": [
      {
        "text": "그녀는 잠깐 마을에 내려가 있었다. 현관 앞에서 신발 끈을 묶었다. 손이 떨려 매듭을 두 번 풀었다."
      },
      {
        "flag": "research",
        "yes": "함께 적었던 수첩을 폈다. 날짜, 폭풍우, 열한 시부터 자정 사이. 모두 같았다.",
        "no": "몇 달 동안 아무 일도 없던 터널이 유난히 가까워 보였다. 몸이 먼저 그날의 비를 알아보았다."
      },
      {
        "flag": "contact",
        "yes": "혼자 결정하고 사라지지 않겠다고 말했었다. 전화 화면 위에서 손가락이 멈췄다.",
        "no": "어떻게 될지 모르겠다는 말로 넘겨 왔다. 이제는 실제로 대답해야 하는 밤이었다."
      }
    ],
    "mood": "storm",
    "prompt": "이 밤을 어떻게 건널까.",
    "choices": [
      {
        "id": "call",
        "text": "그녀에게 전화하고 돌아오기를 기다린다.",
        "next": "call",
        "set": {
          "departure": "call"
        }
      },
      {
        "id": "message",
        "text": "메시지를 남기고 혼자 터널로 간다.",
        "next": "depart_message",
        "set": {
          "departure": "message"
        }
      },
      {
        "id": "stay",
        "text": "현관문을 닫는다. 이 시간에 남는다.",
        "next": "stay_night",
        "set": {
          "departure": "stay"
        }
      }
    ]
  },
  "call": {
    "chapter": "05",
    "title": "같이 듣는 대답",
    "place": "산장 · 현관",
    "date": "2024. 09. 29 · 23:29",
    "art": "cabin-winter",
    "lines": [
      {
        "speaker": "나",
        "text": "그날이랑 같은 비가 와. 터널에 가 봐야 할 것 같아."
      },
      {
        "text": "수화기 너머로 잠깐 아무 소리도 없었다. 이윽고 돌아갈 테니 기다려 달라는 대답이 들렸다."
      },
      {
        "text": "그녀는 젖은 채 도착했다. 나는 마른 수건을 둘러 주었다. 남은 시간이 자꾸 눈에 들어왔다."
      },
      {
        "speaker": "그녀",
        "text": "네가 떠나는 걸 내가 보는 건, 상상한 것보다 무섭네."
      },
      {
        "speaker": "나",
        "text": "나도 그래."
      },
      {
        "speaker": "그녀",
        "text": "둘 다 건너가면, 공항에서 너를 기다렸던 나는 어떻게 되는 걸까?"
      },
      {
        "text": "대답할 수 없었다. 잃고 싶지 않은 마음이, 이미 만났던 이유를 지울 수도 있었다."
      }
    ],
    "mood": "storm",
    "prompt": "그녀와 마주 보고 결정한다.",
    "choices": [
      {
        "id": "alone",
        "text": "혼자 돌아가서, 너에게 다시 올게.",
        "next": "depart_call",
        "set": {}
      },
      {
        "id": "together",
        "text": "그럼에도 손을 잡고 함께 건넌다.",
        "next": "together_tunnel",
        "set": {}
      },
      {
        "id": "stay-together",
        "text": "터널에 가지 않고 곁에 남는다.",
        "next": "stay_night",
        "set": {
          "departure": "stay"
        }
      }
    ]
  },
  "depart_message": {
    "chapter": "05",
    "title": "금방이라는 말",
    "place": "터널 앞",
    "date": "2024. 09. 29 · 23:34",
    "art": "tunnel-night",
    "lines": [
      {
        "text": "그날이랑 똑같은 비가 와.\n터널에 가봐야 할 것 같아.\n미안해. 금방 돌아올게.",
        "memory": "message"
      },
      {
        "flag": "contact",
        "yes": "보내고 나서야 약속이 떠올랐다. 혼자 사라지지 않겠다고 해 놓고, 가장 중요한 대답을 화면 뒤에 숨겼다.",
        "no": "보냈다는 표시를 확인했다. 읽었다는 표시는 끝내 뜨지 않았다."
      },
      {
        "text": "시간이 없다는 말을 핑계처럼 되뇌었다. 터널 반대편으로 걸었다. 출구 너머에 호수 대신 숲이 보였다."
      }
    ],
    "mood": "storm",
    "next": "her_waiting"
  },
  "depart_call": {
    "chapter": "05",
    "title": "떠나기 전에",
    "place": "터널 앞",
    "date": "2024. 09. 29 · 23:38",
    "art": "tunnel-night",
    "lines": [
      {
        "text": "식탁에 편지를 남겼다. 금방 돌아올 수 있다고는 쓰지 못했다. 그녀의 내일을 멈추게 하고 싶지 않다고 썼다.",
        "memory": "letter"
      },
      {
        "speaker": "그녀",
        "text": "뒤돌아보면 못 보낼 것 같아. 앞만 보고 가."
      },
      {
        "text": "나는 고개를 끄덕이고 터널 안으로 들어갔다. 발소리가 두 번 돌아왔다. 뒤돌아보지 못했다."
      }
    ],
    "mood": "storm",
    "next": "her_waiting"
  },
  "her_waiting": {
    "chapter": "06",
    "title": "두 번의 가을",
    "place": "그녀의 시간 · 산장",
    "date": "2024 — 2026",
    "art": "guitar-spring",
    "lines": [
      {
        "flag": "departure",
        "equals": "message",
        "yes": "메시지는 비가 그친 뒤에 읽었다. 산장으로 달려갔지만 케이크와 접시 두 개만 남아 있었다.",
        "no": "네가 터널로 들어간 뒤에도 한참 서 있었다. 산장으로 돌아와 편지를 다시 폈다."
      },
      {
        "flag": "contact",
        "yes": "떠나기 전에 함께 결정하자던 말을 오래 생각했다. 지켜진 부분도, 그렇지 못한 부분도 있었다.",
        "no": "모르겠다는 말이 어떤 모양인지, 비어 있는 의자를 보며 조금 알게 되었다."
      },
      {
        "text": "처음에는 매일 터널에 갔다. 호수와 숲, 숲과 호수. 날짜는 언제나 하루씩만 바뀌었다."
      },
      {
        "text": "기다리는 동안에도 장을 봤다. 고양이 밥을 주고 장작을 샀다. 네가 패 둔 것부터 먼저 떨어졌다."
      },
      {
        "text": "함께한 일 년 뒤에, 두 번의 가을을 더 보냈다. 2026년 여름에는 산장을 팔았다. 짐을 싸다 기타만 다시 꺼냈다.",
        "memory": "waiting"
      },
      {
        "flag": "free",
        "yes": "내 하루를 살라고 했던 말을 기억했다. 오늘 기다렸다고 내일도 그래야 하는 건 아니었다.",
        "no": "기다려 달라던 말을 오래 붙들었다. 그래도 기다림의 끝을 정하는 일까지 네게 맡기고 싶지는 않았다."
      },
      {
        "text": "9월 29일. 나는 공항에 도착했다. 오늘 떠나는 비행기 표도 가지고 있었다. 만나러 온 것인지 떠나러 온 것인지 아직 몰랐다."
      }
    ],
    "pov": "그녀",
    "next": "airport_before"
  },
  "airport_before": {
    "chapter": "06",
    "title": "도착과 출발 사이",
    "place": "공항 · 도착장 앞",
    "date": "2026. 09. 29 · 낮",
    "art": "airport-tears",
    "lines": [
      {
        "text": "전광판에 도착 안내가 떴다. 이 문에서 네가 걸어 나올 것이다. 나를 하나도 모르는 얼굴로."
      },
      {
        "flag": "future",
        "yes": "네가 말했던 눈물의 이유를 이제는 조금 알았다. 그래도 울지 않을 수 있을 것 같지는 않았다.",
        "no": "네가 이곳에서 나를 보았다고 했다. 그날의 내가 어떤 얼굴이었는지는 말해 주지 않았다."
      }
    ],
    "pov": "그녀",
    "next": "airport_again"
  },
  "airport_again": {
    "chapter": "06",
    "title": "아직이요",
    "place": "공항 · 도착장",
    "date": "2026. 09. 29",
    "art": "airport-tears",
    "lines": [
      {
        "text": "네가 나왔다. 하나도 변하지 않은 얼굴이었다. 나를 하나도 모르고 있는 얼굴이었다."
      },
      {
        "speaker": "그",
        "text": "혹시 저를 아세요?"
      },
      {
        "speaker": "나",
        "text": "아직이요."
      },
      {
        "text": "결국 울면서 웃었다. 네가 어디로 갈 것인지 알면서, 휴가를 왔느냐고 물었다."
      },
      {
        "speaker": "그",
        "text": "네. 친구 산장에 며칠 있으려고요."
      },
      {
        "text": "지금 붙잡으면 이별을 겪게 하지 않을 수 있을까. 하지만 네가 그 산장에 가지 않으면, 우리의 일 년은 시작되지 않는다."
      },
      {
        "text": "소매를 붙잡으려던 손을 내렸다. 네가 걸어갈 길을 비켜 주었다. 이미 함께 보낸 날들의 시작을, 내가 막을 수는 없었다."
      }
    ],
    "pov": "그녀",
    "next": "after_airport"
  },
  "after_airport": {
    "chapter": "06",
    "title": "나의 다음 장",
    "place": "공항 · 출발 안내판 아래",
    "date": "2026. 09. 29",
    "art": "airport-tears",
    "lines": [
      {
        "speaker": "나",
        "text": "잘 다녀와요."
      },
      {
        "text": "네가 출구를 지나갔다. 우리의 시작은 이제 네게로 갔다. 나는 한동안 빈 손을 내려다보았다."
      },
      {
        "flag": "free",
        "yes": "내 하루를 살라고 했던 말도 기억했다. 나는 오늘 이 기다림을 끝내기로 했다. 네가 돌아오기를 바라면서도, 내 삶을 멈춰 두지는 않기로 했다.",
        "no": "기다려 달라던 말도 기억했다. 하지만 그 말 하나가 지난 이 년을 대신해 주지는 못했다. 나는 이제 기다림의 끝을 내 손으로 정하기로 했다."
      },
      {
        "text": "처음부터 나눈 이야기와 끝내 비어 있던 대답. 오늘의 나는 우리가 함께 남긴 것들을 가지고, 다음 걸음을 옮겼다."
      }
    ],
    "pov": "그녀",
    "next": {
      "route": "outcome",
      "to": {
        "reunion": "her_return",
        "missed": "her_uncertain",
        "departure": "her_depart"
      }
    }
  },
  "her_return": {
    "chapter": "06",
    "title": "오늘의 선택",
    "place": "그녀의 시간 · 산길",
    "date": "2026. 09. 29 · 밤",
    "art": "tunnel-night",
    "lines": [
      {
        "flag": "rendezvous",
        "equals": "lake",
        "yes": "호수로 갔다. 처음 만난 곳에서 만나자고 했으니까. 오늘은 내가 원해서 기다리는 날이었다.",
        "no": "산장으로 갔다. 집은 이제 다른 사람의 것이었지만, 문 앞에서 기다리겠다는 약속은 남아 있었다."
      },
      {
        "text": "시계를 보았다. 아직 발소리는 들리지 않았다. 숨을 고르고, 조금 더 기다리기로 했다."
      },
      {
        "text": "수첩에 남은 밤의 시간을 떠올렸다. 자정이 지나도 움직이지 않기로 했다. 장소도, 기다림의 끝을 서둘러 정하지 말자는 뜻도 함께 나눈 약속이었다."
      }
    ],
    "pov": "그녀",
    "next": "returned"
  },
  "her_uncertain": {
    "chapter": "06",
    "title": "비어 있던 대답",
    "place": "산장",
    "date": "2026. 09. 29 · 밤",
    "art": "tunnel-night",
    "lines": [
      {
        "text": "공항을 나와 산으로 돌아왔다. 오늘을 끝내려고 온 것이 아니었다. 우리가 다시 만날 자리를 찾기 위해 온 것이었다."
      },
      {
        "flag": "rendezvous",
        "yes": "약속한 호수에 도착했지만 물가에는 아무도 없었다. 기다릴 시간을 함께 정하지 못한 것이 그제야 아팠다.",
        "no": "호수인지 산장인지, 우리는 끝내 정하지 않았다. 한쪽이 비어 있으면 다른 쪽으로 가면 된다고 생각했다."
      },
      {
        "text": "나는 이번에는 내가 먼저 찾기로 했다. 산장과 호수를 오가며 네 이름을 불렀다."
      },
      {
        "text": "산장 식탁에 짧은 메모를 남겼다. 오늘로 끝내려 온 게 아니야. 네가 돌아오면, 나는 아직 여기 있을게."
      },
      {
        "text": "새벽이 가까워질수록 발자국은 서로 다른 방향으로 이어졌다. 같은 밤을 건넜지만, 우리는 끝내 같은 자리에 서지 못했다."
      }
    ],
    "pov": "그녀",
    "next": "returned"
  },
  "her_depart": {
    "chapter": "06",
    "title": "잘 다녀와",
    "place": "공항 · 탑승구",
    "date": "2026. 09. 29 · 저녁",
    "art": "airport-tears",
    "lines": [
      {
        "flag": "departure",
        "yes": "마지막 대답 대신 남은 메시지를 떠올렸다. 읽었다는 표시가 생기기 전에 너는 떠났고, 함께 작별할 기회는 돌아오지 않았다.",
        "no": "끝내 듣지 못했던 처음의 사정이 남아 있었다. 공항에서 만났다는 짧은 이야기만으로, 혼자 보내야 할 시간을 이해하기는 어려웠다."
      },
      {
        "text": "탑승권을 내밀었다. 도착장에서 나누었던 인사는 사라지지 않았다. 유리창 밖에도 온전한 활주로가 있었다."
      },
      {
        "text": "처음 만날 너를 보내는 일과, 다시 돌아올 너를 기다리는 일은 같은 선택이 아니었다. 나는 이번에는 이 기다림을 여기서 끝내기로 했다."
      },
      {
        "text": "창가에 앉았다. 기타 케이스를 맡기며 손잡이를 한 번 더 쓸었다. 새 노래에는 아직 제목이 없었다."
      },
      {
        "speaker": "나",
        "text": "이번에는 나도, 잘 다녀올게."
      }
    ],
    "pov": "그녀",
    "next": "returned_departure"
  },
  "returned": {
    "chapter": "07",
    "title": "돌아온 사람",
    "place": "산장 앞 · 갈림길",
    "date": "2026. 09. 29 · 23:41",
    "art": "tunnel-night",
    "lines": [
      {
        "text": "휴대폰이 신호를 잡았다.\n2026년 9월 29일, 23시 41분.\n내게는 일 년, 이곳에는 몇 시간이 흘렀다.",
        "memory": "return"
      },
      {
        "text": "공항의 얼굴이 떠올랐다. 그녀는 내가 어디로 가는지 알았다. 그곳에 누가 기다리고 있는지도."
      },
      {
        "flag": "recorded",
        "yes": "봄의 녹음을 열었다. 기타보다 먼저 그녀의 웃음이 들렸다. 파일은 온전히 남아 있었다.",
        "no": "봄에 들었던 선율을 떠올렸다. 기록하지 않았어도, 없었던 일이 되지는 않았다."
      },
      {
        "flag": "rendezvous",
        "equals": "unspecified",
        "yes": "돌아오면 찾을 수 있을 거라고 했었다. 호수와 산장 중 어디로 오라고도 말하지 않은 채.",
        "no": "함께 정했던 장소로 발걸음을 돌렸다. 오늘 새로운 답을 고르는 대신, 그때의 약속을 따라갔다."
      }
    ],
    "next": "route_reunion"
  },
  "route_reunion": {
    "chapter": "07",
    "title": "같은 밤의 두 사람",
    "place": "산길",
    "date": "2026. 09. 29 · 23:53",
    "art": "tunnel-night",
    "lines": [
      {
        "text": "달렸다. 먼저 했던 약속을, 다른 기억이 덮어쓰지 않기를 바라면서."
      }
    ],
    "next": {
      "route": "outcome",
      "to": {
        "reunion": "reunion_place",
        "missed": "missed",
        "departure": "returned_departure"
      }
    }
  },
  "reunion_place": {
    "chapter": "07",
    "title": "약속을 따라",
    "place": "산장",
    "date": "2026. 09. 29 · 23:54",
    "art": "tunnel-night",
    "lines": [
      {
        "text": "같은 자리를 떠올리고 있었다. 함께 나눈 말들이, 이제 길이 되었다."
      }
    ],
    "next": [
      {
        "when": {
          "rendezvous": "cabin"
        },
        "to": "reunion_cabin"
      },
      {
        "to": "reunion"
      }
    ]
  },
  "reunion_cabin": {
    "chapter": "07",
    "title": "문 앞의 불빛",
    "place": "산장 · 현관",
    "date": "2026. 09. 29 · 23:56",
    "art": "cabin-winter",
    "lines": [
      {
        "text": "현관 앞에 그녀가 서 있었다. 불을 켜 줄 수 없는 집이 되어도 약속한 자리는 떠나지 않은 사람이었다."
      },
      {
        "speaker": "그녀",
        "text": "우리, 그다음에는 어디 가기로 했더라."
      },
      {
        "text": "대답 대신 손을 잡았다. 나란히 터널을 걸어 호수로 갔다."
      }
    ],
    "next": "reunion"
  },
  "reunion": {
    "chapter": "07",
    "title": "아직이요",
    "place": "터널 너머 · 호수",
    "date": "2026. 09. 29 · 자정 무렵",
    "art": "reunion-night",
    "lines": [
      {
        "flag": "rendezvous",
        "equals": "lake",
        "yes": "터널을 빠져나오자 물가에 그녀가 있었다. 공항에서 나를 기다리던 얼굴. 일 년 동안 곁에서 보던 그 얼굴이었다.",
        "no": "호숫가에 나란히 섰다. 손을 잡고 걷던 계절들과 오늘의 공항이, 마침내 한 사람으로 이어졌다."
      },
      {
        "speaker": "그녀",
        "text": "……이번에는 알아?"
      },
      {
        "text": "대답보다 숨이 먼저 터졌다. 고개를 끄덕였다. 그녀가 울기 전에, 내가 먼저 울었다."
      },
      {
        "speaker": "나",
        "text": "늦어서 미안해."
      },
      {
        "flag": "departure",
        "equals": "message",
        "yes": "그녀가 내 손을 잡았다. “금방이라는 말은 이제 함부로 하지 마.” 나는 다시 고개를 끄덕였다.",
        "no": "그녀가 내 뺨을 만졌다. “앞만 보고 가라니까, 정말 한 번도 안 돌아보더라.” 나는 그 손을 잡았다."
      },
      {
        "flag": "recorded",
        "yes": "주머니에서 짧은 기타 소리가 났다. 그녀가 울면서 웃었다. “그거, 이제 끝까지 쓸 수 있겠다.”",
        "no": "그녀가 어깨에 얼굴을 묻었다. “노래 다 만들었어. 나중에 들려줄게.”"
      },
      {
        "speaker": "나",
        "text": "공항에서 왜 울었어?"
      },
      {
        "speaker": "그녀",
        "text": "지금 너랑, 비슷한 이유였을걸."
      },
      {
        "text": "자정이 지났다.\n우리는 같은 날짜에 서 있었다."
      }
    ],
    "mood": "night",
    "ending": "reunion"
  },
  "returned_departure": {
    "chapter": "07",
    "title": "비어 있는 호수",
    "place": "터널 너머 · 호수",
    "date": "2026. 09. 29 · 23:58",
    "art": "tunnel-night",
    "lines": [
      {
        "text": "2026년으로 돌아왔다. 그녀가 기다렸을 두 해가 그제야 실감났다. 산장과 호수를 차례로 찾았다.",
        "memory": "return"
      },
      {
        "text": "호수에는 아무도 없었다. 산장 식탁에는 그녀가 남겨 둔 짧은 편지 하나만 돌아와 있었다."
      },
      {
        "speaker": "편지",
        "text": "너를 만나러 갔어. 우리의 시작을 보고 왔어. 이제 나는 조금 멀리 가 보려고 해."
      },
      {
        "flag": "free",
        "yes": "네 하루를 살라고 말했을 때 이런 밤까지 생각한 것은 아니었다. 그래도 그 말을 거두고 싶지는 않았다. 이제 나도 내 하루로 돌아가기로 했다.",
        "no": "기다려 달라는 말을 끝없이 붙들게 할 수는 없었다. 편지의 종이를 천천히 접고, 나 역시 내 삶으로 돌아가기로 했다."
      },
      {
        "speaker": "편지",
        "text": "기다린 날들이 전부 슬프지는 않았어. 함께한 일 년도, 혼자 보낸 날들도 내 삶이었으니까."
      },
      {
        "text": "멀리서 비행기 불빛이 움직였다. 어느 비행기인지 알 수 없었다. 세상은 무너지지 않았다."
      },
      {
        "speaker": "나",
        "text": "잘 다녀와."
      },
      {
        "text": "인사는 이번에도 조금 늦었다. 나는 비어 있는 호수에 끝까지 남아 그 빛을 보냈다."
      }
    ],
    "ending": "departure"
  },
  "missed": {
    "chapter": "07",
    "title": "이번에는 내가",
    "place": "산장과 호수 사이",
    "date": "2026. 09. 30",
    "art": "tunnel-night",
    "lines": [
      {
        "flag": "rendezvous",
        "yes": "호수는 비어 있었다. 서로 찾을 수 있을 거라는 말만으로는 한 장소에 도착할 수 없었다. 산장으로 다시 달렸다.",
        "no": "약속한 자리는 비어 있었다. 젖은 벤치 옆에 오래 서 있던 발자국이 남아 있었다. 기다릴 시간을 함께 짚지 않았던 밤이 떠올랐다."
      },
      {
        "text": "그녀도 다른 쪽으로 나를 찾으러 간 뒤였다. 숲에는 갈래가 있었고, 우리는 같은 밤을 서로 다른 길로 건넜다."
      },
      {
        "text": "나는 산장 식탁에 메모를 남겼다. 이번에는 내가 기다릴게. 그리고 다시 호수로 내려갔다."
      },
      {
        "text": "다음 날, 호수 근처에서 그녀의 메모를 발견했다. 오늘로 끝내려 온 게 아니야. 서로가 먼저 움직였다는 사실만은 분명했다."
      },
      {
        "flag": "recorded",
        "yes": "봄에 녹음한 파일을 덧붙였다. 첫 웃음소리만 들어도 알아볼 거라고 생각했다.",
        "no": "기억하던 선율을 천천히 흥얼거려 녹음했다. 틀린 음까지 그녀가 기억해 주기를 바랐다."
      },
      {
        "speaker": "나",
        "text": "나 왔어. 이번에는 내가 기다릴게."
      },
      {
        "text": "산장에 컵 두 개를 씻어 놓았다. 저녁이면 호수로 갔다. 터널 쪽에서 소리가 날 때마다 고개를 들었다."
      },
      {
        "text": "다음 발소리가 누구의 것인지는 아직 몰랐다.\n이번에는, 그 끝까지 기다려 보고 싶었다."
      }
    ],
    "ending": "missed"
  },
  "stay_night": {
    "chapter": "07",
    "title": "내일도 여기서",
    "place": "산장 · 닫힌 현관",
    "date": "2024. 09. 29",
    "art": "birthday",
    "lines": [
      {
        "text": "현관문을 닫았다. 그녀와 남은 케이크를 나눠 먹었다. 오늘은 터널에 가지 않겠다고 말했다."
      },
      {
        "speaker": "그녀",
        "text": "나중에 후회하면 어떡해."
      },
      {
        "speaker": "나",
        "text": "내일도 네가 있으면 좋겠어."
      },
      {
        "text": "그녀는 바로 기뻐하지 않았다. 내 얼굴을 오래 보다가 빈 접시를 포개 놓았다."
      },
      {
        "text": "자정이 지났다. 비가 그쳤다. 아무 일도 일어나지 않은 것 같았다. 우리는 불을 끄고 잠들었다."
      }
    ],
    "next": "stay_morning"
  },
  "stay_morning": {
    "chapter": "07",
    "title": "내일도 여기서",
    "place": "산장 · 아침",
    "date": "2024. 09. 30",
    "art": "cabin-last-morning",
    "lines": [
      {
        "text": "물이 끓는 소리에 눈을 떴다. 그녀는 컵 두 개를 식탁에 놓고 빵을 굽고 있었다."
      },
      {
        "speaker": "그녀",
        "text": "오늘은 뭐 할까?"
      },
      {
        "text": "답하려다 창밖을 보았다. 나뭇잎이 바람에 기울어진 채 멈춰 있었다. 떨어지던 물방울도 공중에 그대로였다."
      },
      {
        "flag": "inspected",
        "equals": "cups",
        "yes": "처음 산장에 왔을 때의 컵 두 개가 떠올랐다. 기다린 사람의 자리를, 내가 지금 지우고 있었다.",
        "no": "공항에서 나를 기다리던 사람이 떠올랐다. 그날로 돌아가는 길을, 내가 지금 지우고 있었다."
      },
      {
        "text": "내가 떠나지 않으면 혼자 기다릴 그녀가 없다. 그런데 나는 이미, 기다림 끝에 선 그녀를 만나고 이곳에 왔다."
      },
      {
        "text": "서로 맞물려 있던 두 시간이 동시에 존재할 수 없게 되었다. 창 너머 풍경의 가장자리부터 하얗게 벗겨졌다."
      },
      {
        "speaker": "그녀",
        "text": "커피 식겠다."
      },
      {
        "text": "나는 알고도 컵을 받았다.\n손바닥에 남은 온기가 세상의 마지막 아침이었다."
      }
    ],
    "mood": "fracture",
    "ending": "stay"
  },
  "together_tunnel": {
    "chapter": "07",
    "title": "처음 보는 내일",
    "place": "폭풍우 속 · 터널",
    "date": "2024. 09. 29 · 23:44",
    "art": "tunnel-night",
    "lines": [
      {
        "text": "그녀가 먼저 손을 내밀었다. 혼자 기다리는 시간을 둘이 건너뛰면 된다고, 한 번쯤 믿고 싶었다."
      },
      {
        "speaker": "그녀",
        "text": "잘못되면, 나도 고른 거야."
      },
      {
        "text": "같이 걸었다. 두 사람의 발소리가 네 번 돌아왔다. 출구 너머에 숲이 보였다."
      },
      {
        "text": "휴대폰이 2026년을 가리켰다. 그녀는 내 손을 잡은 채 웃었다. 처음 보는 내일에 둘이 도착한 것 같았다."
      }
    ],
    "mood": "storm",
    "next": "together_end"
  },
  "together_end": {
    "chapter": "07",
    "title": "처음 보는 내일",
    "place": "사라지는 호수",
    "date": "2026. 09. 29",
    "art": "together-collapse",
    "lines": [
      {
        "text": "숲을 지나자 호수가 반으로 끊겨 있었다. 물도 하늘도 경계 너머로 이어지지 않았다."
      },
      {
        "text": "그녀가 건너뛴 두 해에는 기다림도, 산장을 판 여름도, 나를 맞이한 공항도 있었다. 그 시간을 통째로 비운 채 여기 올 수는 없었다."
      },
      {
        "speaker": "나",
        "text": "돌아가. 아직 터널이 보여. 나 혼자—"
      },
      {
        "speaker": "그녀",
        "text": "손 놓지 마."
      },
      {
        "text": "우리 뒤에서 길이 접혔다. 건너온 입구도 없었다. 나는 그녀의 손을 한 번 더 단단히 잡았다."
      },
      {
        "text": "처음 보는 내일이었다.\n그리고 마지막으로 함께 보는 풍경이었다."
      }
    ],
    "mood": "fracture",
    "ending": "together"
  },
  "collapse_meeting": {
    "chapter": "—",
    "title": "만나지 않은 두 사람",
    "place": "끝나지 않는 길",
    "date": "시간을 읽을 수 없음",
    "art": "bus-collapse",
    "lines": [
      {
        "text": "버스의 문이 닫혔다. 나는 끝내 산장과 호수로 돌아가지 않았다. 첫 만남은 일어나지 않았다."
      },
      {
        "text": "나를 기다렸던 그녀가 있을 이유도 사라졌다. 이미 본 공항과 도착하지 않은 과거가 서로를 지웠다."
      },
      {
        "text": "도로가 끊겼다. 하늘이 안쪽으로 무너졌다. 소리보다 먼저, 소리가 날 공간이 사라졌다."
      },
      {
        "text": "우리는 만나지 못했다.\n그 사실을 견딜 세계도 남지 않았다."
      }
    ],
    "mood": "fracture",
    "ending": "collapse_meeting"
  },
  "friend_meeting": {
    "chapter": "03",
    "title": "아는 얼굴, 모르는 사이",
    "place": "마을 · 카페 앞",
    "date": "2023. 11. 05",
    "art": "b-meeting",
    "lines": [
      {
        "text": "마을에서 돌아오던 길에 익숙한 얼굴을 보았다. 산장 열쇠를 빌려준 친구였다."
      },
      {
        "speaker": "나",
        "text": "너도 여기 있었어?"
      },
      {
        "speaker": "친구",
        "text": "저요?"
      },
      {
        "text": "반가워서 한 발 다가갔다가 멈췄다. 친구가 나를 모르는 얼굴이었다. 아직 2023년이었다."
      },
      {
        "speaker": "나",
        "text": "미안해요. 아는 사람인 줄 알았어요."
      },
      {
        "speaker": "친구",
        "text": "닮았나 봐요. 그 사람하고."
      },
      {
        "text": "산장의 그녀가 옆에서 인사를 건넸다. 두 사람은 가끔 마을에서 마주치는 사이인 듯했다."
      },
      {
        "text": "친구가 카페 문을 잡아 주었다. 나는 그녀가 언제부터 커피를 좋아했는지 떠올려 보았다. 생각해 본 적이 없었다."
      }
    ],
    "next": "two_paths"
  },
  "two_paths": {
    "chapter": "03",
    "title": "누구의 오늘을 알게 될까",
    "place": "마을에서 산장으로",
    "date": "2023. 11. 05",
    "art": "lake-empty",
    "lines": [
      {
        "text": "아직 누구와도 연인이 되지 않은 가을이었다. 이곳의 내일이 정해져 있다고 생각했던 건 나뿐이었다."
      },
      {
        "text": "공항에서 울던 그녀. 언젠가 내 친구가 될 사람. 알고 있는 미래보다, 눈앞의 사람을 더 알고 싶어졌다."
      }
    ],
    "prompt": "이곳에서 함께할 시간을 누구에게 내어 줄까.",
    "choices": [
      {
        "id": "route-cabin",
        "text": "산장의 그녀와 더 많은 시간을 보낸다.",
        "next": "winter",
        "set": {
          "route": "a"
        }
      },
      {
        "id": "route-friend",
        "text": "아직 나를 모르는 친구를 다시 만나러 간다.",
        "next": "b_first_days",
        "set": {
          "route": "b"
        }
      }
    ]
  },
  "b_first_days": {
    "chapter": "04",
    "title": "네가 좋아하는 것",
    "place": "마을 · 작은 카페",
    "date": "2023. 11. 12",
    "art": "b-meeting",
    "lines": [
      {
        "text": "다시 찾아간 카페 앞에서 그녀를 만났다. 이제는 나를 알아보고 먼저 인사했다."
      },
      {
        "speaker": "나",
        "text": "커피 사도 돼요?"
      },
      {
        "speaker": "친구",
        "text": "저 커피 안 마시는데요."
      },
      {
        "text": "내가 아는 친구는 늘 커피를 마셨다. 당연하다고 생각한 작은 것부터 맞지 않았다."
      },
      {
        "speaker": "친구",
        "text": "아는 사람이라던 그분은 커피 좋아하나 봐요?"
      }
    ],
    "prompt": "기억 속의 취향을 잠시 내려놓을까.",
    "choices": [
      {
        "id": "taste-now",
        "text": "그럼 지금 좋아하는 걸 알려 줘요.",
        "next": "b_walk",
        "set": {
          "bTaste": "ask"
        }
      },
      {
        "id": "taste-future",
        "text": "언젠가 좋아하게 될 수도 있잖아요.",
        "next": "b_walk",
        "set": {
          "bTaste": "remember"
        }
      }
    ]
  },
  "b_walk": {
    "chapter": "04",
    "title": "아직 비어 있는 부분",
    "place": "호수로 이어지는 마을 길",
    "date": "2023. 11. 12",
    "art": "b-meeting",
    "lines": [
      {
        "flag": "bTaste",
        "yes": "그녀는 따뜻한 차를 골랐다. 나는 커피를 주문했다. 처음으로 서로 다른 잔을 들고 나란히 걸었다.",
        "no": "그녀는 고개를 갸웃했다. “그건 나중 일이고요.” 나는 웃으며 차를 골라 달라고 했다.",
        "equals": "ask"
      },
      {
        "text": "내가 묵는 산장의 주인 이야기를 하자, 조용히 노래하는 사람이라고 했다."
      },
      {
        "speaker": "친구",
        "text": "저는 봄까지 여기서 일해요. 그다음에는 도시로 돌아가려고요."
      },
      {
        "text": "2025년에 어떻게 친구가 되었는지는 기억났다. 그 전에 어떤 꿈을 꾸었는지는 몰랐다."
      },
      {
        "speaker": "나",
        "text": "돌아가면 뭘 하고 싶어요?"
      },
      {
        "text": "그녀가 천천히 이야기했다. 나는 이미 아는 사람처럼 고개를 끄덕이는 대신, 처음 듣는 사람처럼 들었다."
      }
    ],
    "next": "b_winter"
  },
  "b_winter": {
    "chapter": "04",
    "title": "미래에는 우리",
    "place": "산장 · 겨울 저녁",
    "date": "2023. 12. 17",
    "art": "b-winter",
    "lines": [
      {
        "text": "눈 때문에 버스가 끊긴 날, 친구는 산장에서 차를 마시고 갔다. 몇 번의 저녁이 지나자 서로 말을 놓았다."
      },
      {
        "text": "나는 미래의 날짜가 남은 휴대폰과 터널 이야기를 꺼냈다. 친구는 처음 만난 날 내가 왜 놀랐는지 이제 알겠다고 했다."
      },
      {
        "speaker": "친구",
        "text": "그럼 그때의 우리는 무슨 사이야?"
      },
      {
        "speaker": "나",
        "text": "친구."
      },
      {
        "text": "대답은 사실이었다. 그런데 내가 아는 사실이, 지금의 우리에게는 벽이 될 수도 있었다."
      },
      {
        "speaker": "친구",
        "text": "아. 그렇구나."
      },
      {
        "text": "그녀는 컵을 두 손으로 감쌌다. 창밖을 보는 척했지만, 나는 다음 말을 기다리는 것을 알았다."
      }
    ],
    "prompt": "이미 알고 있는 미래와 지금의 마음 사이에서.",
    "choices": [
      {
        "id": "winter-love",
        "text": "그때는 친구였어. 하지만 지금은 네가 좋아.",
        "next": "b_winter_answer",
        "set": {
          "bConfessed": true,
          "bCommitted": true
        }
      },
      {
        "id": "winter-friends",
        "text": "친구로 오래 지내는 것도 좋잖아.",
        "next": "b_winter_answer",
        "set": {
          "bConfessed": false,
          "bCommitted": false
        }
      }
    ]
  },
  "b_winter_answer": {
    "chapter": "04",
    "title": "말이 남은 자리",
    "place": "산장 · 창가",
    "date": "2023. 12. 17",
    "art": "b-winter",
    "lines": [
      {
        "flag": "bCommitted",
        "yes": "친구는 한참 뒤 나를 보았다. “미래의 내가 아니라, 지금의 나?” 나는 그렇다고 대답했다.",
        "no": "친구는 작게 고개를 끄덕였다. “응. 친구도 좋지.” 좋은 대답을 하고도 마음 한쪽이 가라앉았다."
      },
      {
        "flag": "bCommitted",
        "yes": "우리 손이 테이블 위에서 닿았다. 이번에는 우연인 척하지 않았다.",
        "no": "장갑을 찾으며 잠깐 서로의 손이 닿았다. 친구는 먼저 손을 거두었다."
      },
      {
        "text": "산장의 그녀가 돌아와 장작을 더 넣었다. 우리는 잠깐 하던 말을 멈추고, 저녁을 같이 먹었다."
      },
      {
        "text": "눈은 다음 날 아침에 그쳤다. 친구가 돌아간 뒤에도 창가에는 컵 두 개가 남아 있었다."
      }
    ],
    "next": "b_coffee"
  },
  "b_coffee": {
    "chapter": "04",
    "title": "두 번째 잔",
    "place": "산장 · 봄 오후",
    "date": "2024. 04. 18",
    "art": "b-coffee",
    "lines": [
      {
        "text": "도시로 돌아갈 준비를 하던 친구가 주말마다 산장에 들렀다. 떠나기 전에 이 계절을 더 보고 싶다고 했다."
      },
      {
        "speaker": "친구",
        "text": "오늘은 커피 마셔 볼까? 네가 맨날 마시니까 궁금해졌어."
      },
      {
        "text": "친구는 처음 한 모금에 눈을 찡그렸다. 다음 모금은 조금 더 오래 머금었다."
      },
      {
        "speaker": "친구",
        "text": "쓰네. 그런데 냄새는 좋다."
      },
      {
        "text": "내 기억 속에서 늘 보던 컵을, 친구가 처음 들고 있었다. 내가 알던 취향에 이제 이유가 생겼다.",
        "memory": "friend_coffee"
      },
      {
        "speaker": "친구",
        "text": "너랑 있으면 가끔 내가 나중의 나를 따라가고 있는 것 같아. 나는 아직 아무것도 안 정했는데."
      }
    ],
    "next": "b_spring_question"
  },
  "b_spring_question": {
    "chapter": "04",
    "title": "지금 정하는 관계",
    "place": "산장 · 식탁",
    "date": "2024. 04. 18",
    "art": "b-coffee",
    "lines": [
      {
        "flag": "bConfessed",
        "yes": "겨울에 했던 말을 떠올렸다. 좋아한다는 말 뒤에도, 미래를 핑계로 망설인 날들이 있었다.",
        "no": "친구라고 말했던 겨울 이후, 하지 못한 말이 늘었다. 미래를 아는 것과 마음을 아는 것은 달랐다."
      },
      {
        "speaker": "친구",
        "text": "나중에 친구가 된다고 해서, 지금도 꼭 그래야 하는 건 아니지?"
      },
      {
        "text": "친구는 대답을 재촉하지 않았다. 나도 미래를 대신 대답하게 두고 싶지 않았다."
      }
    ],
    "prompt": "그녀가 묻는 것은 미래의 정답이 아니었다.",
    "choices": [
      {
        "id": "spring-love",
        "text": "지금의 너와 만나고 싶어. 친구보다 가까운 사이로.",
        "next": "b_spring_answer",
        "set": {
          "bConfessed": true,
          "bCommitted": true
        }
      },
      {
        "id": "spring-friends",
        "text": "나는 친구로 남고 싶어. 애매하게 기대하게 하고 싶지 않아.",
        "next": "b_spring_answer",
        "set": {
          "bCommitted": false
        }
      }
    ]
  },
  "b_spring_answer": {
    "chapter": "04",
    "title": "한 모금 뒤의 말",
    "place": "산장 · 봄 창가",
    "date": "2024. 04. 18",
    "art": "b-coffee",
    "lines": [
      {
        "flag": "bCommitted",
        "yes": "“나도.” 친구는 잔을 내려놓고 내 손을 잡았다. 우리는 아직 오지 않은 관계 대신 지금의 관계를 골랐다.",
        "no": "친구는 잠시 눈을 감았다. “알겠어. 말해 줘서 고마워.” 다음 말을 찾기까지 긴 침묵이 흘렀다.",
        "memoryIf": {
          "flag": "bCommitted",
          "equals": true,
          "id": "friend_love"
        }
      },
      {
        "flag": "bCommitted",
        "yes": "미래의 내가 아무것도 모른다는 사실이 사라진 것은 아니었다. 그래도 오늘 손을 잡은 이유는 분명해졌다.",
        "no": "우리는 거리를 다시 정했다. 위로처럼 손을 잡거나 연인 같은 약속을 해서 서로를 더 혼란스럽게 하지 않기로 했다."
      },
      {
        "text": "친구는 도시로 돌아간 뒤에도 가끔 안부를 물었다. 시간이 맞으면 호수에서 만났다."
      },
      {
        "text": "커피를 마시는 사진이 오면, 이제는 무슨 맛인지 먼저 물었다."
      }
    ],
    "next": "b_summer"
  },
  "b_summer": {
    "chapter": "04",
    "title": "친구라는 이름",
    "place": "호수 · 여름",
    "date": "2024. 08. 03",
    "art": "b-summer",
    "lines": [
      {
        "speaker": "친구",
        "text": "2025년에 처음 만났을 때, 나는 어땠어?"
      },
      {
        "text": "나는 처음으로 그날을 자세히 떠올렸다. 먼저 말을 걸던 사람. 내 농담에 이상할 만큼 안도하던 얼굴."
      },
      {
        "speaker": "나",
        "text": "오래 알고 지낸 것처럼 편했어. 너도 그렇게 말했지."
      },
      {
        "speaker": "친구",
        "text": "나는 이미 널 알고 있었겠네."
      },
      {
        "text": "말이 끝나자 호숫가 소리가 커졌다. 내가 친구라고 불렀던 사람은, 어쩌면 이 모든 시간을 혼자 기억하고 있었던 것이다."
      },
      {
        "flag": "bCommitted",
        "yes": "연인을 다시 만나고도 친구의 얼굴로 인사해야 하는 시간. 나는 그 길이를 상상하지 못했다.",
        "no": "마음을 접어 가던 사람에게 다시 처음처럼 인사해야 하는 시간. 친구라는 한마디로는 다 설명할 수 없었다."
      },
      {
        "speaker": "친구",
        "text": "그래도 그건 아직 내가 안 살아 본 날이야. 무섭다고 해서 네가 대신 정하지는 마."
      }
    ],
    "next": "b_promise"
  },
  "b_promise": {
    "chapter": "04",
    "title": "돌아오면, 그때도 우리는 친구야?",
    "place": "호수 · 여름 산책길",
    "date": "2024. 08. 03",
    "art": "b-summer",
    "lines": [
      {
        "text": "돌아갈 날이 가까워질수록, 미래를 아는 일이 마음을 대신할 수 없다는 걸 알았다."
      },
      {
        "speaker": "친구",
        "text": "돌아오면, 그때도 우리는 친구야?"
      },
      {
        "text": "그 질문에는 미래의 정답보다, 지금 서로에게 어떤 사람인지 말해 달라는 마음이 들어 있었다."
      },
      {
        "speaker": "나",
        "text": "그때의 우리가 직접 다시 묻자. 지금 네 마음을 내가 대신 정하지 않을게."
      }
    ],
    "prompt": "돌아온 뒤의 마음을 미리 정해 둘까.",
    "choices": [
      {
        "id": "promise-together",
        "text": "돌아온 뒤에, 서로 달라진 마음까지 직접 확인하자.",
        "next": "b_promise_answer",
        "set": {
          "bPromise": true
        }
      },
      {
        "id": "promise-vague",
        "text": "그때의 우리가 알아서 정하겠지.",
        "next": "b_promise_answer",
        "set": {
          "bPromise": false
        }
      }
    ]
  },
  "b_promise_answer": {
    "chapter": "04",
    "title": "대답의 길이",
    "place": "호수 · 여름 저녁",
    "date": "2024. 08. 03",
    "art": "b-summer",
    "lines": [
      {
        "flag": "bPromise",
        "yes": "친구는 고개를 끄덕였다. 기다림의 끝을 미리 정하지 않고, 돌아온 뒤의 우리에게 말할 자리를 남겨 두었다.",
        "no": "친구는 잠깐 웃다가 시선을 돌렸다. 대답을 미루는 동안에도 시간은 우리 대신 흘러갈 것이었다.",
        "memoryIf": {
          "flag": "bPromise",
          "equals": true,
          "id": "friend_plan"
        }
      },
      {
        "text": "친구는 가을부터 새 일을 시작한다고 했다. 나는 그 이야기를 오래 들었다."
      },
      {
        "speaker": "친구",
        "text": "너 없는 동안에도 나 잘 살 거야. 가끔 힘들겠지만."
      },
      {
        "text": "그 말이 나를 안심시키려고 하는 말이 아니어서 좋았다. 친구에게도 자기 내일이 있었다."
      }
    ],
    "next": "b_birthday"
  },
  "b_birthday": {
    "chapter": "04",
    "title": "다른 마음의 생일",
    "place": "산장 · 짧은 방문",
    "date": "2024. 09. 29",
    "art": "birthday",
    "lines": [
      {
        "text": "9월 29일은 산장의 그녀 생일이었다. 나는 낮에 작은 케이크를 놓고 갔다."
      },
      {
        "speaker": "산장의 그녀",
        "text": "올해도 기억해 줬네."
      },
      {
        "speaker": "나",
        "text": "처음 만났을 때 들었으니까."
      },
      {
        "text": "그녀는 웃다가 말을 골랐다. 요즘은 도시에서 노래할 곳을 찾아보고 있다고 했다."
      },
      {
        "speaker": "산장의 그녀",
        "text": "나는 여기 말고 다른 데서도 살아 보고 싶어."
      },
      {
        "text": "다녀오라는 인사를 하려다가 멈췄다. 공항에서 그녀가 먼저 했던 말이 떠올랐다."
      },
      {
        "speaker": "산장의 그녀",
        "text": "오늘은 친구 만나기로 했지? 늦겠다."
      },
      {
        "text": "문을 닫으며 나는 잠깐 뒤를 돌아보았다. 그녀는 촛불을 바라보고 있었다."
      }
    ],
    "next": "b_autumn_plan"
  },
  "b_autumn_plan": {
    "chapter": "04",
    "title": "미뤄 둔 약속",
    "place": "마을 · 카페",
    "date": "2024. 09. 29 · 저녁",
    "art": "b-meeting",
    "lines": [
      {
        "text": "친구와 마주 앉았다. 밖에는 아직 비가 오지 않았다."
      },
      {
        "flag": "bPromise",
        "yes": "여름에 나눈 말을 떠올렸다. 돌아온 뒤의 우리에게 직접 대답할 자리를 남겨 두기로 했었다.",
        "no": "여름에 제대로 대답하지 않은 말이 생각났다. 돌아간 다음에도 서로의 마음을 묻지 못할까 봐 두려웠다."
      },
      {
        "speaker": "친구",
        "text": "혹시 오늘 그 비가 오면, 그냥 사라지지는 마."
      },
      {
        "text": "나는 고개를 끄덕였다. 약속을 미루기에는 시간이 너무 가까이 와 있었다."
      }
    ],
    "prompt": "떠나기 전에 무엇을 분명히 해 둘까.",
    "choices": [
      {
        "id": "autumn-promise",
        "text": "돌아오면 먼저 전화할게. 네가 편한 곳에서 만나자.",
        "next": "b_autumn_answer",
        "set": {
          "bPromise": true
        }
      },
      {
        "id": "autumn-quiet",
        "text": "그저 고개를 끄덕이고 지금 함께 있는다.",
        "next": "b_autumn_answer",
        "set": {}
      }
    ]
  },
  "b_autumn_answer": {
    "chapter": "04",
    "title": "잔에 남은 온기",
    "place": "마을 · 카페",
    "date": "2024. 09. 29 · 저녁",
    "art": "b-meeting",
    "lines": [
      {
        "flag": "bPromise",
        "yes": "우리는 돌아온 뒤 직접 만나 지금의 마음을 묻기로 한 말을 되짚었다. 기다림을 한 사람의 몫으로 만들지 않으려 했다.",
        "no": "우리는 끝내 자세한 말을 하지 않았다. 대답을 미룬 만큼, 작별도 서툴러질 것 같았다.",
        "memoryIf": {
          "flag": "bPromise",
          "equals": true,
          "id": "friend_plan"
        }
      },
      {
        "flag": "bCommitted",
        "yes": "가게를 나오며 손을 잡았다. 친구가 한 번 더 힘을 주었다.",
        "no": "가게를 나오며 나란히 걸었다. 헤어질 골목에서 친구가 조심스럽게 손을 흔들었다."
      },
      {
        "text": "산장으로 돌아온 밤, 창문에 처음 빗방울이 닿았다. 예보에는 없던 비였다."
      }
    ],
    "next": "b_storm"
  },
  "b_storm": {
    "chapter": "05",
    "title": "다시 열린 밤",
    "place": "산장 · 현관",
    "date": "2024. 09. 29 · 23:08",
    "art": "tunnel-night",
    "lines": [
      {
        "text": "시간을 확인했다. 열한 시가 지났다. 호수 쪽에서 천둥이 울렸다."
      },
      {
        "text": "그날과 같은 비였다. 터널까지 가면 알 수 있을 것 같았다."
      },
      {
        "text": "이 밤이 지나면 한 사람은 시간을 건너고, 한 사람은 두 해를 살아야 했다. 마지막 인사만큼은 서로의 얼굴로 남기고 싶었다."
      }
    ],
    "mood": "night",
    "prompt": "이 밤을 어떻게 건널까.",
    "choices": [
      {
        "id": "b-call",
        "text": "서로의 얼굴을 보고 마지막 인사를 나눈다.",
        "next": "b_call",
        "set": {
          "departure": "call",
          "bParting": true
        }
      },
      {
        "id": "b-message",
        "text": "대답을 남기지 못한 채 터널로 간다.",
        "next": "b_depart_message",
        "set": {
          "departure": "message",
          "bParting": false
        }
      },
      {
        "id": "b-stay",
        "text": "가지 않는다. 여기서 친구와 내일을 보낸다.",
        "next": "b_stay_night",
        "set": {
          "departure": "stay"
        }
      }
    ]
  },
  "b_call": {
    "chapter": "05",
    "title": "서로 보는 작별",
    "place": "호수 · 터널 입구",
    "date": "2024. 09. 29 · 23:22",
    "art": "b-farewell",
    "lines": [
      {
        "text": "친구는 우산도 제대로 펴지 못한 채 달려왔다. 숨을 고른 뒤에야 내 얼굴을 보았다."
      },
      {
        "speaker": "친구",
        "text": "오늘은 얼굴 보고 인사하고 싶었어."
      },
      {
        "flag": "bCommitted",
        "yes": "나는 좋아한다고 말했던 사람의 손을 잡았다. 떠나는 순간에도 그 마음을 숨기지 않기로 했다.",
        "no": "친구는 내 소매를 잠깐 잡았다가 놓았다. 친구로 남기로 한 대답을 마지막 밤에 뒤집어 위로하고 싶지는 않았다."
      },
      {
        "speaker": "친구",
        "text": "돌아오면, 그때도 우리는 친구야?"
      },
      {
        "text": "나는 쉽게 약속하지 않았다. 돌아온 뒤의 대답은, 그때의 서로가 직접 하기로 했다."
      },
      {
        "text": "빗물과 눈물을 구분할 수 없었다. 나는 그 얼굴을 끝까지 보았다."
      }
    ],
    "mood": "night",
    "prompt": "터널의 불빛이 빗속에서 흔들렸다.",
    "choices": [
      {
        "id": "b-alone",
        "text": "여기까지 함께 온 뒤, 터널은 혼자 건넌다.",
        "next": "b_depart_call",
        "set": {}
      },
      {
        "id": "b-together",
        "text": "함께 가자고 손을 내민다.",
        "next": "b_together_tunnel",
        "set": {}
      },
      {
        "id": "b-stay-together",
        "text": "발걸음을 돌린다. 오늘은 떠나지 않는다.",
        "next": "b_stay_night",
        "set": {
          "departure": "stay"
        }
      }
    ]
  },
  "b_depart_call": {
    "chapter": "05",
    "title": "다음 인사까지",
    "place": "호수 · 터널 앞",
    "date": "2024. 09. 29 · 23:31",
    "art": "b-farewell",
    "lines": [
      {
        "speaker": "나",
        "text": "다녀올게."
      },
      {
        "speaker": "친구",
        "text": "응. 잘 다녀와."
      },
      {
        "text": "친구는 억지로 웃지 않았다. 나도 웃으라고 하지 않았다."
      },
      {
        "text": "터널 안으로 들어서기 전 마지막으로 뒤를 돌아보았다. 친구는 아직 그곳에 서 있었다."
      },
      {
        "text": "내가 건너뛸 시간 속에 친구를 남겨 두고, 나는 불빛이 보이지 않는 쪽으로 걸었다."
      }
    ],
    "next": "b_after_departure",
    "mood": "night"
  },
  "b_depart_message": {
    "chapter": "05",
    "title": "읽지 않은 인사",
    "place": "호수 · 터널 입구",
    "date": "2024. 09. 29 · 23:12",
    "art": "tunnel-night",
    "lines": [
      {
        "text": "그날과 똑같은 비가 와. 설명은 돌아온 뒤에 할게. 먼저 터널로 가야 할 것 같아.",
        "memory": "friend_message"
      },
      {
        "text": "읽었다는 표시를 기다리지 않고 걸음을 옮겼다. 늦으면 길이 닫힐 것 같았다."
      },
      {
        "text": "대답을 돌아온 뒤로 미룬 동안, 친구가 혼자 감당할 시간을 생각하지 못했다."
      }
    ],
    "next": "b_after_departure",
    "mood": "night"
  },
  "b_after_departure": {
    "chapter": "06",
    "title": "그가 없는 다음 날",
    "place": "친구의 기억 · 마을",
    "date": "2024. 09 — 12",
    "art": "b-meeting",
    "lines": [
      {
        "flag": "departure",
        "yes": "남겨 둔 메시지를 읽고도 한동안 움직이지 못했다. 얼굴을 보고 묻고 싶었던 말이, 읽지 않은 화면 뒤에 남았다.",
        "no": "너를 보내고 한참 뒤에야 걸음을 돌렸다. 마지막 인사는 눈앞에 있었지만, 손을 뻗지는 못했다."
      },
      {
        "text": "아침이 되었다. 나는 전날 입었던 옷을 갈아입었다. 출근 시간은 평소와 같았다."
      },
      {
        "text": "네가 돌아올 날은 내게 아직 두 해 뒤였다. 그때까지도 내 하루는 계속될 것이었다."
      },
      {
        "flag": "bCommitted",
        "yes": "처음에는 네가 돌아오는 날만 세었다. 기다림을 놓으면 너까지 놓치는 것 같았다.",
        "no": "친구로 남겠다고 말했던 날을 떠올렸다. 받아들였다고 해서 바로 아무렇지 않아지는 것은 아니었다."
      },
      {
        "text": "기다리는 동안 마음은 한 가지 모양으로 남지 않았다. 일을 하고, 다른 사람을 만나고, 집으로 돌아왔다."
      },
      {
        "text": "처음에는 돌아오기를 바랐다. 어느 순간부터는 돌아온 뒤에도 내가 나답게 서 있기를 바랐다.",
        "art": "b-alone"
      },
      {
        "text": "그런 날들 사이에 문득 네가 있었다. 나는 없어지지 않은 내 하루를 계속 살았다."
      }
    ],
    "next": {
      "route": "outcome",
      "to": {
        "b_reunion": "b_year_2025",
        "b_friend": "b_year_2025",
        "b_late": "b_changed_days"
      }
    },
    "pov": "친구"
  },
  "b_year_2025": {
    "chapter": "06",
    "title": "처음 뵙겠습니다",
    "place": "친구의 기억 · 도시의 카페",
    "date": "2025",
    "art": "b-friends",
    "lines": [
      {
        "text": "2025년에 너를 다시 만났다. 네가 말해 준 바로 그 카페였다."
      },
      {
        "text": "나는 네가 들어오는 순간 알아보았다. 너는 문을 잡아 준 나에게 고맙다고 했다."
      },
      {
        "speaker": "나",
        "text": "안녕하세요."
      },
      {
        "text": "그 인사가 이상하게 아팠다. 네게는 아직 아무 일도 일어나지 않았다."
      },
      {
        "speaker": "친구",
        "text": "안녕하세요. 여기 앉으셔도 돼요."
      },
      {
        "text": "오래 기다린 사람에게 처음 만난 사람의 자리를 내주었다. 목소리가 떨리지 않아서 다행이었다.",
        "memory": "friend_year"
      }
    ],
    "next": "b_friend_days",
    "pov": "친구"
  },
  "b_friend_days": {
    "chapter": "06",
    "title": "말을 삼키는 연습",
    "place": "친구의 기억 · 카페",
    "date": "2025 — 2026",
    "art": "b-friends",
    "lines": [
      {
        "text": "우리는 연락처를 나눴고, 가끔 커피를 마셨다. 너는 우리가 잘 맞는다고 했다."
      },
      {
        "speaker": "나",
        "text": "원래 커피 좋아했어?"
      },
      {
        "speaker": "친구",
        "text": "어떤 사람한테 배웠어."
      },
      {
        "flag": "bCommitted",
        "yes": "다시 좋아한다고 말하고 싶었던 날도 있었다. 하지만 그 말을 네가 갚아야 할 빚처럼 만들고 싶지는 않았다.",
        "no": "너무 다정하게 굴고 나서 혼자 기대하지 말자고 한 날이 있었다. 친구로 남겠다는 말을 나도 지키는 중이었다."
      },
      {
        "flag": "bCommitted",
        "yes": "반가워서 손을 뻗을 뻔한 날이 있었다. 나는 컵을 고쳐 잡는 척했다.",
        "no": "너무 다정하게 굴고 나서 혼자 기대하지 말자고 한 날이 있었다. 친구로 남겠다는 말을 나도 지키는 중이었다."
      },
      {
        "text": "내 일은 조금씩 바뀌었다. 네게 하지 못한 이야기 말고도, 하고 싶은 이야기가 많아졌다."
      }
    ],
    "next": "b_friend_boundary",
    "pov": "친구"
  },
  "b_friend_boundary": {
    "chapter": "06",
    "title": "너에게는 처음인 나",
    "place": "친구의 기억 · 집으로 가는 길",
    "date": "2026. 03",
    "art": "b-alone",
    "lines": [
      {
        "text": "다 말해 버리고 싶은 날도 있었다. 좋아했다는 것, 돌아오겠다고 했다는 것, 네가 기억하지 못하는 표정을 내가 안다는 것."
      },
      {
        "text": "하지만 지금의 너는 그런 약속을 한 적이 없었다. 내가 겪은 일을 빌려 네 마음까지 정할 수는 없었다."
      },
      {
        "flag": "bPromise",
        "yes": "우리가 돌아온 뒤 마음을 직접 묻기로 했던 말을 기억했다. 그래도 대답을 재촉할 수는 없었다.",
        "no": "아무 약속도 미래에 맡기지 않기로 했다. 그때의 마음은 그때의 것으로 두고, 나는 내 생활을 계속했다."
      },
      {
        "text": "달력을 덮고 내일 할 일을 적었다. 기다림 옆에 내 이름 대신, 내 생활을 남겨 두었다."
      }
    ],
    "next": "b_house_sale",
    "pov": "친구"
  },
  "b_house_sale": {
    "chapter": "06",
    "title": "산장의 다음 주인",
    "place": "친구의 기억 · 산장",
    "date": "2026. 06 — 09",
    "art": "cabin",
    "lines": [
      {
        "text": "산장의 그녀에게 연락이 왔다. 이제 다른 곳에서 노래해 보기로 했다고 했다."
      },
      {
        "speaker": "산장의 그녀",
        "text": "산장 팔려고. 너라면 좋아할 것 같아서 먼저 물어봐."
      },
      {
        "text": "나는 오래 생각하고 산장을 샀다. 네가 머물 곳이기도 했지만, 나도 쉬러 갈 수 있는 곳이었으면 했다."
      },
      {
        "speaker": "친구",
        "text": "고마워. 여기 잘 지낼게."
      },
      {
        "speaker": "산장의 그녀",
        "text": "그 사람도, 잘 다녀오면 좋겠다."
      },
      {
        "text": "그녀는 열쇠를 내려놓았다. 나는 그 말의 끝을 더 묻지 않았다. 그녀에게도 내가 다 모르는 시간이 있었다.",
        "memory": "friend_house"
      },
      {
        "text": "초가을에 다시 산장을 찾았다. 문 앞에서 열쇠를 들어 보았다. 곧 이 열쇠를 네게 건넬 차례였다.",
        "art": "b-keys"
      }
    ],
    "next": "b_lending",
    "pov": "친구"
  },
  "b_lending": {
    "chapter": "06",
    "title": "휴가를 빌려주던 날",
    "place": "친구의 기억 · 카페",
    "date": "2026. 09. 28",
    "art": "b-friends",
    "lines": [
      {
        "text": "네가 늦은 휴가 이야기를 꺼냈다. 나는 산장 열쇠를 가지고 나왔다."
      },
      {
        "speaker": "친구",
        "text": "이번에는 정말 쉬다 와. 산장 비워 뒀으니까."
      },
      {
        "text": "몇 번이나 속으로 해 본 말이었다. 네게는 친구가 건네는 평범한 호의로 들렸을 것이다."
      },
      {
        "speaker": "나",
        "text": "돌아오면 커피 살게."
      },
      {
        "flag": "bCommitted",
        "yes": "다음에는 그 겨울의 대답을 기억하는 너와 마주 앉고 싶었다. 다만 그 대답을 다시 요구하지는 않을 것이다.",
        "no": "다음에는 네 대답을 다시 들을 수 있을 것이다. 내가 무엇을 원하는지도 이번에는 숨기지 않을 생각이었다."
      },
      {
        "text": "네가 먼저 카페를 나갔다. 이번에는 내가 뒤를 돌아보는 네 모습을 보았다."
      }
    ],
    "next": "b_airport_a",
    "pov": "친구"
  },
  "b_airport_a": {
    "chapter": "06",
    "title": "다른 사랑을 보내는 일",
    "place": "그녀의 기억 · 공항 도착장",
    "date": "2026. 09. 29",
    "art": "airport-tears",
    "lines": [
      {
        "text": "나는 너를 보자마자 울었다. 너는 내가 누구인지 몰라서 잠깐 뒤를 돌아보았다."
      },
      {
        "text": "내 생일을 기억해 준 사람. 산장 식탁에 컵을 하나 더 놓던 사람. 그리고 다른 사람을 만나러 마을로 내려가던 사람."
      },
      {
        "text": "너와 함께한 시간이 내게도 소중했다. 같은 모양의 사랑을 받지 못했다고 해서 없던 날이 되지는 않았다."
      },
      {
        "speaker": "나",
        "text": "혹시 저를 아세요?"
      },
      {
        "speaker": "그녀",
        "text": "아직이요."
      },
      {
        "text": "말하고 싶었다. 네가 누구에게 가는지, 누가 네가 돌아오기를 기다리는지. 그 모든 날에 나도 있었다는 것을."
      },
      {
        "text": "대신 길을 비켰다. 네가 누군가를 선택한 마음을, 나를 위해 지우고 싶지는 않았다."
      },
      {
        "speaker": "그녀",
        "text": "잘 다녀와요."
      }
    ],
    "next": "b_airport_departure",
    "pov": "그녀"
  },
  "b_airport_departure": {
    "chapter": "06",
    "title": "그녀가 고른 내일",
    "place": "그녀의 기억 · 출국장",
    "date": "2026. 09. 29",
    "art": "airport-tears",
    "lines": [
      {
        "text": "네 뒷모습이 사라진 뒤, 나는 출국장으로 걸었다. 표에 적힌 비행기는 나를 기다려 주지 않을 것이다."
      },
      {
        "text": "호수로 돌아갈 약속은 없었다. 그렇다고 내게 돌아갈 곳이 없는 것은 아니었다."
      },
      {
        "speaker": "그녀",
        "text": "이번에는 나도 잘 다녀올게."
      },
      {
        "text": "비행기가 떠올랐다. 창밖의 도시는 무너지지 않았다. 사랑이 이루어지지 않은 날에도, 세상은 다음으로 이어졌다."
      }
    ],
    "next": "b_returned",
    "pov": "그녀"
  },
  "b_returned": {
    "chapter": "07",
    "title": "이번에는 내가 아는 인사",
    "place": "산장 앞 · 터널",
    "date": "2026. 09. 29 · 23:41",
    "art": "tunnel-night",
    "lines": [
      {
        "text": "휴대폰이 신호를 잡았다. 2026년 9월 29일, 23시 41분. 내게는 일 년, 출발한 날에는 몇 시간이 흘렀다."
      },
      {
        "text": "친구가 산장 열쇠를 건네던 손을 떠올렸다. 커피가 식을 때까지 기다려 주던 이유도 이제는 알 것 같았다."
      },
      {
        "text": "공항에서 울던 그녀에게도 고마웠다. 잘 다녀오라는 말 속에 어떤 마음이 있었을까."
      },
      {
        "text": "돌아온 사실을 먼저 알렸다. 이번에는 내가 먼저 연락했다."
      }
    ],
    "next": {
      "route": "outcome",
      "to": {
        "b_reunion": "b_return_call",
        "b_friend": "b_friend_call",
        "b_late": "b_late_call"
      }
    },
    "mood": "night"
  },
  "b_return_call": {
    "chapter": "07",
    "title": "받고 싶었던 전화",
    "place": "산장 · 전화 너머",
    "date": "2026. 09. 29 · 밤",
    "art": "b-friends",
    "lines": [
      {
        "speaker": "친구",
        "text": "도착했어?"
      },
      {
        "speaker": "나",
        "text": "응. 이제 나도 기억해."
      },
      {
        "text": "수화기 너머가 조용해졌다. 숨을 들이쉬는 소리가 두 번 들렸다."
      },
      {
        "speaker": "나",
        "text": "돌아왔어. 그때 하지 못한 대답을, 이제는 직접 듣고 싶어."
      },
      {
        "speaker": "친구",
        "text": "내일 만나자. 이번에는 미루지 말고."
      },
      {
        "text": "내일 도시로 돌아가 만나기로 했다. 처음으로 똑같은 현재의 약속이었다."
      }
    ],
    "next": "b_reunion"
  },
  "b_reunion": {
    "chapter": "07",
    "title": "이제 나도 기억해",
    "place": "도시 · 카페 앞",
    "date": "2026. 09. 30 · 밤",
    "art": "b-reunion",
    "lines": [
      {
        "text": "다음 날 저녁, 카페 앞에 도착했다. 친구는 유리문 안쪽에 서 있었다. 나를 보더니 밖으로 나왔다.",
        "memory": "friend_return"
      },
      {
        "speaker": "친구",
        "text": "이번에는 나 알아?"
      },
      {
        "speaker": "나",
        "text": "응. 지금의 너도 더 알고 싶어."
      },
      {
        "text": "친구가 울면서 웃었다. 나는 이번에는 누구를 찾는지 묻지 않았다."
      },
      {
        "speaker": "친구",
        "text": "나 그동안 하고 싶은 말 진짜 많았어."
      },
      {
        "speaker": "나",
        "text": "들을게. 오늘 다 못 하면 내일도."
      },
      {
        "text": "우리는 손을 잡고 카페로 들어갔다. 친구의 잔에는 커피가 있었다. 왜 좋아하게 되었는지, 이제는 둘 다 알았다."
      }
    ],
    "ending": "b_reunion"
  },
  "b_friend_call": {
    "chapter": "07",
    "title": "말을 미루지 않는 밤",
    "place": "산장 · 전화 너머",
    "date": "2026. 09. 29 · 밤",
    "art": "b-friends",
    "lines": [
      {
        "speaker": "나",
        "text": "돌아왔어. 지금은 나도 기억해."
      },
      {
        "text": "친구는 한참 뒤에 대답했다. 목소리가 조금 떨렸지만, 먼저 숨을 고르고 말을 꺼냈다."
      },
      {
        "speaker": "친구",
        "text": "우리에게 있었던 시간은 소중해. 그래도 지금은 친구로 만나고 싶어."
      },
      {
        "speaker": "나",
        "text": "응. 돌아왔다고 해서 네 마음이 바뀌어야 하는 건 아니니까."
      },
      {
        "speaker": "친구",
        "text": "내일 얼굴 보고 이야기하자. 이제 미루지 말고."
      },
      {
        "text": "나는 알겠다고 했다. 다음 날 도시로 돌아가는 비행기를 알아보았다."
      }
    ],
    "next": "b_friend_end"
  },
  "b_friend_end": {
    "chapter": "07",
    "title": "친구로 남는 일",
    "place": "도시 · 카페",
    "date": "2026. 09. 30 · 오후",
    "art": "b-friend-end",
    "lines": [
      {
        "text": "친구가 내 앞에 커피를 놓았다. 익숙한 자리였지만, 오늘은 모른 척하는 사람이 없었다.",
        "memory": "friend_return"
      },
      {
        "speaker": "친구",
        "text": "네가 미안해서 내 옆에 있지는 않았으면 좋겠어."
      },
      {
        "speaker": "나",
        "text": "응. 우리에게 있었던 시간은 그대로 두고, 지금의 친구로 있을게."
      },
      {
        "text": "함께한 시간이 없던 일이 되지는 않았다. 그래도 그 시간만으로 서로의 내일을 결정할 수는 없었다."
      },
      {
        "text": "컵 두 개가 나란히 놓였다. 이번에는 같은 기억을 가진 친구 둘이 마주 앉았다."
      }
    ],
    "ending": "b_friend"
  },
  "b_stay_night": {
    "chapter": "05",
    "title": "가지 않는 대답",
    "place": "산장 · 늦은 밤",
    "date": "2024. 09. 29",
    "art": "cabin",
    "lines": [
      {
        "text": "나는 친구에게 돌아가지 않겠다고 말했다. 친구는 한참 동안 나를 보았다."
      },
      {
        "speaker": "친구",
        "text": "네가 기억하는 2025년은 어떻게 되는 거야?"
      },
      {
        "text": "대답할 수 없었다. 그래도 같이 아침을 먹고 싶다는 말을 했다."
      },
      {
        "text": "비가 그쳤다. 터널은 다시 평범한 길이 되었다. 우리는 창가에 나란히 앉아 밤이 끝나는 것을 보았다."
      }
    ],
    "next": "b_stay_morning",
    "mood": "night"
  },
  "b_stay_morning": {
    "chapter": "07",
    "title": "내일도 여기서",
    "place": "산장 · 마지막 아침",
    "date": "2024. 09. 30",
    "art": "b-stay",
    "lines": [
      {
        "text": "친구가 커피를 내렸다. 내가 가르쳐 준 방식이었다."
      },
      {
        "speaker": "친구",
        "text": "뜨거우니까 천천히."
      },
      {
        "text": "컵을 받는 순간, 창밖이 겨울빛으로 얼어붙었다. 아직 가을이어야 할 호수의 가장자리가 하얗게 지워졌다."
      },
      {
        "text": "2025년에 처음 만났던 나. 산장을 빌려 휴가를 떠났던 나. 이곳에 남은 나와 함께 있을 수 없는 시간들이 겹쳤다."
      },
      {
        "text": "친구는 컵에서 손을 떼지 않았다. 나는 그 위에 손을 포갰다."
      },
      {
        "text": "우리에게는 아직 온기가 있었다. 그 온기를 담아 둘 세계가 먼저 끝났다."
      }
    ],
    "ending": "stay",
    "mood": "fracture"
  },
  "b_together_tunnel": {
    "chapter": "05",
    "title": "둘이 건너는 길",
    "place": "호수 · 터널",
    "date": "2024. 09. 29 · 밤",
    "art": "b-farewell",
    "lines": [
      {
        "speaker": "나",
        "text": "같이 가자. 혼자 기다리지 않게."
      },
      {
        "text": "친구는 내 손과 터널을 번갈아 보았다. “그럼 네가 알던 친구는 누가 돼?”"
      },
      {
        "text": "나는 몰랐다. 아는 것보다 붙잡고 싶은 것이 더 가까이 있었다."
      },
      {
        "text": "친구가 내 손을 잡았다. 우리는 두 사람 몫의 발소리를 내며 안으로 들어갔다."
      }
    ],
    "next": "b_together_end",
    "mood": "night"
  },
  "b_together_end": {
    "chapter": "07",
    "title": "처음 보는 내일",
    "place": "터널 너머 · 사라지는 호수",
    "date": "2026. 09. 29 · 밤",
    "art": "b-together",
    "lines": [
      {
        "text": "터널을 벗어나자 휴대폰의 날짜가 바뀌었다. 친구도 내 옆에 있었다."
      },
      {
        "text": "그러나 친구가 2025년에 나를 만나던 시간은 이제 비어 있었다. 산장을 사서 빌려준 사람의 시간도 함께 사라졌다."
      },
      {
        "text": "돌아갈 산장 너머로 세상이 하얗게 지워졌다. 처음 휴가를 떠난 날의 기억이, 손안의 열쇠처럼 가벼워졌다."
      },
      {
        "speaker": "친구",
        "text": "손 놓지 마."
      },
      {
        "text": "나는 더 단단히 잡았다. 우리를 데려온 길이 사라지는 동안에도, 서로의 손은 놓지 않았다."
      }
    ],
    "ending": "together",
    "mood": "fracture"
  },
  "b_changed_days": {
    "chapter": "06",
    "title": "늦게 도착한 마음",
    "place": "친구의 기억 · 계절 사이",
    "date": "2024 — 2025",
    "art": "b-alone",
    "lines": [
      {
        "text": "처음에는 네가 돌아오는 날만 세었다. 그날이 오면 다시 좋아한다고 말할 수 있을 거라고 생각했다."
      },
      {
        "text": "하지만 기다림이 길어지면서, 그 마음을 그대로 들고 사는 법을 배웠다. 좋아했던 시간과 지금의 하루를 억지로 하나로 만들지 않기로 했다."
      },
      {
        "flag": "bPromise",
        "yes": "우리는 돌아온 뒤 직접 묻기로 했다. 나는 그 약속을 지키되, 대답을 미리 빚처럼 요구하지 않기로 했다.",
        "no": "아무것도 정하지 않은 채 떠난 밤을 떠올렸다. 그래서 더 늦기 전에 내 마음부터 놓아 주기로 했다."
      },
      {
        "text": "네가 돌아왔을 때 다시 사랑을 요구하고 싶지는 않았다. 그때의 나는 너를 좋아했지만, 지금의 나는 지금의 너를 만나고 싶었다."
      },
      {
        "text": "마음은 늦게 도착했지만, 관계는 돌아온 오늘 다시 정할 수 있었다."
      }
    ],
    "next": "b_year_2025",
    "pov": "친구"
  },
  "b_late_call": {
    "chapter": "07",
    "title": "늦게 도착한 대답",
    "place": "산장 · 전화 너머",
    "date": "2026. 09. 29 · 밤",
    "art": "b-friends",
    "lines": [
      {
        "speaker": "나",
        "text": "돌아왔어. 이제 나도 기억해."
      },
      {
        "text": "친구는 반가운 숨을 삼켰다. 그 목소리 안에는 기다린 시간과, 이미 달라진 시간이 함께 있었다."
      },
      {
        "speaker": "친구",
        "text": "그때의 나는 너를 좋아했어."
      },
      {
        "speaker": "친구",
        "text": "그런데 지금은 너와 친구로 지내고 싶어."
      },
      {
        "speaker": "나",
        "text": "알겠어. 늦게 도착한 마음을 네가 받아야 할 의무는 없으니까."
      },
      {
        "text": "우리는 다음 날 얼굴을 보고 이야기하기로 했다. 이번에는 미루지 않되, 서로의 오늘을 바꾸려고 하지 않기로 했다."
      }
    ],
    "next": "b_late_end"
  },
  "b_late_end": {
    "chapter": "07",
    "title": "마음은 늦게 도착했지만",
    "place": "도시 · 카페",
    "date": "2026. 09. 30 · 오후",
    "art": "b-friend-end",
    "lines": [
      {
        "text": "카페의 익숙한 자리에 마주 앉았다. 두 해 전의 고백은 아직 진짜였고, 오늘의 대답도 진짜였다.",
        "memory": "friend_return"
      },
      {
        "speaker": "친구",
        "text": "미안해하지 마. 그때의 우리는 그때대로 소중했어."
      },
      {
        "speaker": "나",
        "text": "응. 지금의 너를 알게 된 것만으로도 충분히 늦지 않았어."
      },
      {
        "text": "마음은 늦게 도착했지만, 관계는 오늘 정할 수 있었다. 우리는 사랑을 되돌려 받는 대신, 서로의 내일을 존중하기로 했다."
      },
      {
        "text": "컵 두 개가 나란히 놓였다. 같은 기억을 가진 두 친구가, 다른 내일을 바라보고 있었다."
      }
    ],
    "ending": "b_late"
  }
};
  const MEMORIES = {
  "airport": {
    "title": "아직이요.",
    "date": "2026. 09. 29",
    "kind": "기억",
    "body": "도착장에서 나를 보며 울던 사람. 나를 아느냐고 묻자, 아직이라고 대답했다."
  },
  "key": {
    "title": "컵 두 개",
    "date": "2026. 09. 29",
    "kind": "메모",
    "body": "친구가 세 달 전에 산 산장. 식탁에는 컵이 두 개였다. 터널을 지나면 호수가 나온다고 했다."
  },
  "date": {
    "title": "세 해 전의 아침",
    "date": "2023. 09. 30",
    "kind": "메모",
    "body": "휴대폰과 마을의 날짜가 모두 2023년을 가리킨다. 폭풍우 속 터널을 통과했을 때만 호수 대신 숲이 나왔다."
  },
  "birthday": {
    "title": "9월 29일",
    "date": "2023. 09. 30",
    "kind": "기억",
    "body": "그녀의 생일. 내가 시간을 건너온 날. 아직 그녀는 공항의 나를 모른다."
  },
  "tunnel": {
    "title": "열한 시부터 자정까지",
    "date": "2023. 11. 04",
    "kind": "조사 기록",
    "body": "평소의 터널은 숲과 호수를 잇는다. 9월 29일 밤, 예보에 없던 폭풍우 속에서 길이 달라졌다. 그 밤의 시간은 23시부터 자정 사이였다."
  },
  "ordinary": {
    "title": "장을 보러 간 날",
    "date": "2023. 11. 04",
    "kind": "기억",
    "body": "돌아갈 방법만 찾느라 놓친 것들. 고양이 밥, 장갑 한 켤레, 함께 먹을 저녁."
  },
  "song": {
    "title": "끝나지 않은 노래",
    "date": "2024. 04. 18",
    "kind": "녹음 · 00:18",
    "body": "같은 마디에서 멈춘 기타. 잠깐 웃는 소리. “나머지는 나중에 들려줄게.”",
    "audio": true
  },
  "listening": {
    "title": "녹음하지 않은 오후",
    "date": "2024. 04. 18",
    "kind": "기억",
    "body": "휴대폰을 내려놓고 끝까지 들었다. 노래는 미완성이었지만, 오후는 그렇지 않았다."
  },
  "lake": {
    "title": "호수에서 만나",
    "date": "2024. 08. 03",
    "kind": "약속",
    "body": "서로를 찾지 못하게 되면, 처음 만난 호수에서. 늦어지면 늦는 대로."
  },
  "cabin": {
    "title": "산장에 불을 켜 둘게",
    "date": "2024. 08. 03",
    "kind": "약속",
    "body": "서로를 찾지 못하게 되면 산장으로. 문 앞에서 기다리고, 그다음에 함께 호수로 가자."
  },
  "tomorrow": {
    "title": "너의 내일",
    "date": "2024. 09. 29",
    "kind": "기억",
    "body": "기다림을 사랑의 증거로 요구하지 않기로 했다. 돌아올 길을 찾는 일과 그녀의 삶을 멈추게 하는 일은 다르다."
  },
  "message": {
    "title": "보낸 메시지",
    "date": "2024. 09. 29 · 23:12",
    "kind": "메시지",
    "body": "그날이랑 똑같은 비가 와.\n터널에 가봐야 할 것 같아.\n미안해. 금방 돌아올게."
  },
  "letter": {
    "title": "식탁 위의 편지",
    "date": "2024. 09. 29",
    "kind": "편지",
    "body": "금방이라는 말을 지킬 수 있을지는 몰라. 그래도 너에게 돌아오는 길을 찾을게. 네 시간은 네 것이야."
  },
  "waiting": {
    "title": "두 번의 가을",
    "date": "2024 — 2026",
    "kind": "그녀의 기억",
    "body": "함께 보낸 일 년 뒤에, 혼자 보낸 두 해. 2026년 여름 산장을 팔았다. 약속한 날짜에 공항으로 갔다."
  },
  "return": {
    "title": "돌아온 날짜",
    "date": "2026. 09. 29 · 23:41",
    "kind": "메모",
    "body": "내게는 일 년, 출발한 시간에는 몇 시간. 그녀에게는 이별 뒤 두 번의 가을이 더 흘렀다."
  },
  "friend_key": {
    "title": "휴가를 빌려준 사람",
    "date": "2026. 09. 28",
    "kind": "기억",
    "body": "2025년에 알게 된 친구. 세 달 전에 산 산장의 열쇠를 건네며, 휴가가 끝나면 커피를 마시자고 했다."
  },
  "friend_coffee": {
    "title": "처음 마신 커피",
    "date": "2024. 04. 18",
    "kind": "기억",
    "body": "친구의 커피 취향은 처음부터 있던 것이 아니었다. 두 잔 중 한 잔을 함께 고르던 봄이 먼저 있었다."
  },
  "friend_love": {
    "title": "지금의 대답",
    "date": "2024. 04. 18",
    "kind": "약속",
    "body": "미래의 관계를 정답으로 삼지 않고, 지금 곁에 있는 사람에게 좋아한다고 말했다."
  },
  "friend_plan": {
    "title": "돌아와서 할 일",
    "date": "2024. 09. 29",
    "kind": "약속",
    "body": "돌아온 뒤 직접 만나 지금의 마음을 묻기. 기다림의 끝을 혼자 정하지 않기."
  },
  "friend_message": {
    "title": "뒤늦게 도착한 말",
    "date": "2024. 09. 29",
    "kind": "메시지",
    "body": "그날과 똑같은 비가 와. 설명은 돌아온 뒤로 미루고, 먼저 터널로 향했다."
  },
  "friend_year": {
    "title": "친구가 된 해",
    "date": "2025",
    "kind": "친구의 기억",
    "body": "나는 함께한 일 년을 기억했고, 너는 아직 여행을 떠나지 않았다. 반가운 마음을 처음 만난 사람의 인사로 바꾸었다."
  },
  "friend_house": {
    "title": "산장을 산 이유",
    "date": "2026. 06",
    "kind": "친구의 기억",
    "body": "그녀에게도 다음 삶이 있었다. 나는 그녀가 떠나는 산장을 샀다. 함께했던 시간을 지키되 내 생활을 멈추지는 않기로 했다."
  },
  "friend_return": {
    "title": "이제 같은 기억",
    "date": "2026. 09. 30",
    "kind": "기억",
    "body": "그는 돌아온 밤 친구에게 전화했다. 다음 날 도시의 카페에서, 처음으로 두 사람 모두 지난 일 년을 기억하며 마주 앉았다."
  }
};
  const ENDINGS = {
  "reunion": {
    "order": "01",
    "type": "main",
    "label": "TRUE END",
    "name": "아직이요",
    "subtitle": "같은 날짜에 서서",
    "quote": "자정이 지났다.\n우리는 같은 날짜에 서 있었다.",
    "art": "reunion-night",
    "note": "진실, 귀환 준비, 만날 장소, 마주한 작별이 두 사람을 같은 밤으로 이끌었습니다."
  },
  "departure": {
    "order": "02",
    "type": "main",
    "label": "FAREWELL END",
    "name": "잘 다녀와",
    "subtitle": "그녀가 고른 다음 날",
    "quote": "“이번에는 나도,\n잘 다녀올게.”",
    "art": "airport-tears",
    "note": "시작을 지킨 뒤, 그녀는 자신의 내일로 떠났습니다."
  },
  "missed": {
    "order": "03",
    "type": "main",
    "label": "OPEN END",
    "name": "이번에는 내가",
    "subtitle": "같은 밤을 엇갈린 사람들",
    "quote": "“나 왔어.\n이번에는 내가 기다릴게.”",
    "art": "tunnel-night",
    "note": "서로를 찾는 마음은, 아직 끝나지 않았습니다."
  },
  "stay": {
    "order": "04",
    "type": "main",
    "label": "BAD END",
    "name": "내일도 여기서",
    "subtitle": "세상의 마지막 아침",
    "quote": "나는 알고도 컵을 받았다.\n손바닥에는 아직 온기가 있었다.",
    "art": "cabin-last-morning",
    "note": "잔류로 인해 기다림의 시간이 사라지고 세계가 무너졌습니다.",
    "variants": {
      "b": {
        "art": "b-stay",
        "quote": "우리에게는 아직 온기가 있었다.\n그 온기를 담아 둘 세계가 먼저 끝났다.",
        "note": "귀환을 포기해 미래의 우정과 산장을 빌린 시간이 모순되었습니다."
      }
    }
  },
  "together": {
    "order": "05",
    "type": "main",
    "label": "BAD END",
    "name": "처음 보는 내일",
    "subtitle": "끝에서도 놓지 않은 손",
    "quote": "처음 보는 내일이었다.\n마지막으로 함께 보는 풍경이었다.",
    "art": "together-collapse",
    "note": "둘이 건너뛴 두 해가 인과관계를 끊고 세계가 무너졌습니다.",
    "variants": {
      "b": {
        "art": "b-together",
        "quote": "네가 기다려 준 시간을 지우고\n우리는 함께 도착했다.",
        "note": "친구가 살아야 했던 두 해를 함께 건너뛰어 산장을 빌려준 인과가 사라졌습니다."
      }
    }
  },
  "collapse_meeting": {
    "order": "01",
    "type": "collapse",
    "label": "WORLD COLLAPSE",
    "name": "만나지 않은 두 사람",
    "subtitle": "첫 만남의 소멸",
    "quote": "우리는 만나지 못했다.\n그 사실을 견딜 세계도 남지 않았다.",
    "art": "bus-collapse",
    "note": "첫 만남을 포기해 공항의 기억과 모순이 생겼습니다."
  },
  "b_reunion": {
    "order": "06",
    "type": "main",
    "label": "TRUE END",
    "name": "이제 나도 기억해",
    "subtitle": "같은 기억으로 마주 앉은 사람들",
    "quote": "“오늘 다 못 하면\n내일도 들을게.”",
    "art": "b-reunion",
    "note": "지금의 마음을 숨기지 않고, 돌아온 뒤의 약속과 마주한 작별을 함께 지켰습니다."
  },
  "b_friend": {
    "order": "07",
    "type": "main",
    "label": "NORMAL END",
    "name": "친구로 남는 일",
    "subtitle": "없던 일이 되지 않은 시간",
    "quote": "컵 두 개가 나란히 놓였다.\n이번에는 같은 기억을 가진 친구 둘이었다.",
    "art": "b-friend-end",
    "note": "함께한 시간을 인정하고, 지금의 우정을 서로의 뜻으로 받아들였습니다."
  },
  "b_late": {
    "order": "08",
    "type": "main",
    "label": "FAREWELL END",
    "name": "늦게 도착한 마음",
    "subtitle": "사랑했던 시간과 지금의 우정",
    "quote": "마음은 늦게 도착했지만,\n관계는 오늘 정할 수 있었다.",
    "art": "b-friend-end",
    "note": "기다리는 동안 달라진 마음을 인정하고, 지금의 관계를 친구로 다시 선택했습니다."
  }
};
  function outcomeFor(flags) {
    if (flags.route === 'b') {
      if (flags.bCommitted === true && flags.bPromise === true && flags.bParting === true) return 'b_reunion';
      if (flags.bCommitted === true) return 'b_late';
      return 'b_friend';
    }
    const truth = flags.honest === true || flags.winterTruth === true;
    const preparation = flags.research === true || flags.prepared === true;
    const place = ['lake', 'cabin'].includes(flags.rendezvous);
    if (!truth || flags.departure !== 'call') return 'departure';
    return preparation && place ? 'reunion' : 'missed';
  }
  function endingFor(id, flags = {}) {
    const ending = ENDINGS[id];
    return { ...ending, ...(ending.variants?.[flags.route] || {}) };
  }
  function sentenceLines(text) {
    return text.replace(/,([ \t]*)(?=\S)/g, ', ').replace(/([^\d.])([.!?。][”’」』"]?)[ \t]+(?=\S)/g, '$1$2\n');
  }
  function lineText(line, flags) {
    if (!line.flag) return sentenceLines(line.text);
    const match = line.equals === undefined ? Boolean(flags[line.flag]) : flags[line.flag] === line.equals;
    return sentenceLines(match ? line.yes : line.no);
  }




  globalThis.WDIC = { STORY_VERSION, START_NODE, FLAG_RULES, SCENES, MEMORIES, ENDINGS, lineText, sentenceLines, outcomeFor, endingFor };
})();
