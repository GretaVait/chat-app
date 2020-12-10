const fetchData = async () => {
	const response = await fetch('https://api.jsonbin.io/b/5fce60032946d2126fff7710/19', {
		method: "GET",
		headers: {
			"secret-key": "$2b$10$9Db7MVvwF3.QAuGr53lI1e4GchPC19jH0oPrG1z83Bdt9k6itDk1S"
		}
	})
	return response.json();
}
export default fetchData;