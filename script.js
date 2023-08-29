$(document).ready(function() {
  var tittleosts = [];
  var searchArr = []
  var blockSearch = true;
  var userSortActive = false;
  var tittleostSortActive = false;



  $.get("https://jsonplaceholder.typicode.com/posts", function(data) {
    posts = data;

    initialFill();
  }).fail(function() {
    $(".posts").html("Не удалось получить посты");
  });



  function scrollNearBottom() {
    var windowHeight = $(window).height();
    var documentHeight = $(document).height();

    var scrollTop = $(window).scrollTop();
    var scrollBottom = documentHeight - (scrollTop + windowHeight);

    return scrollBottom < 10;
  }



  $(window).on("scroll", function() {
    if (scrollNearBottom() && searchArr.length == 0) {
      fillScreen(1);
    }
  });



  $("#postsSort").click(function() {
    if ($("#usersSort").text() != "id пользователя ⇅") {
      $("#usersSort").text("id пользователя ⇅");
    }

    if (searchArr.length > 0) {
      sortedPosts = searchArr.slice();
    } 
    else {
      sortedPosts = posts.slice();
    }

    if ($(this).text() == "id записи ⇅" || $(this).text() == "id записи ↑") {
      $(this).text("id записи ↓");

      sortedPosts.sort(function(a, b) {
        return b.id - a.id;
      });

    } 
    else if ($(this).text() == "id записи ↓") {
      $(this).text("id записи ↑");

      sortedPosts.sort(function(a, b) {
        return a.id - b.id;
      });

    }

    $(".posts").empty();

    for (var i = 0; i < sortedPosts.length; i++) {
      var post = $('<div>').addClass('p-4 bg-gray-200 rounded my-4').attr('id', sortedPosts[i].id);
      post.append($('<p>').text(`ID: ${sortedPosts[i].id}`).addClass('text-lg font-semibold'));
      post.append($('<p>').text(`User ID: ${sortedPosts[i].userId}`).addClass('text-gray-600'));
      post.append($('<p>').text(`Title: ${sortedPosts[i].title}`).addClass('mt-2'));
      post.append($('<p>').text(`Body: ${sortedPosts[i].body}`).addClass('mt-2 text-gray-700'));

      $(".posts").append(post);
    }
  });


  $("#resetSort").click(function() {
    if ($("#usersSort").text() != "id пользователя ⇅") {
      $("#usersSort").text("id пользователя ⇅");
    }

    if ($("#postsSort").text() != "id записи ⇅") {
      $("#postsSort").text("id записи ⇅");
    }

    $(".posts").empty();

    if (searchArr.length > 0) {
      for (var i = 0; i < searchArr.length; i++) {
        var post = $('<div>').addClass('p-4 bg-gray-200 rounded my-4').attr('id', searchArr[i].id);;
        post.append($('<p>').text(`ID: ${searchArr[i].id}`).addClass('text-lg font-semibold'));
        post.append($('<p>').text(`User ID: ${searchArr[i].userId}`).addClass('text-gray-600'));
        post.append($('<p>').text(`Title: ${searchArr[i].title}`).addClass('mt-2'));
        post.append($('<p>').text(`Body: ${searchArr[i].body}`).addClass('mt-2 text-gray-700'));

        $(".posts").append(post);
      }
    } 
    else {
      initialFill();
    }
  });



  $("#usersSort").click(function() {
    if ($("#postsSort").text() != "id записи ⇅") {
      $("#postsSort").text("id записи ⇅");
    }

    if (searchArr.length > 0) {
      sortedPosts = searchArr.slice();
    } 
    else {
      sortedPosts = posts.slice();
    }

    if ($(this).text() == "id пользователя ⇅" || $(this).text() == "id пользователя ↑") {
      $(this).text("id пользователя ↓");

      sortedPosts.sort(function(a, b) {
        return b.userId - a.userId;
      });
    } 
    else if ($(this).text() == "id пользователя ↓") {
      $(this).text("id пользователя ↑");

      sortedPosts.sort(function(a, b) {
        return a.userId - b.userId;
      });
    }

    $(".posts").empty();

    for (var i = 0; i < sortedPosts.length; i++) {
      var post = $('<div>').addClass('p-4 bg-gray-200 rounded my-4').attr('id', sortedPosts[i].id);;
      post.append($('<p>').text(`ID: ${sortedPosts[i].id}`).addClass('text-lg font-semibold'));
      post.append($('<p>').text(`User ID: ${sortedPosts[i].userId}`).addClass('text-gray-600'));
      post.append($('<p>').text(`Title: ${sortedPosts[i].title}`).addClass('mt-2'));
      post.append($('<p>').text(`Body: ${sortedPosts[i].body}`).addClass('mt-2 text-gray-700'));

      $(".posts").append(post);
    }
  });



  function initialFill() {
    var windowHeight = $(window).height();

    for (var i = 0; i < 18; i++) {
      var post = $('<div>').addClass('p-4 bg-gray-200 rounded my-4').attr('id', posts[i].id);
      post.append($('<p>').text(`ID: ${posts[i].id}`).addClass('text-lg font-semibold'));
      post.append($('<p>').text(`User ID: ${posts[i].userId}`).addClass('text-gray-600'));
      post.append($('<p>').text(`Title: ${posts[i].title}`).addClass('mt-2'));
      post.append($('<p>').text(`Body: ${posts[i].body}`).addClass('mt-2 text-gray-700'));

      $(".posts").append(post);
    }

    var postsDivHeight = $(".posts").height();

    var toPost = Math.ceil(windowHeight / postsDivHeight) - 1;

    if (toPost > 0) {
      fillScreen(toPost);
    }
  }



  function fillScreen(count) {
    var lastId = 0;

    $('.posts').find('[id]').each(function() {
      var currentId = Number($(this).attr('id'));

      if (currentId > lastId) {
        lastId = currentId;
      }
    });

    var maxPosts = (18 * count) + lastId;

    if (maxPosts > posts.length) {
      maxPosts = posts.length;
    }

    for (var i = lastId; i < maxPosts; i++) {
      var post = $('<div>').addClass('p-4 bg-gray-200 rounded my-4').attr('id', posts[i].id);
      post.append($('<p>').text(`ID: ${posts[i].id}`).addClass('text-lg font-semibold'));
      post.append($('<p>').text(`User ID: ${posts[i].userId}`).addClass('text-gray-600'));
      post.append($('<p>').text(`Title: ${posts[i].title}`).addClass('mt-2'));
      post.append($('<p>').text(`Body: ${posts[i].body}`).addClass('mt-2 text-gray-700'));

      $(".posts").append(post);
    }
  }



  $("#searchField").on("input", function() {
    if ($("#usersSort").text() != "id пользователя ⇅") {
      $("#usersSort").text("id пользователя ⇅");
    }

    if ($("#postsSort").text() != "id записи ⇅") {
      $("#postsSort").text("id записи ⇅");
    }

    var fieldVal = $(this).val();

    searchArr = []

    if (fieldVal.length > 2) {
      $(".posts").empty()

      var counter = posts.length;

      for (var i = 0; i < posts.length; i++) {
        if (posts[i].title.indexOf(fieldVal) != -1 || posts[i].body.indexOf(fieldVal) != -1) {
          var post = $('<div>').addClass('p-4 bg-gray-200 rounded my-4').attr('id', posts[i].id);
          post.append($('<p>').text(`ID: ${posts[i].id}`).addClass('text-lg font-semibold'));
          post.append($('<p>').text(`User ID: ${posts[i].userId}`).addClass('text-gray-600'));
          post.append($('<p>').text(`Title: ${posts[i].title}`).addClass('mt-2'));
          post.append($('<p>').text(`Body: ${posts[i].body}`).addClass('mt-2 text-gray-700'));

          $(".posts").append(post);

          searchArr.push(posts[i]);
        } 
        else {
          counter--;
        }
      }

      if (counter == 0) {
        $(".posts").html("По запросу ничего не найдено");
      }

      blockSearch = false;
    } 
    else if (!blockSearch) {
      $(".posts").empty();

      initialFill();

      blockSearch = true;
    }
  });
});