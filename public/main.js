var thumbUp = document.getElementsByClassName("fa-apple");
var trash = document.getElementsByClassName("fa-trash");
var comment = document.getElementsByClassName("enter");

Array.from(thumbUp).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[3].innerText)
        fetch('messages/thumbUp', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'name': name,
            'thumbUp':thumbUp
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});





/* Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const thumbUp = this.parentNode.parentNode.childNodes[3].innerText
        const image = this.getAttribute("data-image")
        fetch('messages', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'name': name,
            'thumbUp': thumbUp,
            'image': image
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
}); */

Array.from(trash).forEach(function(element) {
  element.addEventListener('click', function(){
    const imageID= this.getAttribute('data-trash')
    fetch('messages', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'imageID': imageID
      })
    }).then(function (response) {
      window.location.reload()
    })
  });
});


/* Array.from(comments).forEach(function(element) {
  element.addEventListener('click', function(){
    const comment = this.parentNode.parentNode.childNodes[1].innerText
    fetch('comments', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'comment': comment
      })
    })
    .then(response => {
      if (response.ok) return response.json()
    })
    .then(data => {
      console.log(data)
      window.location.reload(true)
    })
  });
}); */