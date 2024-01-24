window.onscroll = function() { stickyHeader() };

  function stickyHeader() {
      var header = document.getElementById("stickyHeader");
      var section = document.getElementById("section1"); 

      if (window.pageYOffset >= section.offsetTop) {
          header.style.display = "block";
      } else {
          header.style.display = "none";
      }
  }

  function searchWord() {
    var searchInput = document.getElementById("searchInput").value.toLowerCase();
    var sectionContent = document.getElementById("content").querySelector('section').innerHTML;
  
    var unhighlightedContent = sectionContent.replace(/<strong class="highlight">(.*?)<\/strong>/ig, '$1');
    var newContent = unhighlightedContent.replace(new RegExp('(<strong>.*?</strong>)', 'ig'), function(match) {
      return match.replace(new RegExp('(' + searchInput + ')', 'ig'), '<strong class="highlight">$1</strong>');
    });
  
    document.getElementById("content").querySelector('section').innerHTML = newContent;
  
    var highlightedElement = document.querySelector('.highlight');
    if (highlightedElement) {
      var scrollOptions = {
        behavior: 'smooth',
        block: 'center',
        inline: 'center'
      };
      highlightedElement.scrollIntoView(scrollOptions);
    }
  }
  