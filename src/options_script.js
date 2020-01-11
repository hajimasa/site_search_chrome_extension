//----------------------
$(function () {

  $('#execute').click(function () {
    fetch('https://qiita.com/api/v2/items?page=1&per_page=10', {
      method: "GET"
    })
      .then(response => {

        if (response.ok) {
          return response.json();
        }
        // 404 や 500 ステータスならここに到達する
        throw new Error('Network response was not ok.');
      })
      .then(resJson => {
        $('#qiita').text(JSON.stringify(resJson));
      })
      .catch(error => {
        // ネットワークエラーの場合はここに到達する
        console.error(error);
      })

    fetch('https://api.stackexchange.com/2.2/search/advanced?order=desc&sort=activity&q=ruby%20on%20rails&site=stackoverflow', {
      method: "GET"
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        // 404 や 500 ステータスならここに到達する
        throw new Error('Network response was not ok.');
      })
      .then(resJson => {
        $('#stack_over_flow').text(JSON.stringify(resJson));
      })
      .catch(error => {
        // ネットワークエラーの場合はここに到達する
        console.error(error);
      })
  });
});
