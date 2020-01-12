//----------------------
$(function () {
  document.onkeypress = enter;
  function enter(){
    if( window.event.keyCode == 13 ){
      $('#execute').click()
      return false;
    }
  }

  $('#execute').click(function () {

    document.getElementById('qiita').innerHTML = "";
    document.getElementById('stack_over_flow').innerHTML = "";
    document.getElementById('pornhub').innerHTML = "";


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

      fetch('https://site-search-chrome-api.herokuapp.com/pornhub'  , {
        method: "POST",
        body: JSON.stringify(keyword)
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          // 404 や 500 ステータスならここに到達する
          throw new Error('Network response was not ok.');
        })
        .then(resJson => {
          
          for (var i = 4, len = Object.keys(resJson).length; i < len; ++i) {
            var video = '<iframe src="https://jp.pornhub.com/embed/' + resJson[i].url.substr(43) +'" frameborder="10" width="250" height="180" scrolling="no" allowfullscreen></iframe><br><br>'
            document.getElementById('pornhub').innerHTML += video;
            if(i==8) break;
          };
  
        })
        .catch(error => {
          // ネットワークエラーの場合はここに到達する
          console.error(error);
        })

  });
});
