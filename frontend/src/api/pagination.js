import $ from 'jquery';
import jQuery from 'jquery';

/*
this javascript is only to change the "actpage" attribut on the .cdp div
*/

window.onload = function() {
  var paginationPage = parseInt($(".cdp").attr("actpage"), 10);
  $(".cdp_i").on("click", function() {
    var go = $(this)
      .attr("href")
      .replace("#!", "");
    if (go === "+1") {
      paginationPage++;
    } else if (go === "-1") {
      paginationPage--;
    } else {
      paginationPage = parseInt(go, 10);
    }
    $(".cdp").attr("actpage", paginationPage);
  });
};
