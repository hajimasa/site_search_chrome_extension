//----------------------
$(function () {

  $('#execute').click(function () {

    document.getElementById('qiita').innerHTML = "";
    document.getElementById('stack_over_flow').innerHTML = "";

    var keyword = document.getElementById('query').value;

    console.log(keyword);

    fetch('https://qiita.com/api/v2/items?page=1&per_page=50&query=' + keyword, {
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

        var content;
        for (var i = 0, len = resJson.length; i < len; ++i) {
          var link = '<a href="' + resJson[i].url + '">' + resJson[i].title + '</a><br>';
          document.getElementById('qiita').innerHTML += link;
        };

      })
      .catch(error => {
        // ネットワークエラーの場合はここに到達する
        console.error(error);
      })

    fetch('https://api.stackexchange.com/2.2/search/advanced?order=desc&sort=activity&q=' + keyword + '&site=stackoverflow', {
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

        var content;
        for (var i = 0, len = resJson.items.length; i < len; ++i) {
          var link = '<a href="' + resJson.items[i].link + '">' + resJson.items[i].title + '</a><br>';
          document.getElementById('stack_over_flow').innerHTML += link;
        };
        $('#stack_over_flow').text(content);

      })
      .catch(error => {
        // ネットワークエラーの場合はここに到達する
        console.error(error);
      })
  });
});
