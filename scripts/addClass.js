$(document).ready(function() {
  /* global moment */
  // classContainer holds all of our Classes
  var classContainer = $(".class-container");
  var postCategorySelect = $("#category");
  // Click events for the edit and delete buttons
  $(document).on("click", "button.delete", handlePostDelete);
  $(document).on("click", "button.edit", handlePostEdit);
  postCategorySelect.on("change", handleCategoryChange);
  var posts;

  // This function grabs posts from the database and updates the view
  function getClasses() {
   
    $.get("/api/classes", function(data) {
      console.log("Classes", data);
      classes = data;
      if (!classes || !classes.length) {
        displayEmpty();
      }
      else {
        initializeRows();
      }
    });
  }

  // This function does an API call to delete posts
  function deleteClass(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/classes/" + id
    })
      .then(function() {
        getClasses();
      });
  }

  // Getting the initial list of posts
  getClasses();
  // InitializeRows handles appending all of our constructed post HTML inside
  // blogContainer
  function initializeRows() {
    classContainer.empty();
    var classesToAdd = [];
    for (var i = 0; i < classes.length; i++) {
      classesToAdd.push(createNewRow(classes[i]));
    }
    classContainer.append(classesToAdd);
    var messageH2 = $("<h3>");
    messageH2.css({ "text-align": "center", "margin-top": "30px" });
    messageH2.html("<a href='/classes'>Click here</a> to add a new class.");
    classContainer.append(messageH2);
  }

  // This function constructs a post's HTML
  function createNewRow(post) {
    var newPostPanel = $("<div>");
    newPostPanel.addClass("panel panel-default");
    var newPostPanelHeading = $("<div>");
    newPostPanelHeading.addClass("panel-heading");
    var deleteBtn = $("<button>");
    deleteBtn.text("x");
    deleteBtn.addClass("delete btn btn-danger");
    var editBtn = $("<button>");
    editBtn.text("EDIT");
    editBtn.addClass("edit btn btn-default");
    var newPostTitle = $("<h2>");
    var newPostDate = $("<small>");
    //var newPostCategory = $("<h5>");
    //newPostCategory.text(post.category);
    //newPostCategory.css({
    //  float: "right",
    //  "font-weight": "700",
      //"margin-top":
     // "-15px"
   // });
    var newPostPanelBody = $("<div>");
    newPostPanelBody.addClass("panel-body");
    var newPostBody = $("<p>");
    newPostTitle.text(post.className + " ");
    newPostBody.text(post.classDescription);
    //var formattedDate = new Date(post.createdAt);
    //formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
    //newPostDate.text(formattedDate);
    //newPostTitle.append(newPostDate);
    newPostPanelHeading.append(deleteBtn);
    newPostPanelHeading.append(editBtn);
    newPostPanelHeading.append(newPostTitle);
    //newPostPanelHeading.append(newPostCategory);
    newPostPanelBody.append(newPostBody);
    newPostPanel.append(newPostPanelHeading);
    newPostPanel.append(newPostPanelBody);
    newPostPanel.data("post", post);
    return newPostPanel;
  }

  // This function figures out which post we want to delete and then calls
  // deletePost
  function handlePostDelete() {
    var currentPost = $(this)
      .parent()
      .parent()
      .data("post");
    deleteClass(currentPost.id);
  }

  // This function figures out which post we want to edit and takes it to the
  // Appropriate url
  function handlePostEdit() {
    var currentPost = $(this)
      .parent()
      .parent()
      .data("post");
    window.location.href = "/classes?post_id=" + currentPost.id;
  }

  // This function displays a message when there are no posts
  function displayEmpty() {
    classContainer.empty();
    var messageH2 = $("<h2>");
    messageH2.css({ "text-align": "center", "margin-top": "50px" });
    messageH2.html("No Classes has been created yet!, navigate <a href='/classes'>here</a> in order to create a new class.");
    classContainer.append(messageH2);
  }

  // This function handles reloading new posts when the category changes
  function handleCategoryChange() {
    var newPostCategory = $(this).val();
    getPosts();
  }

});
