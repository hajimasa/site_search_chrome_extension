//----------------------
$(function () {

  $('#execute').click(function () {

    fetch('https://qiita.com/api/v2/items?page=1&per_page=10', {
      method: "GET",
      mode: 'cors'
    })
      .then((response) => {
        if (response.ok) {
          return response.json().then(resJson => {
            console.log(JSON.stringify(resJson));
          });
        }
        throw new Error('Network response was not ok.');
      })
      .catch(error => {
        console.error(error);
      })
  });
});
