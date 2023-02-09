useEffect(() => {
  console.log(dataURL);

  fetch(dataURL)
    .then((response) => response.json())
    .then((json) => {
      if (json.msgCode == "success") {
        setData(json.details);
        const logArray = JSON.stringify(json.details);
        setLog(logArray);
        console.log(logArray);
        setLoading(true);
      } else {
        setLoading(false);
      }
      setDataTitle(json);
    })
    .catch((error) => {
      if (error) {
        alert("Network Error");
      }
    });
}, []);
