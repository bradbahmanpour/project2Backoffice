$(document).ready(function() {
  // Gets an optional query string from our url (i.e. ?post_id=23)
  var url = window.location.search;
  var postId;
  // Sets a flag for whether or not we're updating a post to be false initially
  var updating = false;

  // If we have this section in our url, we pull out the post id from the url
  // In localhost:8080/cms?post_id=1, postId is 1
  if (url.indexOf("?post_id=") !== -1) {
    postId = url.split("=")[1];
    getClassData(postId);
  }

 
  // Getting jQuery references to the post body, title, form, and category select
  var titleInput = $("#classname");
  var classInput = $("#classdesc");
  var priceInput = $("#classprice");
  var classForm = $("#classForm");

  // Adding an event listener for when the form is submitted
  $(classForm).on("submit", function handleFormSubmit(event) {
    event.preventDefault();
    
    console.log(titleInput);
    console.log(classInput);
    console.log(priceInput);

    
    // Wont submit the post if we are missing a body or a title
    if (!titleInput.val().trim() || !classInput.val().trim()) {
      return;
    }
    // Constructing a newPost object to hand to the database
    var newClass = {
      className: titleInput.val().trim(),
      classDescription: classInput.val().trim(),
      classPrice: priceInput.val()
    };

    console.log(newClass);

    // If we're updating a post run updatePost to update a post
    // Otherwise run submitPost to create a whole new post
    if (updating) {
      newClass.id = postId;
      updateClass(newClass);
    }
    else {
      submitClass(newClass);
    }
  });

  // Submits a new post and brings user to blog page upon completion
  function submitClass(Class) {
    $.post("/api/classes/", Class, function() {
      window.location.href = "/admin";
    });
  }

  // Gets post data for a post if we're editing
  function getClassData(id) {
    $.get("/api/classes/" + id, function(data) {
      if (data) {
        // If this post exists, prefill our cms forms with its data 
        titleInput.val(data.className);
        classInput.val(data.classDescription);
        priceInput.val(data.classPrice);
        // If we have a post with this id, set a flag for us to know to update the post
        // when we hit submit
        updating = true;
      }
    });
  }

  // Update a given post, bring user to the blog page when done
  function updateClass(Class) {
    $.ajax({
      method: "PUT",
      url: "/api/classes",
      data: Class
    })
      .then(function() {
        window.location.href = "/admin";
      });
  }
});
