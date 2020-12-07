const data = {
  "users": [
      {
          "id": "159bca",
          "name": "Ted",
          "img": null
      },
      {
          "id": "abc123",
          "name": "Mick",
          "img": null
      },
      {
          "id": "123abc",
          "name": "Christmas",
          "img": null
      }
  ],
  "contacts": [
      {
          "id": "654151",
          "u1id": "159bca",
          "u2id": "abc123"
      },
      {
          "id": "7142365",
          "u1id": "123abc",
          "u2id": "159bca"
      },
      {
        "id": "956956",
        "u1id": "648646",
        "u2id": "123abc"
      }
  ],
  "messages": [
      {
          "id": "159159",
          "contactsId": "654151",
          "senderId": "159bca",
          "message": "Labas",
          "time": 150
      },
      {
          "id": "147258",
          "contactsId": "654151",
          "senderId": "abc123",
          "message": "Sveiks",
          "time": 152
      },
      {
          "id": "269269",
          "contactsId": "7142365",
          "senderId": "159bca",
          "message": "Sup?",
          "time": 160
      }
  ]
}

export default data;