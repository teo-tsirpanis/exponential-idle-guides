const skiplist = ['#AP-visual', '#smooth-formula'];

(function($) {
  $.fn.isAfter = function(sel) {
    return $(this).index() > $(sel).index();
  };
  $.fn.isBefore = function(sel) {
    return $(this).index() < $(sel).index();
  };
  $.fn.nextEle = function(sel) {
    return $(sel).eq($(this).index(sel) + 1);
  };
})(jQuery);

function strRepl(str) {
  return str.replace(/\s/g, "").replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "");
}

function skipped(classlist, id = "") {
  if (classlist === undefined && id === "") {
    return false;
  } else if (skiplist.includes("#" + id)) {
    return true
  } else if (classlist !== undefined) {
    return classlist.split(/(\s+)/).some(r => skiplist.includes("." + r))
  } else {
    return false
  }
}

$("h3").each(function() { //add collapsible to every h3 and h4 with unique ids based on location
  var h3 = $(this);
  var h3texts = strRepl(h3.text());
  h3.attr('id', h3texts);
  h3.addClass('collapsible');

  $("h4").each(function() {
    var h4 = $(this);
    if (h4.isBefore($(h3).nextEle("h3")) || $(h3).nextEle("h3").text() === "") {
      var id = ""
      if (h4.attr('id') !== undefined) {
        id = h4.attr('id');
      }
      if (h4.isAfter($(h3)) && !(skipped(h4.attr('class'), id))) {
        h4.attr('id', strRepl((h3texts + h4.text())));
        h4.addClass('collapsible');
      }
    } else {
      return false;
    }
  });
});

arrcollap = [];
$('.collapsible').each(function() {
  var ele = $(this);
  var temp = [];
  $.each(skiplist, function() {
    if ($(String(this)).isBefore(ele)) {
      temp.push(String(this));
      arrcollap.push(String(this));
    } else {
      return false
    }
  })
  while (temp.length > 0) {
    skiplist.shift()
    temp.shift()
  }
  arrcollap.push('#' + ele.attr('id'))
})

$('h3').each(function(i, e) {
  $(this)
    .nextUntil(this.tagName)
    .wrapAll('<div class="content"/>');

  var content = $('.content').last();
  var inside = false;
  $('h4').each(function(p, q) {
    var h4 = $(this)
    if ($.contains(content[0], h4[0])) {
      if ((arrcollap[arrcollap.indexOf('#' + h4.attr('id')) + 1] === undefined && skiplist.length > 0) || arrcollap.indexOf('#' + h4.attr('id')) === -1) {
        $(this)
          .nextUntil(skiplist[0])
          .wrapAll("<div class='content'/>");
        return false
      } else if (arrcollap[arrcollap.indexOf('#' + h4.attr('id')) + 1].slice(1) === h4.next().attr('id')) {
        $(this).removeClass('collapsible');
      } else {
        $(this)
          .nextUntil(arrcollap[arrcollap.indexOf('#' + h4.attr('id')) + 1])
          .wrapAll("<div class='content'/>");
      }
      inside = true;
    } else if (inside) {
      return false
    }
  })
})

var coll = $('.collapsible');
for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}
