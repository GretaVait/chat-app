const fetchData = async () => {
	const response = await fetch('https://api.jsonbin.io/b/5fce60032946d2126fff7710/8', {
		method: "GET",
		headers: {
			"secret-key": "$2b$10$9Db7MVvwF3.QAuGr53lI1e4GchPC19jH0oPrG1z83Bdt9k6itDk1S"
		}
	})
	return response.json();
}
export { fetchData };

const data = {
  "users": [
      {
          "id": "159bca",
          "name": "Tedas",
          "image": null
      },
      {
          "id": "abc123",
          "name": "Mick",
          "image": null
      },
      {
          "id": "123abc",
          "name": "Christmas",
          "image": null
      }
  ],
  "conversations": [
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
          "conversationId": "654151",
          "senderId": "159bca",
          "message": "Labas",
          "time": 150
      },
      {
          "id": "147258",
          "conversationId": "654151",
          "senderId": "abc123",
          "message": "Sveiks",
          "time": 152
      },
      {
          "id": "269269",
          "conversationId": "7142365",
          "senderId": "159bca",
          "message": "Sup?",
          "time": 160
      },
      {
        "id": "269268",
        "conversationId": "956956",
        "senderId": "648646",
        "message": "Wha?",
        "time": 160
    }
  ]
}

export default data;